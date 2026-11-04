"""Vẽ tranh cho bài kiểm tra bằng Gemini (cùng mô hình đã vẽ web 21 ngày).

Dùng:
  python3 tools/gemini/tao_tranh.py <tệp_khoá> thu  <mã> [<mã> ...]   # vẽ thử vài tranh, gọi thường (nhanh)
  python3 tools/gemini/tao_tranh.py <tệp_khoá> batch [<mã> ...]       # vẽ tất cả tranh còn thiếu qua Batch API (rẻ một nửa)
  python3 tools/gemini/tao_tranh.py <tệp_khoá> lai  <mã> [<mã> ...]   # vẽ lại (ghi đè) các tranh cô chưa ưng, gọi thường
  python3 tools/gemini/tao_tranh.py <tệp_khoá> cho  [<tên batch> ...] # nhận kết quả đợt batch đã gửi (khi bị ngắt giữa chừng)

Khoá chỉ đọc từ tệp, không bao giờ ghi vào kho. Kết quả: img/tranh/<mã>.webp
Tiết kiệm: tranh trùng câu lệnh chỉ vẽ một lần rồi chép sang các mã khác;
ô lựa chọn vẽ cỡ 512 px (đủ nét trên web), tranh cảnh cỡ 1K.
"""
import base64, io, json, sys, time, urllib.request, urllib.error
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent))
from tranh_prompt import PROMPTS, REF, STYLE_REF, STYLE, OBJ, SCENE, CHAR, GOC, GHEP
import math

MODEL = "gemini-3.1-flash-image"
API = "https://generativelanguage.googleapis.com/v1beta/"
OUT = ROOT / "img" / "tranh"
GOC_DIR = Path(__file__).parent / "goc"   # vật mẫu để ghép tranh đếm số
for _k, _d in GOC.items():
    PROMPTS["_goc-" + _k] = (_d, [], "1:1")
path_of = lambda c: (GOC_DIR / f"{c[5:]}.png") if c.startswith("_goc-") else (OUT / f"{c}.webp")
KEY = Path(sys.argv[1]).read_text().strip()
MODE = sys.argv[2]
ONLY = sys.argv[3:]


def call(path, body=None, timeout=300):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
    return json.load(urllib.request.urlopen(req, timeout=timeout))


_cache = {}
def ref_part(rel):
    if rel not in _cache:
        im = Image.open(ROOT / rel).convert("RGBA")
        bg = Image.new("RGBA", im.size, "white"); bg.alpha_composite(im); im = bg.convert("RGB")
        im.thumbnail((384, 384)); b = io.BytesIO(); im.save(b, "JPEG", quality=85)
        _cache[rel] = {"inlineData": {"mimeType": "image/jpeg", "data": base64.b64encode(b.getvalue()).decode()}}
    return _cache[rel]


def request(desc, chars, ratio):
    refs = STYLE_REF + [REF[c] for c in chars]
    kind = OBJ if ratio == "1:1" else SCENE
    names = [c for c in chars if c in ("anna", "leo", "bong", "xiaomei", "gau")]
    text = " ".join([STYLE, kind, CHAR if chars else "",
                     ("Reference images: the first two show the drawing style only"
                      + (f"; the next ones show {', '.join(chars)}." if chars else ".")),
                     ("Bong is the girl with a long ponytail and a red T-shirt with a yellow star. " if "bong" in names else "")
                     + ("The little bear is the reference bear. " if "gau" in names else ""),
                     "Picture: " + desc + "."])
    size = "512" if ratio == "1:1" else "1K"
    return {"contents": [{"parts": [ref_part(r) for r in refs] + [{"text": text}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": ratio, "imageSize": size}}}


def save(data, codes):
    im = Image.open(io.BytesIO(data)).convert("RGB")
    im.thumbnail((1024, 1024))
    OUT.mkdir(parents=True, exist_ok=True); GOC_DIR.mkdir(exist_ok=True)
    for c in codes:
        if c.startswith("_goc-"): im.save(path_of(c))
        elif c.endswith(("_v1", "_v2", "_v3")): bo_nen(im).save(path_of(c), "WEBP", quality=84)  # tranh tô màu: nền trong suốt
        else: im.save(path_of(c), "WEBP", quality=84)
    return im.size


def bo_nen(im):
    """Bỏ nền trắng nối với mép ảnh để ghép nhiều vật lên một nền."""
    im = im.convert("RGBA"); w, h = im.size; px = im.load(); seen = bytearray(w * h)
    st = [(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)]
    while st:
        x, y = st.pop()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y * w + x]: continue
        seen[y * w + x] = 1; c = px[x, y]
        if not (c[0] > 232 and c[1] > 232 and c[2] > 232): continue
        px[x, y] = (255, 255, 255, 0); st += [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    bb = im.getbbox(); return im.crop(bb) if bb else im


def ghep():
    """Ghép đúng n vật mẫu thành tranh đếm số (chắc chắn đúng số lượng)."""
    for code, (goc, n) in GHEP.items():
        src = GOC_DIR / f"{goc}.png"
        if not src.exists(): continue
        obj = bo_nen(Image.open(src))
        W, H = (512, 512) if code.endswith(("_o1", "_o2", "_o3", "_o4")) else (1024, 768)
        cols = {1: 1, 2: 2, 3: 3, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 3, 10: 5}.get(n, math.ceil(math.sqrt(n)))
        rows = math.ceil(n / cols); pad = 0.86
        cw, chh = W / cols, H / rows
        s = min(cw * pad / obj.width, chh * pad / obj.height); o = obj.resize((max(1, int(obj.width * s)), max(1, int(obj.height * s))))
        can = Image.new("RGB", (W, H), "white"); k = 0
        for r in range(rows):
            m = min(cols, n - k); x0 = (W - m * cw) / 2
            for i in range(m):
                can.paste(o, (int(x0 + i * cw + (cw - o.width) / 2), int(r * chh + (chh - o.height) / 2)), o); k += 1
        can.save(OUT / f"{code}.webp", "WEBP", quality=84)
    print("đã ghép", len(GHEP), "tranh đếm số")


def nhom(codes):
    """Gộp các mã cùng câu lệnh để chỉ vẽ một lần."""
    g = {}
    for c in codes:
        d, ch, r = PROMPTS[c]
        g.setdefault((d, tuple(ch), r), []).append(c)
    return g


def get_image(resp):
    for p in resp["candidates"][0]["content"]["parts"]:
        if "inlineData" in p:
            return base64.b64decode(p["inlineData"]["data"])
    return None


all_codes = [x["ma"] for x in json.loads((ROOT / "san-xuat" / "hinh-can-ve.json").read_text(encoding="utf-8"))]
all_codes = ["_goc-" + k for k in GOC] + [c for c in all_codes if c not in GHEP]
ONLY = [] if MODE == "cho" else [c for c in ONLY if c not in GHEP] or ([] if not sys.argv[3:] else ["_goc-" + GHEP[c][0] for c in sys.argv[3:] if c in GHEP])

if MODE in ("thu", "lai"):
    groups = nhom(ONLY or all_codes)
    for (d, ch, r), codes in groups.items():
        if MODE == "thu" and all(path_of(c).exists() for c in codes):
            print("đã có", codes); continue
        print(codes[0], "|", d[:70])
        for attempt in range(3):
            try:
                img = get_image(call(f"models/{MODEL}:generateContent", request(d, list(ch), r)))
                if img: print("  ", save(img, codes)); break
                print("  không có ảnh, thử lại")
            except urllib.error.HTTPError as e:
                print("  lỗi", e.code, e.read()[:300].decode(errors="ignore"))
            except Exception as e:
                print("  lỗi", e)
            time.sleep(5 * (attempt + 1))
    ghep()

elif MODE == "batch":
    todo = [c for c in (ONLY or all_codes) if not path_of(c).exists()]
    groups = list(nhom(todo).items())
    print("cần vẽ", len(todo), "mã =", len(groups), "tranh khác nhau")
    # chia thành nhiều đợt nhỏ để mỗi lần gửi dưới 15 MB
    chunks, cur, size = [], [], 0
    for item in groups:
        req = request(item[0][0], list(item[0][1]), item[0][2]); n = len(json.dumps(req))
        if cur and size + n > 15_000_000: chunks.append(cur); cur, size = [], 0
        cur.append((item, req)); size += n
    if cur: chunks.append(cur)
    names = []
    for i, ch in enumerate(chunks):
        body = {"batch": {"display_name": f"kiem-tra-tranh-{i}", "input_config": {"requests": {"requests": [
            {"request": req, "metadata": {"key": "|".join(codes)}} for (k, codes), req in ch]}}}}
        op = call(f"models/{MODEL}:batchGenerateContent", body, timeout=600)
        names.append(op.get("name") or op.get("metadata", {}).get("name")); print("đã gửi đợt", i, len(ch), "tranh:", names[-1], flush=True)
    (ROOT / "tools" / "gemini" / ".batch_tranh.json").write_text(json.dumps(names))

if MODE in ("batch", "cho"):
    if MODE == "cho":   # chờ và nhận kết quả các đợt đã gửi trước đó: cho <tên batch> ...
        names = sys.argv[3:] or json.loads((ROOT / "tools" / "gemini" / ".batch_tranh.json").read_text())
    ok, fail = 0, []
    for name in names:
        while True:
            b = call(name)
            st = (b.get("metadata") or b).get("state", "")
            print(time.strftime("%H:%M:%S"), name.split("/")[-1], st, flush=True)
            if b.get("done") or st.endswith("SUCCEEDED"): break
            if st.endswith(("FAILED", "CANCELLED", "EXPIRED")): raise SystemExit("Batch không thành: " + st)
            time.sleep(30)
        resp = b.get("response") or (b.get("metadata") or {}).get("output") or {}
        items = resp.get("inlinedResponses", {})
        items = items.get("inlinedResponses", []) if isinstance(items, dict) else items
        for it in items:
            codes = (it.get("metadata") or {}).get("key", "").split("|")
            try:
                img = get_image(it["response"])
            except Exception:
                img = None
            if img: save(img, codes); ok += len(codes)
            else: fail += codes
    print("xong", ok, "mã; lỗi:", fail); ghep()
    (ROOT / "tools" / "gemini" / ".batch_tranh.json").unlink(missing_ok=True)
elif MODE not in ("thu", "lai"):
    raise SystemExit(__doc__)
