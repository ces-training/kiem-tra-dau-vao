/* Sinh data/tai-nguyen.js và hai danh sách sản xuất:
     - san-xuat/hinh-can-ve.csv / .json  : mọi tranh cần vẽ (mã, mô tả, câu lệnh vẽ)
     - san-xuat/giong-doc.csv / .json    : mọi câu cần thu giọng (mã, nhân vật, giọng, lời)
   Chạy:  node tools/build.js           (từ thư mục gốc của trang)
   Khi đã có tranh thật: đặt file vào img/tranh/<mã>.webp rồi chạy lại.
   Khi đã có giọng thật: đặt file vào audio/<mã>.mp3 rồi chạy lại. */
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data/cau-hoi.js'), 'utf8'), ctx);
const KT = ctx.KT;
const SHARED = require('../chung.js');
const giong = JSON.parse(fs.readFileSync(path.join(__dirname, 'giong_nhan_vat.json'), 'utf8'));

/* ---------- 1. Duyệt toàn bộ ngân hàng ---------- */
const flat = SHARED.lapNganHang(KT);          // [{id, item, lang, ...}]
const emojis = new Set(['⭐', '🔊', '🎤', '👍', '👎', '✅', '🏆', '🎁', '🔒', '✔️', '✖️', '🍀', '🎒', '🗺️', '🏠', '❓', '🔈', '🔇', '🥳', '⏭️']);
const pics = [];   // {id, spec, desc, noi}
const lines = new Map(); // id -> {nv, lang, loi, noi:[]}

function seg(s) { return [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(s)].map(x => x.segment).filter(x => x.trim()); }
function collectSpec(spec) {
  for (const part of spec.split('+')) {
    const p = part.trim(); const m = p.split(':');
    if (m[0] === 'e') seg(p.slice(2)).forEach(c => emojis.add(c));
    else if ((m[0] === 'c' || m[0] === 'ch') && m.length >= 3) seg(m.slice(2).join(':')).forEach(c => emojis.add(c));
    else if (m[0] === 'k' && m.length >= 3) seg(m.slice(2).join(':')).forEach(c => emojis.add(c));
  }
}
function addPic(id, s, noi) {
  if (!s) return; const { spec, desc } = SHARED.tachTranh(s);
  if (/^(t|s|ts):/.test(s)) return;
  collectSpec(spec);
  if (/^(n|L|clock|cal):/.test(spec) && !spec.includes('+')) return;        // vẽ bằng code, không cần tranh
  if (/^c:[a-z]+$/.test(spec)) return;                                      // mảng màu
  if (/^(f|ch):[a-z]+$/.test(spec)) return;                                 // tranh / nhân vật có sẵn
  pics.push({ id, spec, desc: desc || '', noi });
}
function addLine(nv, lang, loi, noi) {
  if (!loi) return; const id = SHARED.maGiong(nv, lang, loi);
  if (!lines.has(id)) lines.set(id, { id, nv, lang, loi, noi: [] });
  lines.get(id).noi.push(noi);
}

for (const f of flat) {
  const it = f.item, nvDan = f.dan;
  addPic(f.id + '_pic', it.pic, f.id);
  (it.o || []).forEach((o, i) => {
    addPic(f.id + '_o' + (i + 1), o, f.id);
    if (o.startsWith('s:') || o.startsWith('ts:')) addLine(nvDan, f.lang, o.replace(/^t?s:/, ''), f.id);
  });
  (it.vat || []).forEach((o, i) => addPic(f.id + '_v' + (i + 1), o, f.id));
  const a = it.a === '=q' ? it.q : it.a;
  if (typeof a === 'string') addLine(nvDan, f.lang, a, f.id);
  else if (Array.isArray(a)) a.forEach(([nv, t]) => addLine(nv, f.lang, t, f.id));
  if (it.truyen && it.docTo) addLine(nvDan, f.lang, KT.EN.DO.truyen[it.truyen], f.id);
  if (it.goiY && f.kind === 'noi') addLine(nvDan, f.lang, it.goiY, f.id);
  (it.buoc || []).forEach((b, i) => { addPic(f.id + '_b' + (i + 1), b.pic, f.id); addLine(nvDan, f.lang, b.a, f.id); });
}
KT.ZH.HAN.forEach((h, i) => addLine('xm', 'zh', h[0], 'Z-HZ-' + (i + 1)));
Object.entries(KT.LOI).forEach(([k, v]) => { if (!v.includes('{')) addLine(k === 'thuThem' ? 'tho' : (k === 'vaoZh' ? 'xm' : 'huou'), 'vi', v, 'LOI-' + k); });
KT.KHEN.en.forEach(t => addLine('anna', 'en', t, 'KHEN')); KT.KHEN.zh.forEach(t => addLine('xm', 'zh', t, 'KHEN'));
['thu'].forEach(() => {});
/* hướng dẫn từng bậc */
for (const st of SHARED.cacTram(KT)) for (const [b, lv] of Object.entries(st.def.bac || {})) if (lv.hd) addLine('huou', 'vi', lv.hd, st.ma + '-' + b);

/* ---------- 2. Emoji Fluent → img/emoji ---------- */
/* Nguồn: npm i @iconify-json/fluent-emoji-flat rồi chép thư mục gói vào tools/fluent-emoji-flat.
   Không có thư mục này thì giữ nguyên danh sách emoji cũ (chỉ cần khi thêm emoji mới). */
const FL = path.join(__dirname, 'fluent-emoji-flat');
const coFL = fs.existsSync(path.join(FL, 'icons.json'));
const icons = coFL ? JSON.parse(fs.readFileSync(path.join(FL, 'icons.json'), 'utf8')) : null;
const chars = coFL ? JSON.parse(fs.readFileSync(path.join(FL, 'chars.json'), 'utf8')) : null;
const emojiMap = {}; const thieu = [];
if (!coFL) {
  const cu = path.join(ROOT, 'data/tai-nguyen.js');
  const m = fs.existsSync(cu) && fs.readFileSync(cu, 'utf8').match(/KT\.EMOJI = (\{.*?\});/);
  if (m) Object.assign(emojiMap, JSON.parse(m[1]));
  console.log('Không có tools/fluent-emoji-flat: giữ ' + Object.keys(emojiMap).length + ' emoji cũ.');
}
fs.mkdirSync(path.join(ROOT, 'img/emoji'), { recursive: true });
for (const e of coFL ? emojis : []) {
  const cps = [...e].map(c => c.codePointAt(0).toString(16));
  const keys = [cps.join('-'), cps.filter(c => c !== 'fe0f').join('-')];
  const name = keys.map(k => chars[k]).find(Boolean);
  const ic = name && (icons.icons[name] || (icons.aliases[name] && icons.icons[icons.aliases[name].parent]));
  if (!ic) { thieu.push(e); continue; }
  const w = ic.width || icons.width, h = ic.height || icons.height;
  const file = 'img/emoji/' + name + '.svg';
  fs.writeFileSync(path.join(ROOT, file), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${ic.body}</svg>`);
  emojiMap[e] = file;
}

/* ---------- 3. File có sẵn ---------- */
const ls = d => fs.existsSync(path.join(ROOT, d)) ? fs.readdirSync(path.join(ROOT, d)) : [];
const tranhCo = ls('img/tranh').filter(f => /\.(webp|png|jpg)$/.test(f));
const amCo = ls('audio').filter(f => /\.mp3$/.test(f));
const out = `/* TỰ SINH bởi tools/build.js – không sửa tay */
KT.EMOJI = ${JSON.stringify(emojiMap)};
KT.TRANH_CO = ${JSON.stringify(Object.fromEntries(tranhCo.map(f => [f.replace(/\.\w+$/, ''), 'img/tranh/' + f])))};
KT.AM_CO = ${JSON.stringify(Object.fromEntries(amCo.map(f => [f.replace(/\.mp3$/, ''), 'audio/' + f])))};
`;
fs.writeFileSync(path.join(ROOT, 'data/tai-nguyen.js'), out);

/* ---------- 4. Danh sách sản xuất ---------- */
const PHONG_CACH = 'Tranh minh hoạ 2D cho trẻ em, nét viền nâu mềm, màu ấm, nền trắng, cùng phong cách bảng nhân vật Little Language Explorers (img/nhan-vat). ';
fs.mkdirSync(path.join(ROOT, 'san-xuat'), { recursive: true });
const picRows = pics.filter(p => !tranhCo.some(f => f.startsWith(p.id + '.')));
fs.writeFileSync(path.join(ROOT, 'san-xuat/hinh-can-ve.json'), JSON.stringify(picRows.map(p => ({ ma: p.id, mo_ta: p.desc, tranh_tam: p.spec, cau_lenh: PHONG_CACH + p.desc, file: 'img/tranh/' + p.id + '.webp' })), null, 1));
const csv = r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',');
fs.writeFileSync(path.join(ROOT, 'san-xuat/hinh-can-ve.csv'), '\ufeff' + [csv(['Mã (tên file .webp)', 'Mô tả', 'Câu lệnh vẽ'])].concat(picRows.map(p => csv([p.id, p.desc, PHONG_CACH + p.desc]))).join('\n'));
const TEN_NV = { huou: 'co_huou', anna: 'anna', xm: 'xiaomei', leo: 'leo', bong: 'bong', tho: 'tho_con', gau: 'gau_con', me: 'me', bo: 'bo' };
const lineRows = [...lines.values()].filter(l => !amCo.includes(l.id + '.mp3'));
fs.writeFileSync(path.join(ROOT, 'san-xuat/giong-doc.json'), JSON.stringify(lineRows.map(l => ({ ma: l.id, nhan_vat: TEN_NV[l.nv] || l.nv, giong: (giong[TEN_NV[l.nv]] || [''])[0], nang_tong: (giong[TEN_NV[l.nv]] || [0, false])[1], tieng: l.lang, loi: l.loi, file: 'audio/' + l.id + '.mp3', dung_o: l.noi })), null, 1));
fs.writeFileSync(path.join(ROOT, 'san-xuat/giong-doc.csv'), '\ufeff' + [csv(['Mã (tên file .mp3)', 'Nhân vật', 'Giọng Gemini', 'Tiếng', 'Lời'])].concat(lineRows.map(l => csv([l.id, TEN_NV[l.nv] || l.nv, (giong[TEN_NV[l.nv]] || [''])[0], l.lang, l.loi]))).join('\n'));

console.log('Câu hỏi:', flat.length, '| Tranh cần vẽ:', picRows.length, '| Câu cần thu giọng:', lineRows.length, '| Emoji:', Object.keys(emojiMap).length, '| Emoji thiếu:', thieu.join(' ') || 'không');
