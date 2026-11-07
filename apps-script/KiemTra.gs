/**
 * Máy chủ nhận kết quả bài kiểm tra đầu vào – bản 2 (có máy chấm gợi ý phần Nói).
 *
 * Cách cài (một lần):
 * 1. Mở Google Sheet "Kết quả kiểm tra đầu vào" → Tiện ích mở rộng → Apps Script, dán toàn bộ mã này (thay mã cũ), Lưu.
 * 2. Cài đặt dự án (bánh răng bên trái) → Thuộc tính tập lệnh → Thêm: GEMINI_KEY = khoá Gemini (AQ… hoặc AIza…).
 *    Không có khoá thì mọi thứ vẫn chạy, chỉ bỏ qua phần máy chấm gợi ý.
 * 3. Chọn hàm khoiTao → Chạy (cấp quyền nếu được hỏi).
 * 4. Triển khai → Quản lý triển khai → bút chì → Phiên bản: Phiên bản mới → Triển khai (giữ nguyên link /exec).
 *
 * Mỗi lần web gửi (sau mỗi trạm và khi xong bài): cập nhật 1 dòng theo Mã phiên trong trang "Kiểm tra đầu vào",
 * lưu ket-qua.json + ghi âm phần Nói vào thư mục "Kiểm tra đầu vào" nằm cạnh Sheet.
 * Khi có đủ ghi âm phần Nói của một thứ tiếng: Gemini nghe, chép lời, gợi ý điểm 0–3 từng câu và bậc Nói.
 * Giáo viên chấm cuối ở 3 cột cuối (máy không bao giờ ghi đè các cột này).
 */
var TEN_TRANG = 'Kiểm tra đầu vào';
var TEN_THU_MUC = 'Kiểm tra đầu vào';
var MO_HINH = 'gemini-3.5-flash';
var BAC_EN = ['E0', 'E1', 'E2 Starters', 'E3 Movers', 'E4 Flyers', 'E5 trên Flyers'];
var BAC_ZH = ['C0', 'C1', 'C2 YCT1', 'C3 YCT2', 'C4 YCT3', 'C5 YCT4+'];
var TIEU_DE = ['Thời gian', 'Tên bé', 'Tuổi', 'SĐT ba mẹ', 'Mã phiên',
  'TA · Bậc chung', 'TA · Từ vựng', 'TA · Nghe', 'TA · Đọc', 'TA · Viết', 'TA · Nói',
  'TT · Bậc chung', 'TT · Nghe', 'TT · Đọc', 'TT · Viết', 'TT · Nói',
  'Mức chắc chắn', 'Số file ghi âm', 'Thư mục Drive', 'Tiến độ',
  'Máy gợi ý · Nói TA', 'Máy gợi ý · Nói TT', 'Máy nghe được / nhận xét',
  'GV chấm · Nói TA (0–3)', 'GV chấm · Nói TT (0–3)', 'Nhận xét của giáo viên'];
var SO_COT_MAY = 23;   // máy ghi từ cột 1 tới 23; 3 cột cuối dành cho giáo viên

function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  if (!d || !d.phien || !d.hs) return ContentService.createTextOutput('bo qua');
  return luuKiemTra_(d);
}

function luuKiemTra_(d) {
  var lock = LockService.getScriptLock(); lock.waitLock(30000);
  var sh, dong, tm, viecCham = [];
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    sh = ss.getSheetByName(TEN_TRANG) || taoTrang_(ss);
    sh.getRange(1, 1, 1, TIEU_DE.length).setValues([TIEU_DE]);
    var cha = DriveApp.getFileById(ss.getId()).getParents();
    var goc = layThuMuc_(cha.hasNext() ? cha.next() : DriveApp.getRootFolder(), TEN_THU_MUC);
    tm = layThuMuc_(goc, (d.hs.ten || 'be') + ' - ' + (d.hs.sdt || '') + ' - ' + d.phien);
    // ghi âm: mỗi file chỉ lưu một lần
    var soFile = 0;
    Object.keys(d.ghiAm || {}).forEach(function (k) {
      var m = String(d.ghiAm[k]).match(/^data:([^;,]+)[^,]*?;base64,(.*)$/); if (!m) return;   // nhận cả dạng "audio/webm;codecs=opus" 
      var ten = tenFile_(k, m[1]);
      if (!tm.getFilesByName(ten).hasNext()) tm.createFile(Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], ten));
    });
    var it = tm.getFiles(); while (it.hasNext()) { var f = it.next(); if (/\.(webm|ogg|m4a)$/.test(f.getName())) soFile++; }
    // kết quả: ghi đè ket-qua.json
    var kq = JSON.parse(JSON.stringify(d)); delete kq.ghiAm;
    var cu = tm.getFilesByName('ket-qua.json'); while (cu.hasNext()) cu.next().setTrashed(true);
    tm.createFile('ket-qua.json', JSON.stringify(kq, null, 1), MimeType.PLAIN_TEXT);

    var t = d.tongHop || {}, en = t.en || { kn: {} }, zh = t.zh || { kn: {} };
    var b = function (arr, v) { return v == null ? '' : arr[v] || v; };
    var row = [new Date(), d.hs.ten, d.hs.tuoi, d.hs.sdt, d.phien,
      b(BAC_EN, en.chung), b(BAC_EN, (en.kn.TV || {}).bac), b(BAC_EN, (en.kn.NG || {}).bac), b(BAC_EN, (en.kn.DO || {}).bac), b(BAC_EN, (en.kn.VI || {}).bac), en.choNoi ? 'chờ chấm' : b(BAC_EN, (en.kn.NO || {}).bac),
      b(BAC_ZH, zh.chung), b(BAC_ZH, (zh.kn.NG || {}).bac), b(BAC_ZH, (zh.kn.DO || {}).bac), b(BAC_ZH, (zh.kn.VI || {}).bac), zh.choNoi ? 'chờ chấm' : b(BAC_ZH, (zh.kn.NO || {}).bac),
      ['', 'Chắc chắn', 'Cần xem lại', 'Cần gặp trực tiếp'][Math.max(en.chac || 1, zh.chac || 1)],
      soFile, tm.getUrl(), d.tienDo || '', '', '', ''];
    // tìm dòng cũ của phiên này: giữ lại phần máy chấm đã có
    var last = Math.max(sh.getLastRow(), 1);
    var data = sh.getRange(1, 1, last, SO_COT_MAY).getValues();
    dong = 0;
    for (var i = data.length - 1; i >= 1; i--) if (data[i][4] === d.phien) { dong = i + 1; row[20] = data[i][20]; row[21] = data[i][21]; row[22] = data[i][22]; break; }
    if (!dong) { sh.appendRow(row.concat(['', '', ''])); dong = sh.getLastRow(); }
    else sh.getRange(dong, 1, 1, SO_COT_MAY).setValues([row]);
    // việc chấm phần Nói còn thiếu
    [['E-NO', 'en', 20], ['Z-NO', 'zh', 21]].forEach(function (x) {
      var tram = (d.ketQua || {})[x[0]];
      if (tram && tram.tasks && tram.tasks.length && !row[x[2]]) {
        viecCham.push({ tram: tram, lang: x[1], cot: x[2] });
        sh.getRange(dong, x[2] + 1).setValue('đang chấm…');   // đánh dấu để lần gửi sau không chấm lại (không tốn tiền 2 lần)
      }
    });
  } finally { lock.releaseLock(); }

  // máy chấm gợi ý (ngoài khoá để không chặn lần gửi khác)
  var khoa = PropertiesService.getScriptProperties().getProperty('GEMINI_KEY');
  if (khoa && viecCham.length) viecCham.forEach(function (v) {
    try {
      var kq = chamNoi_(khoa, v.tram, v.lang, d.hs, tm);
      if (!kq) { sh.getRange(dong, v.cot + 1).setValue(''); return; }   // chưa có file ghi âm: để trống, lần gửi sau có ghi âm thì chấm
      sh.getRange(dong, v.cot + 1).setValue(kq.goiY);
      var o = sh.getRange(dong, 23), cu = o.getValue();
      o.setValue((cu ? cu + '\n' : '') + (v.lang === 'en' ? 'TA: ' : 'TT: ') + kq.nhanXet);
    } catch (err) {
      sh.getRange(dong, v.cot + 1).setValue('lỗi máy chấm: ' + String(err).slice(0, 80));
    }
  });
  return ContentService.createTextOutput('ok');
}

/* Gemini nghe các câu trả lời của một thứ tiếng, chép lời và gợi ý điểm */
function chamNoi_(khoa, tram, lang, hs, tm) {
  var parts = [], ds = [];
  tram.tasks.forEach(function (t) {
    (t.buoc || []).forEach(function (bc) {
      var f = timFile_(tm, bc.key); if (!f) return;
      ds.push({ key: bc.key, task: t.id, bac: t.bac, kd: !!t.kd, nhac: !!t.nhac, hoi: bc.a, dat: t.dat || '' });
      parts.push({ text: 'Câu ' + ds.length + ' [' + bc.key + '] ' + (t.nhac ? 'Bé nghe rồi NHẮC LẠI câu: ' : 'Bạn nhỏ hỏi / yêu cầu: ') + bc.a + (t.dat ? ' | Tiêu chí đạt: ' + t.dat : '') });
      var blob = f.getBlob();
      parts.push({ inlineData: { mimeType: blob.getContentType() || 'audio/webm', data: Utilities.base64Encode(blob.getBytes()) } });
    });
  });
  if (!ds.length) return null;
  var tieng = lang === 'en' ? 'tiếng Anh' : 'tiếng Trung (Quan thoại)';
  parts.unshift({ text: 'Bạn là giáo viên chấm phần NÓI ' + tieng + ' của một bé ' + (hs.tuoi || '') + ' tuổi trong bài kiểm tra đầu vào. ' +
    'Dưới đây là ' + ds.length + ' đoạn ghi âm, mỗi đoạn đi sau mô tả câu hỏi. Với từng đoạn: chép lại chính xác lời bé nói (ghi "(im lặng)" nếu không nói), ' +
    'rồi cho điểm 0–3: 0 = im lặng hoặc không liên quan; 1 = chỉ một từ đúng ý hoặc nói tiếng Việt; 2 = trả lời đúng ý nhưng chưa đủ câu hoặc sai ngữ pháp/phát âm làm khó hiểu; 3 = trả lời đủ câu, đúng, rõ. ' +
    (lang === 'zh' ? 'Thêm điểm thanh điệu 0–2 (0 sai nhiều, 1 sai vài chỗ, 2 đúng). ' : '') +
    'Chấm khoan dung với trẻ nhỏ, không trừ điểm vì giọng trẻ con. ' +
    'Trả về JSON: {"cau":[{"so":1,"nghe":"...","diem":0' + (lang === 'zh' ? ',"thanhDieu":0' : '') + '}],"nhanXet":"2–3 câu tiếng Việt cho giáo viên: điểm mạnh, điểm cần luyện"}' });
  var body = { contents: [{ parts: parts }], generationConfig: { responseMimeType: 'application/json', temperature: 0 } };
  var res = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + MO_HINH + ':generateContent', {
    method: 'post', contentType: 'application/json', payload: JSON.stringify(body), headers: { 'x-goog-api-key': khoa }, muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) throw new Error('Gemini ' + res.getResponseCode() + ' ' + res.getContentText().slice(0, 120));
  var j = JSON.parse(JSON.parse(res.getContentText()).candidates[0].content.parts[0].text);
  // gộp điểm theo từng câu hỏi lớn → bậc gợi ý (giống cách tính của web: trung bình ≥ 2 là đạt bậc đó)
  var theoBac = {};
  (j.cau || []).forEach(function (c) {
    var x = ds[(c.so || 0) - 1]; if (!x || x.kd) return;
    x.diem = c.diem; x.nghe = c.nghe; x.thanhDieu = c.thanhDieu;
    (theoBac[x.bac] = theoBac[x.bac] || []).push(Number(c.diem) || 0);
  });
  var cacBac = Object.keys(theoBac).map(Number).sort(), cao = null, tbs = [];
  cacBac.forEach(function (bb) { var a = theoBac[bb], tb = a.reduce(function (s, v) { return s + v; }, 0) / a.length; tbs.push('bậc ' + bb + ': ' + tb.toFixed(1)); if (tb >= 2) cao = bb; });
  if (cao == null && cacBac.length) cao = Math.max(0, cacBac[0] - 1);
  var nhan = lang === 'en' ? BAC_EN : BAC_ZH;
  tm.createFile('may-cham-noi-' + lang + '.json', JSON.stringify({ moHinh: MO_HINH, luc: new Date(), cau: ds, nhanXet: j.nhanXet }, null, 1), MimeType.PLAIN_TEXT);
  return { goiY: (cao == null ? '' : nhan[cao] || cao) + ' (' + tbs.join(', ') + ')', nhanXet: j.nhanXet || '' };
}

function tenFile_(k, mime) { return k.split('/').slice(1).join('_') + (mime.indexOf('ogg') >= 0 ? '.ogg' : mime.indexOf('mp4') >= 0 ? '.m4a' : '.webm'); }
function timFile_(tm, key) {
  var goc = key.split('/').slice(1).join('_');
  var exts = ['.webm', '.ogg', '.m4a'];
  for (var i = 0; i < exts.length; i++) { var it = tm.getFilesByName(goc + exts[i]); if (it.hasNext()) return it.next(); }
  return null;
}
function taoTrang_(ss) {
  var sh = ss.insertSheet(TEN_TRANG);
  sh.appendRow(TIEU_DE);
  return sh;
}
function dinhDang_(sh) {
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, TIEU_DE.length).setFontWeight('bold').setBackground('#FFF4CC').setWrap(true);
  sh.getRange(1, 21, 1, 3).setBackground('#E3F0FF');   // máy gợi ý
  sh.getRange(1, 24, 1, 3).setBackground('#E2F5E9');   // giáo viên
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(['0', '1', '2', '3'], true).setAllowInvalid(true).build();
  sh.getRange(2, 24, Math.max(sh.getMaxRows() - 1, 1), 2).setDataValidation(rule);
  sh.setColumnWidth(23, 320); sh.setColumnWidth(26, 320);
}
function layThuMuc_(cha, ten) { var it = cha.getFoldersByName(ten); return it.hasNext() ? it.next() : cha.createFolder(ten); }

/* Chạy một lần sau khi dán mã: tạo/cập nhật tiêu đề, định dạng cột, cấp quyền Drive + gọi mạng */
function khoiTao() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TEN_TRANG) || taoTrang_(ss);
  sh.getRange(1, 1, 1, TIEU_DE.length).setValues([TIEU_DE]);
  dinhDang_(sh);
  var cha = DriveApp.getFileById(ss.getId()).getParents();
  layThuMuc_(cha.hasNext() ? cha.next() : DriveApp.getRootFolder(), TEN_THU_MUC);
  var khoa = PropertiesService.getScriptProperties().getProperty('GEMINI_KEY');
  if (!khoa) { Logger.log('Chưa có GEMINI_KEY: phần máy chấm gợi ý sẽ được bỏ qua.'); return; }
  var r = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/' + MO_HINH, { headers: { 'x-goog-api-key': khoa }, muteHttpExceptions: true });
  Logger.log(r.getResponseCode() === 200 ? 'Khoá Gemini dùng được.' : 'Khoá Gemini lỗi: ' + r.getResponseCode());
}

/* Chấm lại các dòng bị "lỗi máy chấm" hoặc kẹt "đang chấm…" (sau khi đã đổi khoá Gemini). Chạy tay: chọn chamLaiLoi → Chạy. */
function chamLaiLoi() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(TEN_TRANG);
  var khoa = PropertiesService.getScriptProperties().getProperty('GEMINI_KEY');
  if (!sh || !khoa) { Logger.log('Thiếu trang hoặc GEMINI_KEY'); return; }
  var n = sh.getLastRow(); if (n < 2) return;
  var data = sh.getRange(2, 1, n - 1, SO_COT_MAY).getValues(), xong = 0, loi = 0;
  data.forEach(function (r, i) {
    var dong = i + 2, m = String(r[18]).match(/folders\/([\w-]+)/); if (!m) return;
    var tm = DriveApp.getFolderById(m[1]), kqf = tm.getFilesByName('ket-qua.json'); if (!kqf.hasNext()) return;
    var d = JSON.parse(kqf.next().getBlob().getDataAsString());
    var coLoi = false;
    [['E-NO', 'en', 20], ['Z-NO', 'zh', 21]].forEach(function (x) {
      var cu = String(r[x[2]]); if (!/^(lỗi máy chấm|đang chấm)/.test(cu)) return;
      var tram = (d.ketQua || {})[x[0]]; if (!tram || !tram.tasks) return;
      try {
        var kq = chamNoi_(khoa, tram, x[1], d.hs || {}, tm);
        sh.getRange(dong, x[2] + 1).setValue(kq ? kq.goiY : '');
        if (kq) { var o = sh.getRange(dong, 23), c = coLoi ? o.getValue() : ''; o.setValue((c ? c + '\n' : '') + (x[1] === 'en' ? 'TA: ' : 'TT: ') + kq.nhanXet); coLoi = true; }
        xong++;
      } catch (err) { sh.getRange(dong, x[2] + 1).setValue('lỗi máy chấm: ' + String(err).slice(0, 80)); loi++; }
    });
  });
  Logger.log('Đã chấm lại ' + xong + ', còn lỗi ' + loi);
}
