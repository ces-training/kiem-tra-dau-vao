"""Thu giọng cho bài kiểm tra bằng Gemini TTS (cùng mô hình và bộ giọng nhân vật của web 21 ngày).

Dùng:
  python3 tools/gemini/tao_giong.py <tệp_khoá> thu  <mã> [<mã> ...]   # thu thử vài câu, gọi thường
  python3 tools/gemini/tao_giong.py <tệp_khoá> batch [<mã> ...]       # thu tất cả câu còn thiếu qua Batch API (rẻ một nửa)
  python3 tools/gemini/tao_giong.py <tệp_khoá> lai  <mã> [<mã> ...]   # thu lại (ghi đè) các câu cô chưa ưng

Danh sách câu: san-xuat/giong-doc.json (tự sinh bởi tools/build.js). Kết quả: audio/<mã>.mp3
Khoá chỉ đọc từ tệp, không ghi vào kho. Cần ffmpeg.
"""
import base64, json, re, subprocess, sys, time, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MODEL = "gemini-3.8-flash-tts"
API = "https://generativelanguage.googleapis.com/v1beta/"
OUT = ROOT / "audio"
KEY = Path(sys.argv[1]).read_text().strip()
MODE = sys.argv[2]
ONLY = set(sys.argv[3:]) if sys.argv[2] != "cho" else set()
NANG = 1.12   # nâng tông giọng bạn nhỏ (Anna, Xiaomei) khoảng 2 nửa cung, giữ nguyên tốc độ


def call(path, body=None, timeout=300):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
    return json.load(urllib.request.urlopen(req, timeout=timeout))


def loi_doc(t):
    """Giống cách web đọc bằng giọng máy: ___ thành ngắt nghỉ, bỏ phần dịch sau dấu /"""
    t = re.sub(r"_{2,}", " ... ", t)
    return re.sub(r"\s*/\s*[^\n]*$", "", t, flags=re.M).strip()


def request(j):
    # mô hình 3.8 đọc to cả lời dặn, nên chỉ gửi đúng câu cần đọc
    return {"contents": [{"parts": [{"text": loi_doc(j["loi"])}]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": j["giong"]}}}}}


def to_mp3(pcm, j):
    OUT.mkdir(exist_ok=True)
    dst = OUT / f"{j['ma']}.mp3"; raw = dst.with_suffix(".pcm"); raw.write_bytes(pcm)
    af = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
          "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,afade=t=in:d=0.03,areverse,"
          "afade=t=in:d=0.01,apad=pad_dur=0.12")
    if j.get("nang_tong"):
        af = f"asetrate={int(24000 * NANG)},aresample=24000,atempo={1 / NANG:.4f}," + af
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", str(raw),
                    "-af", af, "-ar", "24000", "-ac", "1", "-b:a", "48k", str(dst)], check=True)
    raw.unlink()


def get_pcm(resp):
    for p in resp["candidates"][0]["content"]["parts"]:
        if "inlineData" in p:
            return base64.b64decode(p["inlineData"]["data"])
    return None


jobs = json.loads((ROOT / "san-xuat" / "giong-doc.json").read_text(encoding="utf-8"))
by = {j["ma"]: j for j in jobs}

if MODE in ("thu", "lai"):
    for m in (ONLY or by):
        j = by[m]
        if MODE == "thu" and (OUT / f"{m}.mp3").exists(): continue
        print(m, "|", j["giong"], "|", j["loi"][:60])
        for attempt in range(4):
            try:
                pcm = get_pcm(call(f"models/{MODEL}:generateContent", request(j)))
                if pcm: to_mp3(pcm, j); break
            except urllib.error.HTTPError as e:
                print("  lỗi", e.code, e.read()[:300].decode(errors="ignore"))
            except Exception as e:
                print("  lỗi", e)
            time.sleep(5 * (attempt + 1))

elif MODE == "batch":
    todo = [j for j in jobs if (not ONLY or j["ma"] in ONLY) and not (OUT / f"{j['ma']}.mp3").exists()]
    print("cần thu", len(todo), "câu")
    body = {"batch": {"display_name": "kiem-tra-giong", "input_config": {"requests": {"requests": [
        {"request": request(j), "metadata": {"key": j["ma"]}} for j in todo]}}}}
    op = call(f"models/{MODEL}:batchGenerateContent", body, timeout=600)
    name = op.get("name") or op.get("metadata", {}).get("name"); print("đã gửi:", name, flush=True)

if MODE in ("batch", "cho"):
    if MODE == "cho": name = sys.argv[3]   # nhận kết quả đợt đã gửi: cho <tên batch>
    while True:
        b = call(name); st = (b.get("metadata") or b).get("state", "")
        print(time.strftime("%H:%M:%S"), st, flush=True)
        if b.get("done") or st.endswith("SUCCEEDED"): break
        if st.endswith(("FAILED", "CANCELLED", "EXPIRED")): raise SystemExit("Batch không thành: " + st)
        time.sleep(30)
    resp = b.get("response") or (b.get("metadata") or {}).get("output") or {}
    items = resp.get("inlinedResponses", {})
    items = items.get("inlinedResponses", []) if isinstance(items, dict) else items
    ok, fail = 0, []
    for it in items:
        m = (it.get("metadata") or {}).get("key")
        try:
            pcm = get_pcm(it["response"])
        except Exception:
            pcm = None
        if pcm and m in by: to_mp3(pcm, by[m]); ok += 1
        else: fail.append(m)
    print("xong", ok, "câu; lỗi:", fail)
elif MODE not in ("thu", "lai"):
    raise SystemExit(__doc__)
