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
KEY = Path(sys.argv[1]).read_text().strip() if sys.argv[1] != "-" else ""
MODE = sys.argv[2]
ONLY = set(sys.argv[3:]) if sys.argv[2] != "cho" else set()
# Câu Gemini hay đọc sai khi đứng một mình: gửi kèm dấu câu / cách viết khác (chỉ đổi lời gửi đi, không đổi mã)
DOC_THAY = {"xm_zh_02239684": "学校。"}
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
    return {"contents": [{"parts": [{"text": DOC_THAY.get(j["ma"]) or loi_doc(j["loi"])}]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": j["giong"]}}}}}


def bo_tieng_re(pcm):
    """Gemini TTS hay để lại một tiếng "rẹt" (nhiễu trắng ~0,15 giây) sau một khoảng lặng ở cuối câu: cắt bỏ nó."""
    import numpy as np
    a = np.frombuffer(pcm, dtype=np.int16).astype(np.float32)
    seg = 480  # 20 ms ở 24 kHz
    n = len(a) // seg
    if n < 10: return pcm
    rms = np.sqrt((a[: n * seg].reshape(n, seg) ** 2).mean(1)) / 32768
    loud = rms > 0.01
    for _ in range(3):  # có thể có hơn một tiếng rẹt
        idx = np.where(loud)[0]
        if not len(idx): break
        end = idx[-1]; start = end
        while start > 0 and loud[start - 1]: start -= 1
        gap = start - 1
        while gap >= 0 and not loud[gap]: gap -= 1
        blk = a[start * seg:(end + 1) * seg]
        zc = np.mean(np.abs(np.diff(np.sign(blk)))) / 2   # nhiễu trắng đổi dấu rất dày (≥0,2), giọng nói thì thưa hơn
        lang = start - gap - 1; to = rms[start:end + 1].max()
        # đoạn nhiễu ngắn ≤0,3 s, sau ≥0,14 s lặng; hoặc sau ≥0,06 s lặng nhưng rất to (tiếng "x", "s" thật thì nhỏ hơn nhiều)
        if gap >= 0 and end - start + 1 <= 15 and zc >= 0.2 and (lang >= 7 or (lang >= 3 and to >= 0.3)):
            loud[start:end + 1] = False; a[start * seg:] = 0
        else:
            break
    return a.astype(np.int16).tobytes()


def to_mp3(pcm, j):
    pcm = bo_tieng_re(pcm)
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
elif MODE == "lam-sach":   # làm sạch tiếng rẹt cho các file đã có (không gọi Gemini, không tốn tiền)
    for j in jobs:
        f = OUT / f"{j['ma']}.mp3"
        if not f.exists(): continue
        raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(f), "-f", "s16le", "-ac", "1", "-ar", "24000", "-"], capture_output=True).stdout
        j2 = dict(j, nang_tong=False)   # đã nâng tông từ trước, không nâng lần nữa
        to_mp3(raw, j2)
    print("đã làm sạch", len(jobs), "file")
elif MODE not in ("thu", "lai"):
    raise SystemExit(__doc__)
