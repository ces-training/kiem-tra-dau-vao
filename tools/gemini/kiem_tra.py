"""Tự kiểm tra tranh và giọng vừa tạo bằng một mô hình Gemini rẻ, để cô chỉ phải soát kỹ những mục bị gắn cờ.

Dùng:  python3 tools/gemini/kiem_tra.py <tệp_khoá> [tranh|giong|ca-hai]
Kết quả: san-xuat/kiem-tra-tu-dong.json  { "tranh": {mã: {"ok":bool,"ly_do":str}}, "giong": {...} }
Trang duyet.html đọc tệp này để đánh dấu mục cần xem lại.
"""
import base64, json, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent))
from tranh_prompt import PROMPTS, GHEP

MODEL = "gemini-3.5-flash"
API = "https://generativelanguage.googleapis.com/v1beta/"
KEY = Path(sys.argv[1]).read_text().strip()
WHAT = sys.argv[2] if len(sys.argv) > 2 else "ca-hai"
OUTF = ROOT / "san-xuat" / "kiem-tra-tu-dong.json"
LANG = {"vi": "Vietnamese", "en": "English", "zh": "Mandarin Chinese"}


def ask(parts):
    body = {"contents": [{"parts": parts}],
            "generationConfig": {"responseMimeType": "application/json", "temperature": 0}}
    req = urllib.request.Request(API + f"models/{MODEL}:generateContent", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
    for a in range(4):
        try:
            d = json.load(urllib.request.urlopen(req, timeout=120))
            return json.loads(d["candidates"][0]["content"]["parts"][0]["text"])
        except Exception as e:
            err = e
            time.sleep(4 * (a + 1))
    return {"ok": False, "ly_do": f"không kiểm tra được ({err})"}


def check_img(code):
    f = ROOT / "img" / "tranh" / f"{code}.webp"
    if not f.exists():
        return code, {"ok": False, "ly_do": "chưa có tranh"}
    if code in GHEP:
        return code, {"ok": True, "ly_do": "ghép tự động, đúng số lượng"}
    desc = PROMPTS[code][0]
    q = ("You check pictures for a children's English/Chinese test. The picture must clearly show: \"" + desc + "\". "
         "Check carefully: exact counts, colours, positions (in/on/under/behind/next to/between), who is doing what, "
         "and that there is no stray text (text is allowed only if the description asks for it). "
         "Reply as JSON {\"ok\": true|false, \"ly_do\": \"short reason in Vietnamese if not ok, else empty\"}.")
    return code, ask([{"inlineData": {"mimeType": "image/webp", "data": base64.b64encode(f.read_bytes()).decode()}}, {"text": q}])


def check_audio(j):
    f = ROOT / "audio" / f"{j['ma']}.mp3"
    if not f.exists():
        return j["ma"], {"ok": False, "ly_do": "chưa có file giọng"}
    q = ("Transcribe this " + LANG[j["tieng"]] + " audio exactly, then compare it with the expected text: \"" + j["loi"] + "\" "
         "(ignore anything after a slash, and treat ___ as a pause). The audio is ok if every word is spoken, nothing extra is said "
         "(no instructions read aloud), and for Chinese the tones sound correct. "
         "Reply as JSON {\"ok\": true|false, \"nghe_duoc\": \"your transcription\", \"ly_do\": \"short reason in Vietnamese if not ok\"}.")
    return j["ma"], ask([{"inlineData": {"mimeType": "audio/mp3", "data": base64.b64encode(f.read_bytes()).decode()}}, {"text": q}])


res = json.loads(OUTF.read_text(encoding="utf-8")) if OUTF.exists() else {}
if WHAT in ("tranh", "ca-hai"):
    codes = [x["ma"] for x in json.loads((ROOT / "san-xuat" / "hinh-can-ve.json").read_text(encoding="utf-8"))]
    with ThreadPoolExecutor(6) as ex:
        res["tranh"] = dict(ex.map(check_img, codes))
    bad = [k for k, v in res["tranh"].items() if not v.get("ok")]
    print("tranh:", len(codes), "| cần xem lại:", len(bad), bad)
if WHAT in ("giong", "ca-hai"):
    jobs = json.loads((ROOT / "san-xuat" / "giong-doc.json").read_text(encoding="utf-8"))
    with ThreadPoolExecutor(6) as ex:
        res["giong"] = dict(ex.map(check_audio, jobs))
    bad = [k for k, v in res["giong"].items() if not v.get("ok")]
    print("giọng:", len(jobs), "| cần nghe lại:", len(bad), bad)
OUTF.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
