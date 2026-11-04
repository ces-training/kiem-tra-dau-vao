/**
 * Máy chủ nhận kết quả bài kiểm tra đầu vào (tuỳ chọn).
 *
 * Cách cài (một lần):
 * 1. Mở Google Sheet muốn lưu kết quả (có thể dùng chung Sheet của web 21 ngày)
 *    → Tiện ích mở rộng → Apps Script → tạo tệp mới "KiemTra.gs", dán toàn bộ mã này.
 *    (Nếu dự án đã có hàm doPost của web 21 ngày, xem ghi chú ở cuối tệp.)
 * 2. Triển khai → Tùy chọn triển khai mới → Ứng dụng web
 *    Thực thi với tư cách: Tôi · Người có quyền truy cập: Bất kỳ ai → Triển khai.
 * 3. Sao chép link /exec, dán vào KQ_API trong data/cau-hinh.js của trang kiểm tra.
 *
 * Mỗi bài làm xong: thêm 1 dòng vào trang tính "Kiểm tra đầu vào",
 * lưu file kết quả (.json) và các file ghi âm phần Nói vào thư mục Drive "Kiểm tra đầu vào".
 */
var TEN_TRANG = 'Kiểm tra đầu vào';
var TEN_THU_MUC = 'Kiểm tra đầu vào';
var BAC_EN = ['E0', 'E1', 'E2 Starters', 'E3 Movers', 'E4 Flyers', 'E5 trên Flyers'];
var BAC_ZH = ['C0', 'C1', 'C2 YCT1', 'C3 YCT2', 'C4 YCT3', 'C5 YCT4+'];

function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  if (!d || !d.phien || !d.hs) return ContentService.createTextOutput('bo qua');
  return luuKiemTra_(d);
}

function luuKiemTra_(d) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(TEN_TRANG) || taoTrang_(ss);
    var goc = layThuMuc_(DriveApp.getRootFolder(), TEN_THU_MUC);
    var tm = layThuMuc_(goc, (d.hs.ten || 'be') + ' - ' + (d.hs.sdt || '') + ' - ' + d.phien);
    // ghi âm
    var soFile = 0;
    Object.keys(d.ghiAm || {}).forEach(function (k) {
      var m = String(d.ghiAm[k]).match(/^data:([^;]+);base64,(.*)$/); if (!m) return;
      var ten = k.split('/').slice(1).join('_') + (m[1].indexOf('ogg') >= 0 ? '.ogg' : m[1].indexOf('mp4') >= 0 ? '.m4a' : '.webm');
      tm.getFilesByName(ten).hasNext() || tm.createFile(Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], ten));
      soFile++;
    });
    var kq = JSON.parse(JSON.stringify(d)); delete kq.ghiAm;
    tm.createFile('ket-qua.json', JSON.stringify(kq, null, 1), MimeType.PLAIN_TEXT);
    var t = d.tongHop || {}, en = t.en || { kn: {} }, zh = t.zh || { kn: {} };
    var b = function (arr, v) { return v == null ? '' : arr[v] || v; };
    var row = [new Date(), d.hs.ten, d.hs.tuoi, d.hs.sdt, d.phien,
      b(BAC_EN, en.chung), b(BAC_EN, (en.kn.TV || {}).bac), b(BAC_EN, (en.kn.NG || {}).bac), b(BAC_EN, (en.kn.DO || {}).bac), b(BAC_EN, (en.kn.VI || {}).bac), en.choNoi ? 'chờ chấm' : b(BAC_EN, (en.kn.NO || {}).bac),
      b(BAC_ZH, zh.chung), b(BAC_ZH, (zh.kn.NG || {}).bac), b(BAC_ZH, (zh.kn.DO || {}).bac), b(BAC_ZH, (zh.kn.VI || {}).bac), zh.choNoi ? 'chờ chấm' : b(BAC_ZH, (zh.kn.NO || {}).bac),
      ['', 'Chắc chắn', 'Cần xem lại', 'Cần gặp trực tiếp'][Math.max(en.chac || 1, zh.chac || 1)],
      soFile, tm.getUrl()];
    // gửi lại cùng phiên thì cập nhật dòng cũ
    var data = sh.getRange(1, 5, Math.max(sh.getLastRow(), 1), 1).getValues();
    for (var i = data.length - 1; i >= 1; i--) if (data[i][0] === d.phien) { sh.getRange(i + 1, 1, 1, row.length).setValues([row]); return ContentService.createTextOutput('ok'); }
    sh.appendRow(row);
    return ContentService.createTextOutput('ok');
  } finally { lock.releaseLock(); }
}

function taoTrang_(ss) {
  var sh = ss.insertSheet(TEN_TRANG);
  sh.appendRow(['Thời gian', 'Tên bé', 'Tuổi', 'SĐT ba mẹ', 'Mã phiên',
    'TA · Bậc chung', 'TA · Từ vựng', 'TA · Nghe', 'TA · Đọc', 'TA · Viết', 'TA · Nói',
    'TT · Bậc chung', 'TT · Nghe', 'TT · Đọc', 'TT · Viết', 'TT · Nói',
    'Mức chắc chắn', 'Số file ghi âm', 'Thư mục Drive']);
  sh.setFrozenRows(1); sh.getRange(1, 1, 1, 19).setFontWeight('bold').setBackground('#FFF4CC');
  return sh;
}
function layThuMuc_(cha, ten) { var it = cha.getFoldersByName(ten); return it.hasNext() ? it.next() : cha.createFolder(ten); }

/* Ghi chú: nếu dự án Apps Script này đã có doPost (ví dụ của web 21 ngày), đổi tên hàm doPost ở trên
   thành doPostKiemTra, rồi ở đầu doPost sẵn có thêm:
     try { var d = JSON.parse(e.postData.contents); if (d && d.phien && d.ketQua) return luuKiemTra_(d); } catch (x) {}
*/
