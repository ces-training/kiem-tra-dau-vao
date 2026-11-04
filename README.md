# Kiểm tra đầu vào Anh – Trung (5–10 tuổi)

Trang kiểm tra thích ứng, cùng giao diện và nhân vật với web Thử thách 21 ngày (Little Language Explorers).
Tiếng Anh trước (Từ vựng → Nghe → Đọc → Viết → Nói), nghỉ 1 phút, rồi tiếng Trung (Cổng → Nghe → Đọc + thẻ chữ Hán → Viết → Nói).
Nội dung lấy từ tài liệu "Nội dung chi tiết bài kiểm tra đầu vào Lingo Cub".

## Đưa lên GitHub Pages
1. Tạo kho mới (ví dụ `kiem-tra-dau-vao`) trong tài khoản `anh-trung-kids-ces`, hoặc một thư mục mới trong kho web 21 ngày.
2. Tải toàn bộ thư mục này lên (giữ nguyên các thư mục con `data/`, `img/`, `audio/`).
3. Settings → Pages → Deploy from a branch → `main` / root. Link có dạng `https://anh-trung-kids-ces.github.io/kiem-tra-dau-vao/`.

## Các link
- Bé làm bài: link gốc.
- Giáo viên: thêm `?gv=1` vào cuối link → nút "Giáo viên" ở thanh bên: chấm phần Nói, chấm bài viết tự do E4, xem từng câu trả lời, tải CSV, mở lại bất kỳ trạm nào để thử.
- Làm cho bé khác trên cùng máy: Trang chủ → "Bé khác làm".

## Sửa nội dung, cài đặt
- Câu hỏi: `data/cau-hoi.js` (giải thích cách ghi ở đầu tệp; lựa chọn đầu tiên luôn là đáp án đúng, web tự xáo).
- Tên lớp đề xuất theo bậc: `KT.LOP` trong `data/cau-hoi.js`.
- Cài đặt (link máy chủ nhận kết quả, chú thích dưới tranh, giọng Anh – Mỹ, số lần nghe, mật khẩu giáo viên, trọng số tính bậc): `data/cau-hinh.js`.

## Tranh và giọng đọc
Bản này chạy được ngay với **tranh tạm** (hình Fluent Emoji của Microsoft, giấy phép MIT, kèm chú thích tiếng Việt), nhân vật và một số tranh có sẵn của web 21 ngày, và **giọng máy** của trình duyệt khi chưa có file giọng.

Thay dần bằng tranh và giọng thật, không cần sửa code:
1. `san-xuat/hinh-can-ve.csv`: 247 tranh, mỗi dòng có mã (tên file), mô tả và câu lệnh vẽ theo phong cách bảng nhân vật. Vẽ bằng Gemini như web 21 ngày, lưu thành `img/tranh/<mã>.webp`.
2. `san-xuat/giong-doc.csv`: 329 câu, mỗi dòng có mã, nhân vật, giọng Gemini cố định (cùng bộ giọng web 21 ngày) và lời. Lưu thành `audio/<mã>.mp3`.
3. Chạy `node tools/build.js` để web nhận file mới (hoặc gửi các file cho Claude làm hộ). Khi đủ tranh thật, tắt `CHU_THICH` trong `data/cau-hinh.js`.

Lưu ý: khi sửa lời một câu trong `data/cau-hoi.js`, mã giọng của câu đó đổi theo, cần thu lại câu đó.

### Làm tranh và giọng bằng Gemini (tools/gemini)
Khoá Gemini để trong một tệp riêng ngoài kho (không bao giờ đưa lên GitHub).
- `python3 tools/gemini/tao_tranh.py <khoá> batch` – vẽ mọi tranh còn thiếu qua Batch API (rẻ một nửa). Tranh trùng câu lệnh chỉ vẽ một lần; tranh đếm số chỉ vẽ một vật mẫu rồi máy ghép đúng số lượng. Câu lệnh từng tranh: `tools/gemini/tranh_prompt.py`.
- `python3 tools/gemini/tao_giong.py <khoá> batch` – thu mọi câu còn thiếu, đúng giọng từng nhân vật như web 21 ngày.
- `python3 tools/gemini/kiem_tra.py <khoá>` – máy tự soát tranh (đúng số lượng, màu, vị trí) và giọng (đọc đủ, đúng thanh điệu), ghi `san-xuat/kiem-tra-tu-dong.json`.
- Trang `duyet.html`: cô xem toàn bộ tranh và nghe giọng, đánh dấu mục cần làm lại, sao chép danh sách gửi Claude. Làm lại riêng từng mục: `tao_tranh.py <khoá> lai <mã>` / `tao_giong.py <khoá> lai <mã>`.
- Xong thì chạy `node tools/build.js` để web dùng tranh, giọng mới.

## Nhận kết quả về Google Sheet (tuỳ chọn)
Làm theo hướng dẫn ở đầu `apps-script/KiemTra.gs`, dán link /exec vào `KQ_API`. Khi bé làm xong, web gửi 1 dòng vào trang tính "Kiểm tra đầu vào" và lưu file kết quả + ghi âm vào thư mục Drive "Kiểm tra đầu vào". Chưa cài thì ba mẹ bấm "Tải kết quả" ở trang Báo cáo và gửi file qua Zalo.

## Khác với tài liệu nội dung
- E-NG-1-1A/B ("Put the ball under the chair"): bé chọn 1 trong 3 tranh thay vì kéo đồ vật.
- Phần Nói: web ghi âm, giáo viên chấm trên trang giáo viên; bậc Nói hiện "chờ giáo viên chấm" đến khi chấm xong.
- "Chạm nhanh" (kích hoạt câu xác nhận) = chạm trong 1 giây đầu kể từ khi câu hiện ra.
- Bản ngắn cho tiếng Trung (khi phần tiếng Anh quá 20 phút hoặc có từ 5 lần chạm nhanh): bỏ câu xác nhận và trạm Viết, vẫn lên xuống bậc như thường.

## Cấu trúc
```
index.html, kt.css, kt.js    giao diện và bộ máy chạy bài
chung.js                     mã câu, mã tranh, mã giọng (dùng chung với tools/build.js)
data/cau-hoi.js              ngân hàng câu hỏi
data/cau-hinh.js             cài đặt
data/tai-nguyen.js           tự sinh: danh sách emoji, tranh, giọng đã có
img/nhan-vat, img/trang, img/dung-lai   nhân vật, ô trạm, bản đồ, tranh có sẵn của web 21 ngày
img/emoji                    tranh tạm Fluent Emoji (MIT)
img/tranh, audio             tranh vẽ thật, giọng thật (đặt vào đây)
san-xuat/                    danh sách tranh cần vẽ, câu cần thu giọng
apps-script/KiemTra.gs       máy chủ nhận kết quả
tools/build.js               sinh data/tai-nguyen.js và danh sách sản xuất
```
