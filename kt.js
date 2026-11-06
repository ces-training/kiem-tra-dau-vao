/* ============================================================
   Bài kiểm tra đầu vào Anh – Trung · bộ máy chạy bài
   Nội dung câu hỏi: data/cau-hoi.js · Cài đặt: data/cau-hinh.js
   ============================================================ */
(function () {
'use strict';
const KT = window.KT, CF = window.KT_CAU_HINH || {}, CH = window.KT_CHUNG;
const app = document.getElementById('app');
const GV = /[?&]gv=1/.test(location.search);
const LUU = 'kt-dau-vao-v1';
const ABC = 'ABCD';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ngu = ms => new Promise(r => setTimeout(r, ms));
const tron = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const kep = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------- tài nguyên ---------- */
const NV = { anna: 'img/nhan-vat/kids_anna_a.webp', bong: 'img/nhan-vat/kids_bong_a.webp', leo: 'img/nhan-vat/kids_leo_a.webp', xiaomei: 'img/nhan-vat/kids_xiaomei_a.webp', xm: 'img/nhan-vat/kids_xiaomei_a.webp', tho: 'img/nhan-vat/huou_tho_a.webp', gau: 'img/nhan-vat/huou_gau_a.webp', huou: 'img/nhan-vat/huou_huou1_a.webp', huou2: 'img/nhan-vat/huou_huou2_a.webp', huou3: 'img/nhan-vat/huou_huou3_a.webp' };
const TEN_NV = { anna: 'Anna', xm: 'Xiaomei', huou: 'Cô Hươu', tho: 'Thỏ con', bong: 'Bông', leo: 'Leo' };
const FILE = {
  cun: 'img/nhan-vat/pets_cun_ngoi_a.webp', meo: 'img/nhan-vat/pets_meo_ngoi_a.webp',
  hospital: 'v2_d2_w_hospital', school: 'v1_d1_w_school', park: 'v1_d1_w_park', zoo: 'v1_d1_w_zoo', home: 'v1_d1_w_home', shop: 'v1_d1_w_shop',
  teacher: 'v2_d1_w_teacher', student: 'v2_d1_w_student', doctor: 'v2_d1_w_doctor', chef: 'v2_d1_w_chef', dentist: 'v2_d1_w_dentist', driver: 'v2_d1_w_driver',
  dad: 'v2_d3_w_dad', mom: 'v2_d3_w_mom', obro: 'v2_d3_w_older_brother', osis: 'v2_d3_w_older_sister', train: 'v3_d1_w_train', plane: 'v3_d1_w_plane', bus: 'v3_d1_w_bus',
  family: 'v1_d3_w_family', hello: 'v1_n1_tu_hello_l1', goodbye: 'v1_n1_tu_goodbye_l1', grandpa: 'v3_n15_tu_grandpa_l2'
};
const fileSrc = k => { const v = FILE[k]; return !v ? '' : v.includes('/') ? v : 'img/dung-lai/' + v + '.webp'; };
const MAU = { red: '#E53935', blue: '#1E88E5', green: '#43A047', yellow: '#FDD835', pink: '#F06292', orange: '#FB8C00', black: '#333', white: '#fff', brown: '#8D5A3B' };
const STICKER = ['ava_anna_tham_hiem', 'ava_bong_tham_hiem', 'ava_leo_tham_hiem', 'ava_xiaomei_tham_hiem', 'ava_anna_sieu_nhan', 'ava_bong_phi_hanh', 'ava_leo_phi_hanh', 'ava_xiaomei_sieu_nhan'].map(s => 'img/trang/' + s + '.webp');

/* ---------- trạm trên bản đồ ---------- */
const LO = [
  { ma: 'E-TV', ten: 'Từ vựng', vung: 'en', x: 15, y: 31, ic: '📚' },
  { ma: 'E-NG', ten: 'Nghe', vung: 'en', x: 27, y: 25, ic: '🎧' },
  { ma: 'E-DO', ten: 'Đọc', vung: 'en', x: 38, y: 17, ic: '📖' },
  { ma: 'E-VI', ten: 'Viết', vung: 'en', x: 50, y: 13, ic: '✏️' },
  { ma: 'E-NO', ten: 'Nói', vung: 'en', x: 60, y: 22, ic: '🎤' },
  { ma: 'NGHI', ten: 'Nghỉ', vung: 'khac', x: 64, y: 38, ic: '⭐' },
  { ma: 'Z-G', ten: 'Cổng', vung: 'zh', x: 74, y: 46, ic: '🚪' },
  { ma: 'Z-NG', ten: 'Nghe', vung: 'zh', x: 85, y: 52, ic: '🎧' },
  { ma: 'Z-DO', ten: 'Đọc', vung: 'zh', x: 93, y: 64, ic: '📖' },
  { ma: 'Z-VI', ten: 'Viết', vung: 'zh', x: 89, y: 79, ic: '✏️' },
  { ma: 'Z-NO', ten: 'Nói', vung: 'zh', x: 78, y: 90, ic: '🎤' },
  { ma: 'KET', ten: 'Đích', vung: 'khac', x: 64, y: 93, ic: '🏆' }
];
const TRAM_DEF = { 'E-TV': KT.EN.TV, 'E-NG': KT.EN.NG, 'E-DO': KT.EN.DO, 'E-VI': KT.EN.VI, 'E-NO': KT.EN.NO, 'Z-NG': KT.ZH.NG, 'Z-DO': KT.ZH.DO, 'Z-VI': KT.ZH.VI, 'Z-NO': KT.ZH.NO };

/* ---------- trạng thái ---------- */
function moi() { return { hs: null, tien: {}, kq: {}, sticker: [], log: [], phien: Date.now().toString(36), batDau: null, gioEn: 0, daChao: false, ngan: false }; }
let S;
try { S = JSON.parse(localStorage.getItem(LUU)) || moi(); } catch (e) { S = moi(); }
function luu() { try { localStorage.setItem(LUU, JSON.stringify(S)); } catch (e) {} }

/* ghi âm lưu trong IndexedDB để không mất khi tải lại trang */
const Kho = {
  db: null,
  mo() { if (this.db) return Promise.resolve(this.db); return new Promise(res => { try { const r = indexedDB.open('kt-ghi-am', 1); r.onupgradeneeded = () => r.result.createObjectStore('am'); r.onsuccess = () => { this.db = r.result; res(this.db); }; r.onerror = () => res(null); } catch (e) { res(null); } }); },
  async dat(k, v) { const db = await this.mo(); if (!db) return; return new Promise(res => { const t = db.transaction('am', 'readwrite'); t.objectStore('am').put(v, k); t.oncomplete = res; t.onerror = res; }); },
  async lay(k) { const db = await this.mo(); if (!db) return null; return new Promise(res => { const r = db.transaction('am').objectStore('am').get(k); r.onsuccess = () => res(r.result || null); r.onerror = () => res(null); }); },
  async xoaHet() { const db = await this.mo(); if (!db) return; return new Promise(res => { const t = db.transaction('am', 'readwrite'); t.objectStore('am').clear(); t.oncomplete = res; }); }
};

/* ============================================================
   ÂM THANH: file giọng nếu có, chưa có thì đọc bằng giọng máy
   ============================================================ */
const Am = {
  tat: false, cur: null, luot: 0,
  giongMay: [],
  napGiong() { try { this.giongMay = speechSynthesis.getVoices(); } catch (e) {} },
  chonGiong(lang) {
    const want = lang === 'en' ? (CF.GIONG_ANH || 'en-GB') : lang === 'zh' ? 'zh-CN' : 'vi-VN';
    const v = this.giongMay;
    return v.find(x => x.lang.replace('_', '-') === want) || v.find(x => x.lang.toLowerCase().startsWith(want.slice(0, 2))) || null;
  },
  tHuy: 0, choPhat: null, uHien: null,
  dung() { this.luot++; this.choPhat = null; try { if (this.cur) { this.cur.pause(); this.cur = null; } this.tHuy = performance.now(); speechSynthesis.cancel(); } catch (e) {} },
  async noi(nv, lang, loi, toc) {
    if (!loi || this.tat) return;
    const id = CH.maGiong(nv, lang, loi), f = KT.AM_CO && KT.AM_CO[id];
    if (f) return this.file(f, toc);
    try { console.warn('THIEU_GIONG', id, loi); } catch (e) {}
    return this.may(nv, lang, loi, toc);
  },
  file(src, toc) {
    const luot = this.luot;
    return new Promise(res => {
      const a = new Audio(src); this.cur = a;
      if (toc && toc !== 1) { a.preservesPitch = a.webkitPreservesPitch = true; a.playbackRate = toc; }   /* đọc chậm lại, giữ nguyên giọng */
      const xong = () => { if (this.cur === a) this.cur = null; res(); };
      a.onended = xong; a.onerror = xong;
      a.play().catch(err => { if (err && err.name === 'NotAllowedError') this.choPhat = () => this.file(src, toc); xong(); });
      setTimeout(() => { if (luot !== this.luot) xong(); }, 60000);
    });
  },
  async may(nv, lang, loi, toc) {
    if (!('speechSynthesis' in window)) return;
    const luot = this.luot, ss = speechSynthesis;
    try {
      if (!this.giongMay.length) { this.napGiong(); if (!this.giongMay.length) { await ngu(300); this.napGiong(); } }
      /* Chrome hay "nuốt" câu nói nếu speak() ngay sau cancel() */
      const cho = 150 - (performance.now() - this.tHuy); if (cho > 0) await ngu(cho);
      if (luot !== this.luot) return;
      if (ss.paused) ss.resume();
      const text = loi.replace(/_{2,}/g, ' ... ').replace(/\s*\/\s*[^\n]*$/m, '');
      /* chia câu dài: Chrome tự ngắt giọng máy sau khoảng 15 giây */
      const doan = []; for (const c of text.match(/[^.!?。！？]+[.!?。！？]*\s*/g) || [text]) {
        if (doan.length && (doan[doan.length - 1] + c).length < 140) doan[doan.length - 1] += c; else doan.push(c);
      }
      const g = this.chonGiong(lang);
      const tre = ['anna', 'leo', 'xm', 'bong', 'tho', 'gau'].includes(nv);
      for (const d of doan) {
        if (luot !== this.luot) return;
        const ok = await new Promise(res => {
          const u = new SpeechSynthesisUtterance(d); this.uHien = u; /* giữ tham chiếu để Chrome không làm mất sự kiện onend */
          if (g) u.voice = g;
          u.lang = g ? g.lang : (lang === 'en' ? (CF.GIONG_ANH || 'en-GB') : lang === 'zh' ? 'zh-CN' : 'vi-VN');
          u.pitch = nv === 'bo' ? 0.75 : nv === 'tho' ? 1.6 : tre ? 1.35 : nv === 'me' ? 1.1 : 1;
          u.rate = (lang === 'zh' ? 0.78 : lang === 'en' ? (tre ? 0.88 : 0.9) : 1) * (toc || 1);
          let xong = false; const kt = v => { if (!xong) { xong = true; res(v); } };
          u.onend = () => kt(true);
          u.onerror = ev => { if (ev && ev.error === 'not-allowed') { this.choPhat = () => this.may(nv, lang, loi, toc); kt(false); } else kt(true); };
          ss.speak(u);
          setTimeout(() => kt(true), 1500 + d.length * (lang === 'zh' ? 380 : 110) / (toc || 1));
        });
        if (!ok) return;
      }
    } catch (e) {}
  },
  async chuoi(a, lang, nvDan) {
    if (typeof a === 'string') return this.noi(nvDan, lang, a);
    const luot = this.luot;
    for (const [nv, t] of a) { if (luot !== this.luot) return; await this.noi(nv, lang, t); await ngu(350); }
  }
};
try { Am.napGiong(); speechSynthesis.onvoiceschanged = () => Am.napGiong(); } catch (e) {}
/* Trình duyệt chặn tiếng khi bé chưa chạm vào trang: chạm lần đầu thì đọc lại câu vừa bị chặn */
document.addEventListener('pointerdown', () => { const f = Am.choPhat; if (!f) return; Am.choPhat = null;
  setTimeout(() => { try { if (!speechSynthesis.speaking && !Am.cur) f(); } catch (e) {} }, 400); }, true);

/* ============================================================
   VẼ TRANH TẠM
   ============================================================ */
function tach(s) { return [...(window.Intl && Intl.Segmenter ? [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(s)].map(x => x.segment) : Array.from(s))].filter(x => x.trim()); }
function em(c, cls) { const f = KT.EMOJI && KT.EMOJI[c]; return f ? `<img class="em ${cls || ''}" src="${f}" alt="">` : `<span class="em ${cls || ''}" style="font-size:56px;line-height:1">${c}</span>`; }
function dongHo(h, m) {
  const ah = ((h % 12) + m / 60) * 30, am = m * 6;
  const tick = [...Array(12)].map((_, i) => { const a = i * 30 * Math.PI / 180; return `<line x1="${50 + 38 * Math.sin(a)}" y1="${50 - 38 * Math.cos(a)}" x2="${50 + 43 * Math.sin(a)}" y2="${50 - 43 * Math.cos(a)}" stroke="#3A2A1A" stroke-width="${i % 3 ? 2 : 4}"/>`; }).join('');
  return `<svg class="dong-ho" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#E3262E" stroke-width="6"/>${tick}<line x1="50" y1="50" x2="${50 + 24 * Math.sin(ah * Math.PI / 180)}" y2="${50 - 24 * Math.cos(ah * Math.PI / 180)}" stroke="#3A2A1A" stroke-width="6" stroke-linecap="round"/><line x1="50" y1="50" x2="${50 + 36 * Math.sin(am * Math.PI / 180)}" y2="${50 - 36 * Math.cos(am * Math.PI / 180)}" stroke="#2F6FD6" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#3A2A1A"/></svg>`;
}
function phan(p) {
  const m = p.split(':'), t = m[0];
  if (t === 'e') { const cs = tach(p.slice(2)); return cs.map(c => em(c, cs.length > 3 ? 'nho' : '')).join(''); }
  if (t === 'f') return `<img class="file" src="${fileSrc(m[1])}" alt="">`;
  if (t === 'ch') { const src = NV[m[1]] || NV.anna; const ex = m.slice(2).join(':'); return `<span class="nvat"><img class="nv" src="${src}" alt="">${ex ? tach(ex).map(c => em(c)).join('') : ''}</span>`; }
  if (t === 'c') {
    const col = MAU[m[1]] || m[1]; const ex = m.slice(2).join(':');
    if (!ex) return `<span class="mau" style="background:${col}"></span>`;
    const c = tach(ex)[0], f = KT.EMOJI[c];
    if (!f) return em(c);
    return `<span class="to-mau"><img src="${f}" alt=""><i style="background:${col};-webkit-mask-image:url(${f});mask-image:url(${f})"></i></span>`;
  }
  if (t === 'n') return `<span class="so">${esc(m[1])}</span>`;
  if (t === 'k') { const n = +m[1], c = tach(m.slice(2).join(':'))[0]; return `<span class="dem" style="grid-template-columns:repeat(${Math.min(n, 5)},auto)">${Array(n).fill(em(c)).join('')}</span>`; }
  if (t === 'L') return `<span class="chu-to">${esc(m.slice(1).join(':'))}</span>`;
  if (t === 'clock') return dongHo(+m[1], +m[2]);
  if (t === 'cal') return `<span class="lich"><b>CALENDAR</b><span>${esc(m.slice(1).join(':'))}</span></span>`;
  if (t === 'x') return `<span class="trong">🖼️</span>`;
  return '';
}
/* id: mã tranh (để thay bằng tranh vẽ thật nếu có) */
function tranh(s, id) {
  if (!s) return '';
  const { spec, desc } = CH.tachTranh(s);
  const that = id && KT.TRANH_CO && KT.TRANH_CO[id];
  if (that) return `<span class="tr"><img class="file" src="${that}" alt="${esc(desc)}"></span>`;
  const html = spec.split('+').map(x => phan(x.trim())).join('');
  const ct = CF.CHU_THICH !== false && desc && !/^(n|clock|c:[a-z]+$)/.test(spec) ? `<span class="chu-thich">${esc(desc)}</span>` : '';
  return `<span class="tr" title="${esc(desc)}">${html}</span>${ct}`;
}

/* ============================================================
   KHUNG TRANG
   ============================================================ */
let manHienTai = '';
function khung(noi, opt = {}) {
  Am.dung();
  manHienTai = opt.man || '';
  const be = S.hs ? `<div class="the-be"><img src="${STICKER[1]}" alt=""><div>${esc(S.hs.ten)}</div><div>⭐ ${S.sticker.length}</div></div>` : '';
  app.innerHTML = `<div class="khung"><nav class="thanh">
    <div class="logo"><img src="${NV.huou}" alt=""></div><div class="logo-chu">Little Language<br>Explorers</div>${be}
    <button class="nut-ben b1" data-di="chu"><span class="ic">🏠</span>Trang chủ</button>
    <button class="nut-ben b2" data-di="bando"><span class="ic">🗺️</span>Bản đồ</button>
    <button class="nut-ben b3" data-di="hd"><span class="ic">❓</span>Hướng dẫn</button>
    <button class="nut-ben b4" data-di="tieng"><span class="ic">${Am.tat ? '🔇' : '🔊'}</span>Tiếng</button>
    ${GV ? '<button class="nut-ben b5" data-di="gv"><span class="ic">🧑‍🏫</span>Giáo viên</button>' : ''}
  </nav><main class="noi-dung"><div class="giua">${noi}</div><footer class="ban-quyen">© ${new Date().getFullYear()} CES Vietnam · Mọi quyền được bảo lưu</footer></main></div>`;
  app.querySelectorAll('[data-di]').forEach(b => b.onclick = () => {
    const d = b.dataset.di;
    if (d === 'chu') trangChu(); else if (d === 'bando') banDo(); else if (d === 'hd') huongDan(); else if (d === 'gv') baoCao(true);
    else if (d === 'tieng') { Am.tat = !Am.tat; if (Am.tat) Am.dung(); b.querySelector('.ic').textContent = Am.tat ? '🔇' : '🔊'; }
  });
  window.scrollTo(0, 0);
  return app.querySelector('.giua');
}
function loiNV(nv, text, opt = {}) {
  return `<div class="loi"><img class="nv" src="${NV[opt.anh || nv] || NV.huou}" alt=""><div class="bong-thoai"><span class="ai">${TEN_NV[nv] || ''}</span>${esc(text)}</div></div>`;
}
function bang(html) { return `<div class="bang">${html}</div>`; }

/* ============================================================
   MÀN ĐẦU, TRANG CHỦ, PHỤ HUYNH
   ============================================================ */
function chamBatDau() {
  app.innerHTML = `<div class="cham-bd"><button class="huou-noi" aria-label="Nghe cô Hươu"><img src="${NV.huou3}" alt=""><span>🔊</span></button><h1 style="color:var(--ink)">Những nhà thám hiểm ngôn ngữ nhí</h1><p style="margin:0;font-weight:700">${esc(KT.LOI.batDau)}</p><button class="nut do" id="bd">👆 Chạm để bắt đầu</button></div>`;
  /* trình duyệt chỉ cho phát tiếng sau lần chạm đầu: thử đọc ngay, bị chặn thì chạm cô Hươu (hoặc bất kỳ đâu) để nghe */
  Am.noi('huou', 'vi', KT.LOI.batDau);
  app.querySelector('.huou-noi').onclick = () => { Am.dung(); Am.noi('huou', 'vi', KT.LOI.batDau); };
  app.querySelector('#bd').onclick = () => {
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) {}
    try { const a = new Audio(); a.play().catch(() => {}); } catch (e) {}
    trangChu();
  };
}

function trangChu() {
  const xong = !!S.tien.KET;
  const g = khung(`<span class="nhan">Kiểm tra đầu vào Anh – Trung</span>
    <h1 style="margin-top:6px">Những nhà thám hiểm ngôn ngữ nhí</h1>
    <div class="luoi-trang-chu">
      <div class="the lon" data-di="bat"><img src="img/trang/canopy_ban_do.webp" alt=""><div class="chan">🚀 ${S.hs ? (xong ? 'Bé khác làm bài mới' : 'Tiếp tục bài của ' + esc(S.hs.ten)) : 'Bắt đầu thám hiểm'}<small>${S.hs ? (xong ? esc(S.hs.ten) + ' đã làm xong · bé tiếp theo sẽ có đề khác' : 'đã qua ' + daXongSo() + '/' + LO.length + ' trạm · làm tiếp đúng đề đang làm') : 'Khoảng 25–35 phút · tiếng Anh trước, tiếng Trung sau'}</small></div></div>
      <div class="the o cam" data-di="ph"><div class="anh"><img src="${NV.bong}" alt=""></div><div class="chan">Ba mẹ<small>Thông tin của con</small></div></div>
      <div class="the o xanh" data-di="hd"><div class="anh"><img src="${NV.huou2}" alt=""></div><div class="chan">Hướng dẫn<small>Cô Hươu chỉ cách làm</small></div></div>
      <div class="the o tim ${xong || GV ? '' : 'khoa'}" data-di="bc"><div class="anh"><img src="img/trang/cx_o_match.webp" alt=""></div><div class="chan">${xong || GV ? '' : '🔒 '}Báo cáo<small>Mở khi con làm xong</small></div></div>
      <div class="the o" data-di="lai"><div class="anh"><img src="${NV.tho}" alt=""></div><div class="chan">Bé khác làm<small>Bắt đầu lại từ đầu</small></div></div>
    </div>`, { man: 'chu' });
  Am.noi('huou', 'vi', xong ? KT.LOI.baoCao : S.hs ? KT.LOI.trangChuLai : KT.LOI.trangChu);
  g.querySelectorAll('[data-di]').forEach(el => el.onclick = () => {
    const d = el.dataset.di;
    if (d === 'bat') { if (xong) return baiMoi(); S.hs ? (S.daChao ? diTiep() : moDau()) : phuHuynh(); }
    else if (d === 'ph') phuHuynh();
    else if (d === 'hd') huongDan();
    else if (d === 'bc') baoCao(false);
    else if (d === 'lai') lamLai();
  });
}
const daXongSo = () => LO.filter(t => S.tien[t.ma]).length;

/* Bé trước đã làm xong (kết quả đã gửi về trung tâm): cất bài cũ vào máy, mở bài mới với đề xáo mới */
function baiMoi() {
  try {
    const cu = JSON.parse(localStorage.getItem(LUU + '-cu') || '[]');
    cu.unshift({ phien: S.phien, hs: S.hs, ketThuc: S.ketThuc, tongHop: tinh(), daGui: S.daGui || null, guiAmV: S.guiAmV || null, S: S.guiAmV === 2 ? null : S });   // giữ bài đầy đủ tới khi ghi âm gửi được
    localStorage.setItem(LUU + '-cu', JSON.stringify(cu.slice(0, 10)));
  } catch (e) {}
  S = moi(); luu(); phuHuynh();
}
function lamLai() {
  const g = khung(`<div class="form"><h2>Bắt đầu lại cho bé khác?</h2><p>Kết quả và ghi âm của ${S.hs ? '<b>' + esc(S.hs.ten) + '</b>' : 'bé trước'} trên máy này sẽ bị xoá. Nếu cần giữ, ba mẹ / cô vào Báo cáo và bấm "Tải kết quả" trước.</p>
    <div class="hang-nut"><button class="nut trang" data-x="0">Quay lại</button><button class="nut do" data-x="1">Xoá và bắt đầu lại</button></div></div>`);
  Am.noi('huou', 'vi', KT.LOI.lamLai);
  g.querySelector('[data-x="0"]').onclick = trangChu;
  g.querySelector('[data-x="1"]').onclick = async () => { await Kho.xoaHet(); S = moi(); luu(); phuHuynh(); };
}

function phuHuynh() {
  const hs = S.hs || { ten: '', tuoi: 0, sdt: '', ph: {} };
  const g = khung(`<div class="form">
    ${loiNV('huou', KT.LOI.phuHuynh)}
    <label>Tên của con</label><input type="text" id="ten" value="${esc(hs.ten)}" autocomplete="off">
    <label>Con mấy tuổi?</label><div class="chon-nhanh" data-q="tuoi">${[5, 6, 7, 8, 9, 10].map(t => `<button data-v="${t}" class="${hs.tuoi === t ? 'chon' : ''}">${t}</button>`).join('')}</div>
    <label>Số điện thoại (Zalo) của ba mẹ</label><input type="tel" id="sdt" value="${esc(hs.sdt || '')}" autocomplete="off">
    ${KT.PHU_HUYNH.map(q => `<label>${esc(q.q)}</label><div class="chon-nhanh" data-q="${q.id}">${q.o.map((o, i) => `<button data-v="${i}" class="${hs.ph[q.id] === i ? 'chon' : ''}">${esc(o)}</button>`).join('')}</div>`).join('')}
    <p class="nho" id="loi-form"></p>
    <div class="hang-nut"><button class="nut" id="xong-form">Lưu và bắt đầu</button></div></div>`);
  Am.noi('huou', 'vi', KT.LOI.phuHuynh);
  const tam = { tuoi: hs.tuoi, ph: Object.assign({}, hs.ph) };
  g.querySelectorAll('.chon-nhanh').forEach(h => h.querySelectorAll('button').forEach(b => b.onclick = () => {
    h.querySelectorAll('button').forEach(x => x.classList.remove('chon')); b.classList.add('chon');
    const q = h.dataset.q, v = +b.dataset.v; if (q === 'tuoi') tam.tuoi = v; else tam.ph[q] = v;
  }));
  g.querySelector('#xong-form').onclick = () => {
    const ten = g.querySelector('#ten').value.trim();
    const thieu = !ten ? 'tên của con' : !tam.tuoi ? 'tuổi của con' : KT.PHU_HUYNH.find(q => tam.ph[q.id] == null) ? 'các câu hỏi' : '';
    if (thieu) { g.querySelector('#loi-form').textContent = 'Ba mẹ điền giúp cô ' + thieu + ' nhé.'; return; }
    S.hs = { ten, tuoi: tam.tuoi, sdt: g.querySelector('#sdt').value.trim(), ph: tam.ph };
    luu(); S.daChao ? diTiep() : moDau();
  };
}

/* ---------- lời mở đầu M1–M4 ---------- */
async function moDau() {
  const buoc = [
    { nv: 'huou', anh: 'huou3', t: KT.LOI.chao, hien: KT.LOI.chao.replace('Chào con!', 'Chào ' + S.hs.ten + '!'), them: `<div class="doi-hinh" style="margin:6px 0"><img src="${NV.bong}" alt=""><img src="${NV.anna}" alt=""><img src="${NV.xiaomei}" alt=""></div>` },
    { nv: 'huou', anh: 'huou2', t: KT.LOI.luat },
    { nv: 'huou', t: KT.LOI.thuLoa, sao: true },
    { nv: 'anna', t: 'Hi! Can you say hello?', mic: true }
  ];
  for (let i = 0; i < buoc.length; i++) {
    const b = buoc[i];
    const g = khung(`${loiNV(b.nv, b.hien || b.t, { anh: b.anh })}${b.them || ''}
      ${b.sao ? `<div class="hang-nut"><button class="nut vang" id="sao" style="font-size:40px">⭐</button></div>` : ''}
      ${b.mic ? `<p style="text-align:center;font-weight:700">${esc(KT.LOI.thuMic)}</p><div class="vach-am"><i></i></div><p class="nho" id="mic-tt" style="text-align:center"></p>` : ''}
      <div class="hang-nut"><button class="nut" id="tiep">${i === buoc.length - 1 ? 'Bắt đầu thám hiểm' : 'Tiếp'}</button></div>`, { man: 'modau' });
    const nv = b.nv === 'anna' ? 'anna' : 'huou';
    const doc = Am.noi(nv, nv === 'anna' ? 'en' : 'vi', b.t).then(() => b.mic && Am.noi('huou', 'vi', KT.LOI.thuMic));
    /* tự sang bước sau khi cô đọc xong; riêng bước thử loa phải chạm ngôi sao */
    const tiep = new Promise(res => {
      g.querySelector('#tiep').onclick = () => { Am.dung(); res(); }; const s = g.querySelector('#sao'); if (s) s.onclick = () => { Am.dung(); res(); };
      if (!b.sao) doc.then(() => ngu(b.mic ? 6000 : 900)).then(res);
    });
    let dungMic = null;
    if (b.mic) dungMic = await thuMic(g);
    await tiep; if (dungMic) dungMic();
    if (manHienTai !== 'modau') return;
  }
  S.daChao = true; luu(); diTiep();
}
async function thuMic(g) {
  const tt = g.querySelector('#mic-tt'), vach = g.querySelector('.vach-am i');
  try {
    const st = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ac = new (window.AudioContext || window.webkitAudioContext)(), src = ac.createMediaStreamSource(st), an = ac.createAnalyser(); an.fftSize = 512; src.connect(an);
    const buf = new Uint8Array(an.fftSize); let chay = true;
    (function ve() { if (!chay) return; an.getByteTimeDomainData(buf); let m = 0; for (const v of buf) m = Math.max(m, Math.abs(v - 128)); vach.style.width = Math.min(100, m * 1.6) + '%'; requestAnimationFrame(ve); })();
    tt.textContent = 'Micro đã bật. Thanh xanh nhảy lên khi con nói là được.';
    return () => { chay = false; st.getTracks().forEach(t => t.stop()); ac.close(); };
  } catch (e) {
    tt.textContent = 'Chưa bật được micro. Ba mẹ cho phép trình duyệt dùng micro để con làm phần Nói nhé (vẫn làm tiếp được).';
    return null;
  }
}

function huongDan() {
  const g = khung(`${loiNV('huou', KT.LOI.luat, { anh: 'huou2' })}
    ${loiNV('tho', 'Khi Thỏ con xuất hiện, Thỏ con muốn chơi thêm với con vài câu nữa thôi. Con cứ làm như bình thường nhé!')}
    <div class="bc"><h3>Dành cho ba mẹ</h3><ul>
      <li>Bài làm khoảng 25–35 phút (bé 5–6 tuổi khoảng 15–20 phút). Tiếng Anh trước, nghỉ 1 phút, rồi tiếng Trung.</li>
      <li>Web tự chọn câu dễ hay khó theo câu trả lời của con. Khi con trả lời sai, web hỏi thêm 2 câu tương tự để biết con nhầm hay chưa học.</li>
      <li>Ba mẹ ngồi cạnh, khen con, không gợi ý đáp án. Phần Nói cần micro.</li>
      <li>Mỗi câu nghe được tối đa ${CF.SO_LAN_NGHE || 2} lần. Con có thể dừng và quay lại sau: các trạm đã xong được giữ nguyên.</li>
    </ul></div><div class="hang-nut"><button class="nut" id="ok">Đã hiểu</button></div>`);
  Am.noi('huou', 'vi', KT.LOI.luat);
  g.querySelector('#ok').onclick = () => S.hs && S.daChao ? diTiep() : trangChu();
}

/* ============================================================
   BẢN ĐỒ
   ============================================================ */
function tramHienTai() { return LO.find(t => !S.tien[t.ma]); }
function banDo(tuDong) {
  if (!S.hs) return phuHuynh();
  const cur = tramHienTai();
  if (tuDong && !cur) return ketThuc();
  const g = khung(`<div class="dau-cau"><span class="nhan">Bản đồ thám hiểm</span><span class="vi-tri">${esc(S.hs.ten)} · đã qua ${daXongSo()}/${LO.length} trạm</span></div>
    <div class="ban-do"><div class="trong-bd"><img class="nen" src="img/trang/canopy_ban_do.webp" alt="">
      <span class="vung en">Vùng tiếng Anh</span><span class="vung zh">Vùng tiếng Trung</span>
      ${LO.map(t => {
        const st = S.tien[t.ma], cls = st === 'xong' ? 'xong' : st === 'bo' ? 'bo' : (cur && cur.ma === t.ma ? 'dang' : 'cho');
        return `<button class="moc ${t.vung} ${cls}" data-ma="${t.ma}" style="left:${t.x}%;top:${t.y}%"><span class="tron">${st === 'xong' ? em('✅') : st === 'bo' ? '–' : em(t.ic) }</span><span class="ten">${esc(t.ten)}</span></button>`;
      }).join('')}
    </div></div>
    ${cur && !tuDong ? `${loiNV('huou', KT.LOI.banDo)}<div class="hang-nut"><button class="nut" id="di">▶ Đi tiếp</button></div>` : ''}
    ${tuDong ? loiNV('huou', KT.LOI.diTiep) : ''}`, { man: 'bando' });
  if (tuDong) { tuDongDi(KT.LOI.diTiep, 'bando', () => moTram(cur.ma)); return; }
  if (cur) { Am.noi('huou', 'vi', KT.LOI.banDo); g.querySelector('#di').onclick = () => diTiep(); }
  g.querySelectorAll('.moc').forEach(b => b.onclick = () => {
    const ma = b.dataset.ma;
    if ((cur && cur.ma === ma) || GV) moTram(ma);
  });
}

/* Bài chạy liền mạch: xong một trạm (đã xác định được bậc) thì tự sang trạm tiếp theo */
function diTiep() {
  if (!S.hs) return phuHuynh();
  let cur = tramHienTai();
  while (cur && !['NGHI', 'KET', 'Z-G'].includes(cur.ma) && !tramCoChay(cur.ma)) { S.tien[cur.ma] = 'bo'; luu(); cur = tramHienTai(); }
  if (!cur || cur.ma === 'KET') return ketThuc();
  if (cur.ma === 'NGHI') return nghi();
  banDo(true);
}
/* Đọc lời rồi tự chuyển; nếu bé/ba mẹ bấm sang màn khác thì thôi */
async function tuDongDi(loi, man, tiep, nv = 'huou', lang = 'vi') {
  await Promise.race([Am.noi(nv, lang, loi), ngu(30000)]);
  await ngu(700);
  if (manHienTai === man) tiep();
}

function moTram(ma) {
  if (ma === 'NGHI') return nghi();
  if (ma === 'KET') return ketThuc();
  if (ma === 'Z-G') return trangTram(ma);
  if (!tramCoChay(ma)) { S.tien[ma] = 'bo'; luu(); return GV ? banDo() : diTiep(); }
  trangTram(ma);
}

/* trạm nào được bỏ qua theo kết quả trước */
function tramCoChay(ma) {
  const kq = S.kq, docTV = S.hs.ph.doc === 0;
  const tienDoc = docTV || (kq['E-DO'] && kq['E-DO'].tienDoc);
  if (ma.startsWith('Z-') && ma !== 'Z-G' && kq['Z-G'] && kq['Z-G'].c0) return false;
  if (ma === 'Z-DO') return !tienDoc && (kq['Z-NG'] ? kq['Z-NG'].bac >= 2 : false);
  if (ma === 'Z-VI') return !tienDoc && !S.ngan && (kq['Z-DO'] ? kq['Z-DO'].bac >= 3 : false);
  return true;
}

function trangTram(ma) {
  const t = LO.find(x => x.ma === ma), def = TRAM_DEF[ma];
  const zh = ma.startsWith('Z');
  const dan = zh ? 'xm' : 'anna';
  const tile = ma === 'Z-G' ? 'img/trang/cx_o_match.webp' : 'img/trang/' + def.o + '.webp';
  const tenTram = ma === 'Z-G' ? 'Cổng vùng tiếng Trung' : 'Trạm ' + t.ten;
  const g = khung(`<div class="tram"><div class="the ${zh ? '' : 'xanh'}"><img src="${tile}" alt=""><div class="noi">
      <span class="nhan" style="background:${zh ? 'var(--red)' : 'var(--blue)'}">${zh ? 'Vùng tiếng Trung' : 'Vùng tiếng Anh'}</span>
      <h2 style="margin-top:6px">${tenTram}</h2>
      <div class="dan-duong"><img src="${NV[dan]}" alt=""><div><div class="nho">Bạn dẫn đường</div><b>${TEN_NV[dan]}</b></div></div>
      <button class="nut" id="bd" style="width:100%">▶ Bắt đầu ngay</button>
      <div class="loi-nhan">🔊 <b>Ba mẹ đồng hành:</b> ngồi cạnh và khen con, không gợi ý đáp án. ${ma.endsWith('NO') ? 'Phần này cần micro.' : ''}</div>
    </div></div><div id="ben-phai">${loiNV('huou', KT.LOI_TRAM[ma], { anh: 'huou2' })}</div></div>`, { man: 'tram' });
  let daChay = false;
  const chay = () => { if (daChay || manHienTai !== 'tram') return; daChay = true; chayTram(ma); };
  g.querySelector('#bd').onclick = () => { Am.dung(); chay(); };
  tuDongDi(KT.LOI_TRAM[ma], 'tram', chay);
}
function oMayMan(vung, tiep) {
  vung.innerHTML = `<h2 style="text-align:center">Chọn một ô may mắn!</h2><div class="o-may-man">${[1, 2, 3, 4].map(i => `<button>${i}</button>`).join('')}</div>`;
  vung.querySelectorAll('button').forEach(b => b.onclick = () => { b.classList.add('mo'); setTimeout(tiep, 550); });
}

/* ============================================================
   MÀN CÂU HỎI
   ============================================================ */
const PHIEN = { tram: '', cauSo: 0, daHoi: {}, kd: {}, saiLien: 0, soCuu: 0 };
function dauCau(tieuDe) {
  PHIEN.cauSo++;
  const n = Math.min(PHIEN.cauSo, 12);
  return `<div class="dau-cau"><span class="nhan">${esc(tieuDe)}</span><div class="cham-tien">${[...Array(12)].map((_, i) => `<i class="${i < n ? 'da' : ''}"></i>`).join('')}</div></div>`;
}
function phanLC(o) {
  if (o.startsWith('ts:')) return { loai: 'ts', text: o.slice(3) };
  if (o.startsWith('t:')) return { loai: 't', text: o.slice(2) };
  if (o.startsWith('s:')) return { loai: 's', text: o.slice(2) };
  return { loai: 'p', spec: o };
}
function htmlChu(text, zh) {
  const [chinh, phu] = text.split(' / ');
  return `<span class="tchu ${zh ? 'zh' : ''}">${esc(chinh)}</span>${phu ? `<span class="tphu">${esc(phu)}</span>` : ''}`;
}
function nhanLC(o) { const p = phanLC(o); return p.loai === 'p' ? (CH.tachTranh(p.spec).desc || CH.tachTranh(p.spec).spec) : p.text; }

/* Hiện một câu. e = {id, lang, dan, item}. Trả về {dung, ms, nhanh, chon} */
function hienCau(e, tieuDe, opt = {}) {
  const it = e.item, k = it.k || 'pick', zh = e.lang === 'zh';
  const aLoi = it.a === '=q' ? it.q : it.a;
  const coLoa = !!aLoi || (it.truyen && it.docTo);
  const docTruyen = it.truyen && it.docTo ? KT.EN.DO.truyen[it.truyen] : null;
  const truyen = it.truyen ? KT.EN.DO.truyen[it.truyen] : null;
  let de = '';
  if (coLoa) de += `<button class="loa-to" id="loa">${em('🔊')}<span class="lan" id="lan"></span></button>`;
  if (it.pic) de += `<div class="tranh-de">${tranh(it.pic, (e.anh || e.id) + '_pic')}</div>`;
  if (truyen) de += `<div class="truyen">${esc(truyen)}</div>`;
  if (it.q) de += `<div class="cau ${zh ? 'zh' : ''} ${String(it.q).length > 60 ? 'nho-hon' : ''}">${esc(it.q)}</div>`;
  if (it.hop) de += `<div class="hop-tu">${it.hop.map(w => `<span>${esc(w)}</span>`).join('')}</div>`;
  if (it.goiY) de += `<div class="cau" style="letter-spacing:4px">${esc(it.goiY)}</div>`;

  return new Promise(resolve => {
    let duoi = '';
    const opts = (it.o || []).map((o, i) => Object.assign(phanLC(o), { goc: i, raw: o }));
    let thuTu = tron(opts);
    if (k === 'pick') {
      const nCot = thuTu.length === 2 ? 2 : thuTu.length === 4 ? 4 : 3;
      duoi = `<div class="lua-chon c${nCot}">${thuTu.map((o, i) => {
        let ndung = '';
        if (o.loai === 'p') ndung = tranh(o.spec, (e.anh || e.id) + '_o' + (o.goc + 1));
        else if (o.loai === 't') ndung = htmlChu(o.text, zh);
        else if (o.loai === 's') ndung = `<span class="tranh-loa">${em('🔊')}</span>`;
        else ndung = htmlChu(o.text, zh) + `<span class="nghe-nho" data-nghe="${i}">${em('🔈')}</span>`;
        return `<button class="lc ${o.loai === 's' ? 'loa' : ''}" data-i="${i}"><span class="chu">${ABC[i]}</span>${ndung}</button>`;
      }).join('')}</div><div class="hang-nut an" id="xac"><button class="nut">✔ Chọn</button></div>`;
    } else if (k === 'dungsai') {
      duoi = `<div class="dungsai"><button data-v="1">${zh ? em('✔️') : em('👍')}</button><button data-v="0">${zh ? em('✖️') : em('👎')}</button></div>`;
    } else if (k === 'mau') {
      duoi = `<div class="to-hang">${it.vat.map((v, i) => `<button class="vat" data-v="${i}">${tranh(v, (e.anh || e.id) + '_v' + (i + 1))}</button>`).join('')}</div>
        <div class="but-mau">${['blue', 'red', 'green', 'yellow'].map(c => `<button data-c="${c}" style="background:${MAU[c]}" aria-label="${c}"></button>`).join('')}</div>`;
    } else if (k === 'xep') {
      duoi = `<div class="dong-xep" id="dong"></div><div class="kho-the">${it.the.map((t, i) => { const [a, b] = t.split('|'); return `<button class="the-tu ${zh ? 'zh' : ''}" data-i="${i}">${esc(a)}${b ? `<small>${esc(b)}</small>` : ''}</button>`; }).join('')}</div>
        <div class="hang-nut"><button class="nut trang" id="xoa">↺ Làm lại</button><button class="nut" id="xong" disabled>✔ Xong</button></div>`;
    } else if (k === 'go' || k === 'tudo') {
      duoi = `<div style="text-align:center;margin-top:14px">${k === 'tudo' ? '<textarea class="o-go" id="go" autocomplete="off" spellcheck="false"></textarea>' : '<input class="o-go" id="go" autocomplete="off" autocapitalize="off" spellcheck="false">'}</div>
        <div class="hang-nut"><button class="nut" id="xong" disabled>✔ Xong</button></div>`;
    }
    const g = khung(`${dauCau(tieuDe)}${opt.truoc || ''}${bang(`${de ? `<div class="de">${de}</div>` : ''}${duoi}`)}`, { man: 'cau' });
    window.KT_THU && (window.KT_THU.cau = { e, thuTu, n: (window.KT_THU.n = (window.KT_THU.n || 0) + 1) });

    const tHien = performance.now();
    let t0 = tHien, daNghe = 0, nghe = false;
    const maxNghe = CF.SO_LAN_NGHE || 2;
    const loa = g.querySelector('#loa'), lan = g.querySelector('#lan');
    const capNhatLoa = () => { if (!loa) return; lan.textContent = Math.max(0, maxNghe - daNghe); loa.disabled = daNghe >= maxNghe; };
    async function phat() {
      if (!loa || daNghe >= maxNghe || nghe) return;
      daNghe++; capNhatLoa(); nghe = true; loa.classList.add('dang');
      if (docTruyen) await Am.noi(e.dan, e.lang, docTruyen); else await Am.chuoi(aLoi, e.lang, e.dan);
      nghe = false; loa.classList.remove('dang'); t0 = performance.now();
    }
    /* lời cô Hươu trước câu (nếu có) đọc hết rồi mới phát câu hỏi */
    const dauLoi = opt.loiTruoc ? Am.noi('huou', 'vi', opt.loiTruoc) : Promise.resolve();
    if (loa) { loa.onclick = () => phat(); capNhatLoa(); if (!docTruyen) dauLoi.then(() => { if (!daTra && manHienTai === 'cau') phat(); }); }

    let daTra = false;
    const tra = (dung, chon, them) => {
      if (daTra) return; daTra = true; Am.dung();
      const ms = Math.round(performance.now() - t0);
      /* chạm nhanh = chạm trong 1 giây đầu kể từ khi câu hiện ra (chưa kịp nghe / nhìn) */
      resolve(Object.assign({ dung, ms, nhanh: performance.now() - tHien < 1000, chon }, them || {}));
    };

    if (k === 'pick') {
      let dangChon = -1;
      const xac = g.querySelector('#xac');
      g.querySelectorAll('[data-nghe]').forEach(s => s.onclick = ev => { ev.stopPropagation(); Am.dung(); Am.noi(e.dan, e.lang, thuTu[+s.dataset.nghe].text); });
      g.querySelectorAll('.lc').forEach(b => b.onclick = () => {
        const i = +b.dataset.i, o = thuTu[i];
        if (o.loai === 's') {
          g.querySelectorAll('.lc').forEach(x => x.classList.remove('chon')); b.classList.add('chon'); dangChon = i;
          Am.dung(); Am.noi(e.dan, e.lang, o.text); xac.classList.remove('an');
          return;
        }
        b.classList.add('chon');
        setTimeout(() => tra(o.goc === 0, nhanLC(o.raw), { dapAn: nhanLC(it.o[0]) }), 220);
      });
      xac.querySelector('button').onclick = () => { if (dangChon >= 0) { const o = thuTu[dangChon]; tra(o.goc === 0, o.text, { dapAn: phanLC(it.o[0]).text }); } };
    } else if (k === 'dungsai') {
      g.querySelectorAll('.dungsai button').forEach(b => b.onclick = () => { const v = b.dataset.v === '1'; tra(v === it.dap, v ? 'đúng' : 'sai', { dapAn: it.dap ? 'đúng' : 'sai' }); });
    } else if (k === 'mau') {
      let vat = -1;
      g.querySelectorAll('.vat').forEach(b => b.onclick = () => { g.querySelectorAll('.vat').forEach(x => x.classList.remove('chon')); b.classList.add('chon'); vat = +b.dataset.v; });
      g.querySelectorAll('.but-mau button').forEach(b => b.onclick = () => {
        if (vat < 0) { g.querySelectorAll('.vat').forEach(x => { x.style.borderColor = 'var(--sky)'; }); return; }
        const c = b.dataset.c, el = g.querySelector(`.vat[data-v="${vat}"] .tr`);
        if (el) { el.style.filter = 'none'; el.querySelectorAll('img.em, img.file').forEach(im => { const w = document.createElement('span'); w.className = 'to-mau' + (im.classList.contains('file') ? ' lon' : ''); w.innerHTML = `<img src="${im.src}" alt=""><i style="background:${MAU[c]};-webkit-mask-image:url(${im.getAttribute('src')});mask-image:url(${im.getAttribute('src')})"></i>`; im.replaceWith(w); }); }
        setTimeout(() => tra(vat === it.dap[0] && c === it.dap[1], CH.tachTranh(it.vat[vat]).desc + ' – ' + c, { dapAn: CH.tachTranh(it.vat[it.dap[0]]).desc + ' – ' + it.dap[1] }), 700);
      });
    } else if (k === 'xep') {
      const dong = g.querySelector('#dong'), xong = g.querySelector('#xong'); let chon = [];
      const ve = () => {
        dong.innerHTML = chon.map((i, j) => { const [a, b] = it.the[i].split('|'); return `<button class="the-tu ${zh ? 'zh' : ''}" data-j="${j}">${esc(a)}${b ? `<small>${esc(b)}</small>` : ''}</button>`; }).join('');
        g.querySelectorAll('.kho-the .the-tu').forEach(b => b.classList.toggle('dung', chon.includes(+b.dataset.i)));
        dong.querySelectorAll('.the-tu').forEach(b => b.onclick = () => { chon.splice(+b.dataset.j, 1); ve(); });
        xong.disabled = chon.length !== it.the.length;
      };
      g.querySelectorAll('.kho-the .the-tu').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (!chon.includes(i)) { chon.push(i); ve(); } });
      g.querySelector('#xoa').onclick = () => { chon = []; ve(); };
      xong.onclick = () => {
        const words = chon.map(i => it.the[i].split('|')[0]);
        const motChu = it.the.every(t => t.split('|')[0].length === 1 && /[a-z]/i.test(t));
        const s = zh || motChu ? words.join('') : words.join(' ');
        const n = x => zh ? x.replace(/[，。？！、,.?!\s]/g, '') : x.toLowerCase().replace(/\s+([?.!,])/g, '$1').replace(/[.!]$/, '').replace(/\s+/g, ' ').trim();
        tra(it.dap.some(d => n(d) === n(s)), s, { dapAn: it.dap[0] });
      };
    } else if (k === 'go' || k === 'tudo') {
      const o = g.querySelector('#go'), xong = g.querySelector('#xong');
      o.oninput = () => { xong.disabled = !o.value.trim(); };
      setTimeout(() => { try { o.focus({ preventScroll: true }); } catch (e) {} }, 300);
      const nop = () => {
        const v = o.value.trim(); if (!v) return;
        if (k === 'tudo') return tra(null, v, { tuDo: true });
        const n = x => x.toLowerCase().replace(/[.!?,]+$/g, '').replace(/\s+/g, ' ').trim();
        const dung = it.tuKhoa ? it.dap.some(w => n(v).includes(w)) : it.dap.some(d => n(d) === n(v));
        tra(dung, v, { dapAn: it.dap[0] });
      };
      xong.onclick = nop;
      if (k === 'go') o.onkeydown = ev => { if (ev.key === 'Enter') nop(); };
    }
  });
}

/* câu làm thử: không tính điểm, sai thì chỉ đáp án */
/* Bé tải lại trang / rớt mạng giữa chừng: câu đã trả lời trong bài này thì dùng lại kết quả, không hỏi lại */
function cauDaLam(id) {
  for (let i = S.log.length - 1; i >= 0; i--) { const l = S.log[i]; if (l.id === id) return { dung: l.dung, ms: l.ms, nhanh: l.nhanh, chon: l.chon, dapAn: l.dapAn, cu: true }; }
  return null;
}
async function cauThu(e, tieuDe) {
  if (cauDaLam(e.id)) return;
  const truoc = loiNV('huou', KT.LOI.viDu, { anh: 'huou2' });
  const r = await hienCau(e, tieuDe, { truoc, loiTruoc: KT.LOI.viDu });
  ghiLog(e.id, 'thu', r);
  if (!r.dung && (e.item.o || e.item.dap)) {
    const g = khung(`${bang(`<div class="de">${loiNV('huou', KT.LOI.dapAnDung) + '<div class="cau">' + esc(e.item.o ? nhanLC(e.item.o[0]) : e.item.dap[0]) + '</div>'}${e.item.o ? (phanLC(e.item.o[0]).loai === 'p' ? tranh(phanLC(e.item.o[0]).spec, (e.anh || e.id) + '_o1') : '') : ''}</div>`)}<div class="hang-nut"><button class="nut" id="t">Tiếp</button></div>`);
    await new Promise(res => { g.querySelector('#t').onclick = () => { Am.dung(); res(); }; Am.noi('huou', 'vi', KT.LOI.dapAnDung).then(() => ngu(1200)).then(res); });
  }
}

function ghiLog(id, loai, r) {
  S.log.push({ id, loai, dung: r.dung, ms: r.ms, nhanh: !!r.nhanh, chon: r.chon, dapAn: r.dapAn, luc: Date.now() });
  if (r.nhanh && loai !== 'thu' && id.startsWith('E-')) S.soNhanhEn = (S.soNhanhEn || 0) + 1;
  luu();
}

/* đúng: khen; sai: chỉ nói "câu tiếp theo" (không khen); không chấm được (Nói, viết tự do): cảm ơn */
async function khen(lang, dung) {
  const bo = KT.KHEN[lang === 'zh' ? 'zh' : 'en'], arr = dung === true ? bo.dung : dung === false ? bo.sai : bo.khac;
  const t = arr[Math.floor(Math.random() * arr.length)];
  await Am.noi(lang === 'zh' ? 'xm' : 'anna', lang, t);
}

async function manHuongDanBac(text, tieuDe) {
  const g = khung(`<span class="nhan">${esc(tieuDe)}</span>${loiNV('huou', text, { anh: 'huou2' })}<div class="hang-nut"><button class="nut" id="t">Tiếp</button></div>`, { man: 'hdbac' });
  const nut = new Promise(res => g.querySelector('#t').onclick = res);
  await Promise.race([nut, Am.noi('huou', 'vi', text).then(() => ngu(400))]);
}

async function thoCon() {
  khung(`<div class="giua-man"><img src="${NV.tho}" style="height:220px" alt="">${loiNV('tho', KT.LOI.thuThem)}</div>`, { man: 'tho' });
  await Promise.race([Am.noi('tho', 'vi', KT.LOI.thuThem), ngu(12000)]);
  await ngu(300);
}

/* ============================================================
   CHẠY MỘT KỸ NĂNG CÓ THÍCH ỨNG
   ============================================================ */
function entry(ma, def, bac, pi, ci) {
  const it = def.bac[bac].diem[pi].cau[ci];
  return { id: `${ma}-${bac}-${pi + 1}${ABC[ci]}`, lang: def.lang, dan: def.dan, item: it };
}
/* Mỗi bé một đề khác: xáo thứ tự các điểm kiến thức trong bậc và chọn ngẫu nhiên câu nào trong 3 câu song song
   làm câu chính (2 câu còn lại làm câu xác nhận). Lưu theo bé để tải lại trang vẫn giữ đúng đề. */
function tronMang(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function hoanVi(key, n) {
  S.tron = S.tron || {};
  if (!S.tron[key] || S.tron[key].length !== n) { S.tron[key] = tronMang(n); luu(); }
  return S.tron[key];
}
/* chọn 1 trong n bộ song song cho bé này (giữ cố định trong cả bài) */
function chonBo(key, n) { return n > 1 ? hoanVi(key, n)[0] : 0; }
function layThu(ma, def) {
  const ds = [def.thu].concat(def.thuSS || []), k = chonBo(ma + '-thu', ds.length);
  return { id: ma + '-THU' + (k ? k + 1 : ''), lang: def.lang, dan: def.dan, item: ds[k] };
}
function entryVai(ma, def, bac, pi, vai) {
  const n = def.bac[bac].diem[pi].cau.length;
  const ci = hoanVi(`${ma}-${bac}-${pi}`, n)[ABC.indexOf(vai)] ?? ABC.indexOf(vai);
  return Object.assign(entry(ma, def, bac, pi, ci), { vai });
}

async function chayBac(ma, def, bac, tieuDe, opt) {
  const lv = def.bac[bac];
  await manHuongDanBac(lv.hd, tieuDe);
  const diem = lv.diem.map((p, pi) => ({ ten: p.ten, tuDo: !!p.tuDo, kq: {}, pi }));
  const hang = hoanVi(`${ma}-${bac}-thuTu`, diem.length).map(pi => ({ d: diem[pi], k: 'A' }));
  const nDiem = diem.filter(d => !d.tuDo).length, can = nDiem * 2 / 3 - 1e-9;
  /* chắc chắn không qua bậc thì dừng sớm (đỡ cho bé phải làm câu quá khó); bé đang qua thì hỏi đủ cả 3 điểm; câu viết tự do vẫn làm */
  const daRo = () => {
    let co = 0, conLai = 0;
    for (const d of diem) { if (d.tuDo) continue; const x = chamDiem(d, opt); if (x.xong) co += x.gt; else conLai++; }
    return co + conLai < can;
  };
  for (let i = 0; i < hang.length; i++) {
    const { d, k } = hang[i];
    if (!d.tuDo && daRo()) continue;
    if (k === 'C') await thoCon();
    const e = entryVai(ma, def, bac, d.pi, k);
    const daLam = PHIEN.kd[e.id] || cauDaLam(e.id);   // câu bé đã làm (khởi động, câu cứu, hoặc trước khi tải lại trang): dùng lại
    const r = daLam || await hienCau(e, tieuDe);
    PHIEN.daHoi[e.id] = true;
    d.kq[k] = r; if (!daLam) ghiLog(e.id, k, r);
    /* mỗi điểm kiến thức luôn hỏi 2 câu (A, B) để tránh đoán trúng; A, B lệch nhau thì hỏi thêm câu C để phân định */
    if (k === 'A' && !d.tuDo) hang.splice(Math.min(i + 2, hang.length), 0, { d, k: 'B' });
    if (k === 'B' && !opt.chiA && !!d.kq.A.dung !== !!r.dung) hang.splice(Math.min(i + 2, hang.length), 0, { d, k: 'C' });
    if (daLam) continue;
    await khen(def.lang, r.dung);
    PHIEN.saiLien = r.dung === false ? PHIEN.saiLien + 1 : r.dung ? 0 : PHIEN.saiLien;
    if (PHIEN.saiLien >= 2 && PHIEN.soCuu < 2 && !opt.ngan) {   // sai 2 câu liền: chen một câu dễ để bé lấy lại tự tin
      PHIEN.saiLien = 0; PHIEN.soCuu++;
      await cauNhe(chonCauDe(ma, def, opt.min, bac) || cauThuLai(ma, def), tieuDe, 'cuu', def.lang);
    }
  }
  let tong = 0;
  for (const d of diem) {
    if (d.tuDo) { d.gt = null; d.ketLuan = 'cho_gv'; d.baiViet = d.kq.A && d.kq.A.chon; continue; }
    const x = chamDiem(d, opt);
    if (!x.xong) { d.gt = null; d.ketLuan = 'chua_hoi'; continue; }   // dừng sớm: điểm này chưa cần hỏi
    d.gt = x.gt; d.ketLuan = x.ketLuan; tong += d.gt;
  }
  const dem = nDiem, qua = tong >= can;
  return { bac, tong, dem, qua, diem: diem.map(d => ({ ten: d.ten, gt: d.gt, ketLuan: d.ketLuan, baiViet: d.baiViet })) };
}

/* chấm một điểm kiến thức: vững = đúng cả A và B; đúng 2/3 câu = chưa vững (0,5); còn lại = chưa nắm */
function chamDiem(d, opt) {
  const A = d.kq.A, B = d.kq.B, C = d.kq.C;
  if (!A || !B) return { xong: false };
  const nAB = (A.dung ? 1 : 0) + (B.dung ? 1 : 0);
  if (nAB === 2) return { xong: true, gt: 1, ketLuan: 'vung' };
  if (nAB === 0) return { xong: true, gt: 0, ketLuan: 'chua_nam' };
  if (!C && !opt.chiA) return { xong: false };
  return (C ? C.dung : true) ? { xong: true, gt: 0.5, ketLuan: 'chua_vung' } : { xong: true, gt: 0, ketLuan: 'chua_nam' };
}

/* ---------- nhịp êm cho bé: khởi động, câu cứu, câu về đích (không tính điểm) ---------- */
/* câu dễ chưa hỏi ở bậc thấp nhất trong [tuBac, denBac) */
function chonCauDe(ma, def, tuBac, denBac) {
  for (let b = tuBac; b < denBac; b++) {
    const lv = def.bac[b]; if (!lv) continue;
    for (const ci of [2, 1, 0]) for (let pi = 0; pi < lv.diem.length; pi++) {
      if (lv.diem[pi].tuDo) continue;
      const e = entry(ma, def, b, pi, ci);
      if (!PHIEN.daHoi[e.id]) return e;
    }
  }
  return null;
}
/* không còn bậc thấp hơn: cho làm lại câu làm thử (bé đã biết cách làm) */
function cauThuLai(ma, def) {
  if (!def.thu || PHIEN.daHoi[ma + '-THU-LAI']) return null;
  const t = layThu(ma, def);
  return { id: ma + '-THU-LAI', anh: t.id, lang: def.lang, dan: def.dan, item: t.item };
}
async function cauNhe(e, tieuDe, loai, lang) {
  if (!e) return null;
  PHIEN.daHoi[e.id] = true;
  const cu = PHIEN.kd[e.id] || cauDaLam(e.id); if (cu) { PHIEN.kd[e.id] = cu; return cu; }
  const r = await hienCau(e, tieuDe);
  ghiLog(e.id, loai, r); PHIEN.kd[e.id] = r;
  await khen(lang, r.dung);
  return r;
}
/* 2 câu khởi động đi lên dần tới bậc bắt đầu (bậc−2 rồi bậc−1) */
async function khoiDong(ma, def, opt, tieuDe) {
  const bd = opt.bacDau, cac = [bd - 2, bd - 1].filter(b => b >= opt.min && def.bac[b]);
  const ds = cac.length === 2 ? cac : cac.length === 1 ? [cac[0], cac[0]] : [];
  const lay = opt.ngan || opt.chiA ? ds.slice(-1) : ds;
  if (!lay.length) return;
  let daHd = {};
  for (const b of lay) {
    const e = chonCauDe(ma, def, b, b + 1); if (!e) continue;
    if (!daHd[b]) { daHd[b] = 1; await manHuongDanBac(def.bac[b].hd, tieuDe); }
    await cauNhe(e, tieuDe, 'kd', def.lang);
  }
}

async function chayKyNang(ma, def, opt) {
  const tieuDe = (ma.startsWith('Z') ? 'Tiếng Trung · ' : 'Tiếng Anh · ') + def.ten;
  PHIEN.tram = ma; PHIEN.cauSo = 0; PHIEN.daHoi = {}; PHIEN.kd = {}; PHIEN.saiLien = 0; PHIEN.soCuu = 0;
  if (def.thu && !opt.boThu) await cauThu(layThu(ma, def), tieuDe);
  await khoiDong(ma, def, opt, tieuDe);
  let bac = opt.bacDau, xuong = 0, coQua = false, kq = null, tran = false;
  const chiTiet = [];
  for (;;) {
    const r = await chayBac(ma, def, bac, tieuDe, opt);
    chiTiet.push(r);
    if (r.qua) {
      coQua = true;
      if (xuong > 0 || opt.ngan) { kq = bac; break; }
      if (bac >= opt.max) { kq = bac; tran = true; break; }   // vượt bậc cao nhất bài đo được: ghi đúng bậc đó, không tự cộng thêm
      bac++;
      await manHuongDanBac(KT.LOI.lenBac, tieuDe);   // báo trước nhẹ nhàng: câu sẽ khó hơn một chút
    } else {
      if (!coQua && !opt.ngan && bac > opt.min && xuong < 2) { bac--; xuong++; continue; }
      kq = bac - 1; break;
    }
  }
  /* trạm dừng ở bậc bé chưa làm được: kết thúc bằng một câu dễ để bé rời trạm với cảm giác làm được */
  if (!chiTiet[chiTiet.length - 1].qua && !opt.ngan) {
    const e = chonCauDe(ma, def, opt.min, Math.max(opt.min, kq) + 1) || cauThuLai(ma, def);
    if (e) { await manHuongDanBac(KT.LOI.veDich, tieuDe); await cauNhe(e, tieuDe, 'vedich', def.lang); }
  }
  const choGV = chiTiet.some(c => c.diem.some(d => d.ketLuan === 'cho_gv'));
  return { bac: kq, chiTiet, choGV, ngan: !!opt.ngan, tran };
}

/* ============================================================
   CHẠY TỪNG TRẠM
   ============================================================ */
async function chayTram(ma) {
  const kq = S.kq, tuoi = S.hs.tuoi, ph = S.hs.ph;
  if (ma === 'E-TV' && !S.batDau) { S.batDau = Date.now(); luu(); }
  let ketQua;
  if (ma === 'E-TV') ketQua = await chayKyNang(ma, KT.EN.TV, { bacDau: tuoi <= 6 ? 1 : 2, min: 1, max: 4 });
  else if (ma === 'E-NG') ketQua = await chayKyNang(ma, KT.EN.NG, { bacDau: kep(kq['E-TV'].bac - 1, 1, 4), min: 1, max: 4 });
  else if (ma === 'E-DO') {
    let tienDoc = ph.doc === 0;
    if (!tienDoc) {
      PHIEN.cauSo = 0; let sai = 0;
      const boKT = [KT.EN.DO.kiemTra].concat(KT.EN.DO.kiemTraSS || []), kKT = chonBo('E-DO-kt', boKT.length);
      for (let i = 0; i < boKT[kKT].length; i++) {
        const e = { id: 'E-DO-KT' + (i + 1) + (kKT ? '-' + (kKT + 1) : ''), lang: 'en', dan: 'anna', item: boKT[kKT][i] };
        let r = cauDaLam(e.id); if (!r) { r = await hienCau(e, 'Tiếng Anh · Đọc'); ghiLog(e.id, 'kt', r); } if (!r.dung) sai++;
      }
      tienDoc = sai === 2;
    }
    const bacDau = tienDoc ? 1 : Math.max(2, kep(kq['E-TV'].bac - 1, 1, 4));
    ketQua = await chayKyNang(ma, KT.EN.DO, { bacDau, min: 1, max: 4, boThu: tienDoc });
    ketQua.tienDoc = tienDoc || ketQua.bac <= 1;
  }
  else if (ma === 'E-VI') {
    const tienDoc = kq['E-DO'] && kq['E-DO'].tienDoc;
    ketQua = await chayKyNang(ma, KT.EN.VI, { bacDau: tienDoc ? 1 : kep(kq['E-TV'].bac - 1, 1, 4), min: 1, max: 4 });
  }
  else if (ma === 'E-NO') { ketQua = await chayNoi(ma, KT.EN.NO, kep(kq['E-NG'].bac, 1, 4)); kiemNgan(); }
  else if (ma === 'Z-G') ketQua = await chayCong();
  else if (ma === 'Z-NG') ketQua = await chayKyNang(ma, KT.ZH.NG, { bacDau: kq['Z-G'].bacDau, min: 1, max: 4, chiA: S.ngan });
  else if (ma === 'Z-DO') {
    const en = kq['E-NG'].bac, enDoc = Math.max(kq['E-DO'].bac, kq['E-VI'] ? kq['E-VI'].bac : 0);
    const lech = en - enDoc >= 2;
    ketQua = await chayKyNang(ma, KT.ZH.DO, { bacDau: kep(kq['Z-NG'].bac - 1, 2, 4), min: 2, max: 4, ngan: lech, chiA: lech || S.ngan });
    if (ketQua.bac >= 2) ketQua.han = await chayHan();
  }
  else if (ma === 'Z-VI') ketQua = await chayKyNang(ma, KT.ZH.VI, { bacDau: 3, min: 3, max: 4 });
  else if (ma === 'Z-NO') ketQua = await chayNoi(ma, KT.ZH.NO, kep(kq['Z-NG'].bac, 1, 4));
  if (!ketQua) return;
  ketQua.xong = Date.now();
  S.kq[ma] = ketQua; S.tien[ma] = 'xong'; luu();
  guiKetQua(false, ma.endsWith('NO'));   // gửi kết quả về Sheet sau mỗi trạm (bé bỏ dở giữa chừng vẫn có dữ liệu); trạm Nói gửi kèm ghi âm
  await sticker(ma);
}

function kiemNgan() {
  S.gioEn = Date.now() - (S.batDau || Date.now());
  S.ngan = S.gioEn > 20 * 60000 || (S.soNhanhEn || 0) >= 5;
  luu();
}

async function sticker(ma) {
  const src = STICKER[S.sticker.length % STICKER.length];
  S.sticker.push(src); luu();
  const g = khung(`<div class="giua-man"><div class="sticker"><img src="${src}" alt=""></div><h1>${esc(KT.LOI.xongTram)}</h1>
    <div class="hang-sticker">${S.sticker.map(s => `<img src="${s}" alt="">`).join('')}</div>
    <div class="hang-nut"><button class="nut" id="t">▶ Đi tiếp ngay</button></div></div>`, { man: 'sticker' });
  g.querySelector('#t').onclick = () => { Am.dung(); diTiep(); };
  tuDongDi(KT.LOI.xongTram, 'sticker', diTiep);
}

/* ---------- cổng tiếng Trung ---------- */
async function chayCong() {
  PHIEN.cauSo = 0; let dung = 0;
  const boCong = [KT.ZH.CONG].concat(KT.ZH.CONG_SS || []);
  for (const it of boCong[chonBo('Z-G-bo', boCong.length)]) {
    const e = { id: it.id, lang: 'zh', dan: 'xm', item: it };
    const cu = cauDaLam(e.id), r = cu || await hienCau(e, 'Cổng vùng tiếng Trung');
    if (r.dung) dung++;
    if (!cu) { ghiLog(e.id, 'cong', r); await khen('zh', r.dung); }
  }
  const hoc = S.hs.ph.zh; // 0 chưa học, 1 dưới 6 tháng, 2–3 từ 6 tháng
  let c0 = false, bacDau = 1;
  if (hoc === 0 && dung === 0) c0 = true;
  else if (hoc >= 2 && dung >= 2) bacDau = 2;
  const kq = { dung, c0, bacDau, bac: c0 ? 0 : null };
  if (c0) {
    kq.thanhDieu = await troThanhDieu();
    for (const m of ['Z-NG', 'Z-DO', 'Z-VI', 'Z-NO']) S.tien[m] = 'bo';
    S.kq['Z-NG'] = { bac: 0, chiTiet: [], c0: true };
  }
  return kq;
}
async function troThanhDieu() {
  const bo = KT.ZH.THANH_DIEU[chonBo('Z-td', KT.ZH.THANH_DIEU.length)], cap = bo.cap, nghe = bo.nghe;
  let dung = 0;
  const g0 = khung(`${loiNV('xm', KT.LOI.thanhDieu)}<div class="hang-nut"><button class="nut" id="t">Chơi</button><button class="nut trang" id="b">Bỏ qua</button></div>`, { man: 'td' });
  const chon = await new Promise(res => { g0.querySelector('#t').onclick = () => { Am.dung(); res(1); }; g0.querySelector('#b').onclick = () => { Am.dung(); res(0); }; Am.noi('xm', 'vi', KT.LOI.thanhDieu).then(() => ngu(600)).then(() => res(1)); });
  if (!chon) return null;
  for (const [a, b, giong] of cap) {
    const g = khung(`${bang(`<div class="de"><button class="loa-to" id="loa">${em('🔊')}</button><div class="cau">Giống hay khác?</div></div><div class="dungsai"><button data-v="1" style="font-size:24px;font-weight:800">Giống</button><button data-v="0" style="font-size:24px;font-weight:800">Khác</button></div>`)}`, { man: 'td' });
    const phat = async () => { await Am.noi('xm', 'zh', nghe[a]); await ngu(500); await Am.noi('xm', 'zh', nghe[b]); };
    g.querySelector('#loa').onclick = phat; phat();
    const v = await new Promise(res => g.querySelectorAll('[data-v]').forEach(x => x.onclick = () => res(+x.dataset.v)));
    if (v === giong) dung++;
  }
  return { dung, tong: cap.length };
}

/* ---------- thẻ chữ Hán ---------- */
async function chayHan() {
  let dung = 0, saiLien = 0, lam = 0;
  const g0 = khung(`${loiNV('xm', KT.LOI.chuHan)}<div class="hang-nut"><button class="nut" id="t">Tiếp</button></div>`, { man: 'han' });
  await new Promise(res => { g0.querySelector('#t').onclick = () => { Am.dung(); res(); }; Am.noi('xm', 'vi', KT.LOI.chuHan).then(() => ngu(600)).then(res); });
  PHIEN.cauSo = 0;
  const boHan = [KT.ZH.HAN].concat(KT.ZH.HAN_SS || []), kHan = chonBo('Z-HZ-bo', boHan.length), HAN = boHan[kHan];
  for (let i = 0; i < HAN.length; i++) {
    const [d, s] = HAN[i];
    const e = { id: 'Z-HZ-' + (i + 1) + (kHan ? '-' + (kHan + 1) : ''), lang: 'zh', dan: 'xm', item: { a: d, o: ['t:' + d, 't:' + s] } };
    const cu = cauDaLam(e.id), r = cu || await hienCau(e, 'Tiếng Trung · Thẻ chữ Hán'); if (!cu) ghiLog(e.id, 'han', r); lam++;
    if (r.dung) { dung++; saiLien = 0; } else if (++saiLien >= 3) break;
  }
  return { dung, lam, tong: HAN.length, bo: kHan + 1, muc: dung <= 4 ? 'Mới đọc pinyin, chưa nắm chữ Hán' : dung <= 8 ? 'Nhận diện chữ Hán khá' : 'Đã biết chữ, sẵn sàng bài đọc không pinyin' };
}

/* ============================================================
   NÓI: ghi âm, giáo viên chấm
   ============================================================ */
let micStream = null;
async function layMic() {
  if (micStream && micStream.active) return micStream;
  micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  return micStream;
}
function ghiAm(stream, giay, onLevel) {
  return new Promise(resolve => {
    let mr; try { mr = new MediaRecorder(stream); } catch (e) { return resolve(null); }
    const parts = []; mr.ondataavailable = ev => ev.data.size && parts.push(ev.data);
    const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser(); an.fftSize = 512; ac.createMediaStreamSource(stream).connect(an);
    const buf = new Uint8Array(an.fftSize), t0 = performance.now();
    let daNoi = false, imTu = t0, dung = false;
    const stop = () => { if (dung) return; dung = true; try { mr.stop(); } catch (e) {} };
    mr.onstop = () => { ac.close(); resolve({ blob: new Blob(parts, { type: mr.mimeType || 'audio/webm' }), daNoi, giay: Math.round((performance.now() - t0) / 100) / 10 }); };
    mr.start(250);
    (function vong() {
      if (dung) return;
      an.getByteTimeDomainData(buf); let m = 0; for (const v of buf) m = Math.max(m, Math.abs(v - 128));
      const t = performance.now(); onLevel && onLevel(m, (t - t0) / 1000);
      if (m > 18) { daNoi = true; imTu = t; }
      if (daNoi && t - imTu > 2200) stop();
      if (t - t0 > giay * 1000) stop();
      requestAnimationFrame(vong);
    })();
    ghiAm.dungNgay = stop;
  });
}

async function chayNoi(ma, def, L) {
  const zh = def.lang === 'zh', dan = def.dan;
  const bacs = [...new Set([L, Math.min(L + 1, 4)])];
  const tasks = bacs.flatMap(b => hoanVi(`${ma}-${b}-noi`, def.bac[b].length).map(i => Object.assign({ bac: b }, def.bac[b][i])));
  /* khởi động: 1 câu hỏi dễ ở bậc thấp hơn (giáo viên vẫn nghe được, không tính vào bậc Nói) */
  if (L > 1 && def.bac[L - 1] && def.bac[L - 1][0]) { const t0 = def.bac[L - 1][0]; tasks.unshift(Object.assign({}, t0, { bac: L - 1, kd: true, buoc: t0.buoc.slice(0, 1) })); }
  const tieuDe = (zh ? 'Tiếng Trung' : 'Tiếng Anh') + ' · Nói';
  let stream = null;
  for (;;) {
    try { stream = await layMic(); break; } catch (e) {
      const g = khung(`${loiNV('huou', KT.LOI.micLoi)}
        <div class="hang-nut"><button class="nut" id="lai">Thử lại</button><button class="nut trang" id="bo">Bỏ qua phần Nói</button></div>`, { man: 'noi' });
      Am.noi('huou', 'vi', KT.LOI.micLoi);
      const v = await new Promise(res => { g.querySelector('#lai').onclick = () => res(1); g.querySelector('#bo').onclick = () => res(0); });
      if (!v) return { khongMic: true, bacs, tasks: [] };
    }
  }
  await manHuongDanBac(KT.LOI.noiHd, tieuDe);
  const kq = { bacs, tasks: [] };
  PHIEN.cauSo = 0;
  for (const t of tasks) {
    const rt = { id: t.id, bac: t.bac, kd: !!t.kd, ten: (t.kd ? 'Khởi động · ' : '') + t.ten, dat: t.dat || (t.loai === 'nhac' ? 'Nhắc lại đủ câu, rõ tiếng, đúng thanh điệu' : ''), nhac: t.loai === 'nhac', buoc: [] };
    if (t.loai === 'nhac') await manHuongDanBac(KT.LOI.nhacHd, tieuDe);
    for (let bi = 0; bi < t.buoc.length; bi++) {
      const b = t.buoc[bi];
      const daGhi = cauDaLam(t.id + '-' + (bi + 1)), keyCu = `${S.phien}/${t.id}/${bi + 1}`;
      if (daGhi && await Kho.lay(keyCu)) { rt.buoc.push({ key: keyCu, a: b.a, giay: (daGhi.ms || 0) / 1000, daNoi: daGhi.chon === 'có ghi âm', goiY: false }); continue; }   // đã ghi âm trước khi tải lại trang
      const g = khung(`${dauCau(tieuDe)}${bang(`<div class="de">
          <div style="display:flex;align-items:center;gap:12px;justify-content:center"><img src="${NV[dan]}" style="height:110px" alt=""><button class="loa-to" id="loa">${em('🔊')}<span class="lan" id="lan"></span></button></div>
          ${b.pic ? `<div class="tranh-de">${tranh(b.pic, t.id + '_b' + (bi + 1))}</div>` : ''}
          ${t.loai === 'nhac' ? '' : `<div class="cau ${zh ? 'zh' : ''}">${esc(b.a)}</div>`}
        </div>
        <div class="mic" id="mic">${em('🎤')}</div><div id="tt" class="nho" style="text-align:center">Nghe bạn ${TEN_NV[dan]} hỏi nhé…</div>
        <div class="vach-am"><i></i></div>
        <div class="hang-nut"><button class="nut an" id="xong">✔ Xong</button></div>`)}`, { man: 'noi' });
      const tt = g.querySelector('#tt'), vach = g.querySelector('.vach-am i'), mic = g.querySelector('#mic'), xong = g.querySelector('#xong');
      /* câu hỏi đọc chậm; tổng cộng chỉ nghe 2 lần (bài test), kể cả khi đang thu (bỏ phần thu dở, nghe xong thì thu lại) */
      const loa = g.querySelector('#loa'), lan = g.querySelector('#lan'), TOC = 0.85, MAX = 2;
      let daNghe = 0, dangThu = false, ngheLai = false;
      const capNhat = () => { lan.textContent = MAX - daNghe; loa.disabled = daNghe >= MAX; };
      const phat = async () => { daNghe++; capNhat(); loa.classList.add('dang'); await Am.noi(dan, def.lang, b.a, TOC); loa.classList.remove('dang'); };
      loa.onclick = () => { if (!dangThu || daNghe >= MAX) return; ngheLai = true; ghiAm.dungNgay && ghiAm.dungNgay(); };
      xong.onclick = () => ghiAm.dungNgay && ghiAm.dungNgay();
      await phat();
      let goiY = false, daNoiCo = false, r;
      for (;;) {
        await ngu(600);
        if (manHienTai !== 'noi') return null;
        tt.innerHTML = '<span class="dang-thu">Đang thu… con nói đi nào!</span><br><small>Chưa nghe rõ? Bấm 🔊 để nghe lại.</small>'; mic.classList.add('thu'); xong.classList.remove('an');
        ngheLai = false; dangThu = true;
        const p = ghiAm(stream, b.giay || 20, (m, s) => {
          vach.style.width = Math.min(100, m * 1.6) + '%';
          if (m > 18) daNoiCo = true;
          if (!goiY && t.goiY && s > 8 && !daNoiCo) { goiY = true; Am.noi(dan, def.lang, t.goiY); tt.innerHTML = '<span class="dang-thu">Bạn gợi ý rồi đó, con nói đi!</span>'; }
        });
        r = await p; dangThu = false; mic.classList.remove('thu');
        if (!ngheLai) break;
        xong.classList.add('an'); vach.style.width = '0'; tt.textContent = `Nghe bạn ${TEN_NV[dan]} hỏi lại nhé…`;
        await phat();
      }
      const key = `${S.phien}/${t.id}/${bi + 1}`;
      if (r && r.blob) await Kho.dat(key, r.blob);
      rt.buoc.push({ key, a: b.a, giay: r ? r.giay : 0, daNoi: r ? r.daNoi : false, goiY });
      ghiLog(t.id + '-' + (bi + 1), 'noi', { dung: null, ms: r ? r.giay * 1000 : 0, chon: r && r.daNoi ? 'có ghi âm' : 'im lặng' });
      await khen(def.lang, null); await ngu(300);
    }
    kq.tasks.push(rt);
  }
  return kq;
}

/* ============================================================
   NGHỈ, KẾT THÚC
   ============================================================ */
function nghi() {
  const g = khung(`<div class="giua-man">${loiNV('huou', KT.LOI.nghi, { anh: 'huou3' })}
    <div class="doi-hinh"><img src="${NV.bong}" alt=""><img src="${NV.anna}" alt=""><img src="${NV.leo}" alt=""><img src="${NV.xiaomei}" alt=""></div>
    <h2 id="dem">60</h2><div class="hang-nut"><button class="nut trang" id="bo">⏭️ Bỏ qua</button></div></div>`, { man: 'nghi' });
  Am.noi('huou', 'vi', KT.LOI.nghi);
  let n = 60, xong = false;
  const het = async () => {
    if (xong) return; xong = true; clearInterval(iv);
    if (manHienTai !== 'nghi') return;
    S.tien.NGHI = 'xong'; luu();
    khung(`<div class="giua-man"><img src="${NV.xiaomei}" style="height:240px" alt="">${loiNV('xm', '你好！' + KT.LOI.vaoZh)}<div class="hang-nut"><button class="nut do" id="t">Vào vùng tiếng Trung</button></div></div>`, { man: 'vaozh' });
    app.querySelector('#t').onclick = () => { Am.dung(); diTiep(); };
    await Am.noi('xm', 'zh', '你好！');
    if (manHienTai === 'vaozh') tuDongDi(KT.LOI.vaoZh, 'vaozh', diTiep, 'xm', 'vi');
  };
  const iv = setInterval(() => { n--; const d = g.querySelector('#dem'); if (d) d.textContent = n; if (n <= 0) het(); }, 1000);
  g.querySelector('#bo').onclick = het;
}

function ketThuc() {
  S.tien.KET = 'xong'; S.ketThuc = S.ketThuc || Date.now(); luu();
  const t = KT.LOI.ket, hien = t.replace('Chúc mừng con!', 'Chúc mừng ' + S.hs.ten + '!');
  const g = khung(`<div class="giua-man"><div class="doi-hinh"><img src="${NV.huou3}" alt=""><img src="${NV.bong}" alt=""><img src="${NV.anna}" alt=""><img src="${NV.leo}" alt=""><img src="${NV.xiaomei}" alt=""></div>
    <h1>🎉 ${esc(hien)}</h1><p style="font-size:22px;font-weight:700">Well done! · <span class="zh">你做得很好！</span></p>
    <div class="hang-sticker">${S.sticker.map(s => `<img src="${s}" alt="">`).join('')}</div>
    ${loiNV('huou', KT.LOI.ketPh)}
    <div class="hang-nut"><button class="nut" id="bc">Ba mẹ xem báo cáo</button></div></div>`, { man: 'ket' });
  (async () => { await Am.noi('huou', 'vi', t); await Am.noi('anna', 'en', 'Well done!'); await Am.noi('xm', 'zh', '你做得很好！'); await Am.noi('huou', 'vi', KT.LOI.ketPh); })();
  g.querySelector('#bc').onclick = () => baoCao(false);
  guiKetQua(false);
}

/* ============================================================
   TÍNH KẾT QUẢ
   ============================================================ */
const TEN_KN = { TV: 'Từ vựng', NG: 'Nghe', DO: 'Đọc', VI: 'Viết', NO: 'Nói' };
function bacNoi(r) {
  if (!r || r.khongMic || !r.tasks) return null;
  const diem = S.chamNoi || {};
  let cao = null;
  for (const b of r.bacs || []) {
    const ts = r.tasks.filter(t => t.bac === b);
    const ds = ts.map(t => diem[t.id] && diem[t.id].d);
    if (!ts.length || ds.some(d => d == null)) return { choGV: true, bac: cao };
    const tb = ds.reduce((a, b) => a + b, 0) / ds.length;
    if (tb >= 2) cao = b;
  }
  if (cao == null) cao = Math.max(0, Math.min(...(r.bacs || [1])) - 1);
  return { choGV: false, bac: cao };
}
function tinh() {
  const kq = S.kq, tuoi = S.hs ? S.hs.tuoi : 8;
  const ts = tuoi <= 7 ? CF.TRONG_SO.nho : CF.TRONG_SO.lon;
  const out = {};
  for (const L of ['en', 'zh']) {
    const P = L === 'en' ? 'E' : 'Z';
    const kn = {};
    if (L === 'en') ['TV', 'NG', 'DO', 'VI'].forEach(k => { if (kq['E-' + k]) kn[k] = { bac: kq['E-' + k].bac, choGV: kq['E-' + k].choGV }; });
    else ['NG', 'DO', 'VI'].forEach(k => { if (kq['Z-' + k] && kq['Z-' + k].bac != null) kn[k] = { bac: kq['Z-' + k].bac }; });
    const noi = bacNoi(kq[P + '-NO']);
    if (noi && noi.bac != null && !noi.choGV) kn.NO = { bac: noi.bac };
    const choNoi = noi && noi.choGV;
    let tong = 0, w = 0;
    for (const [k, v] of Object.entries(kn)) { const tw = L === 'zh' && k === 'NG' ? ts.TV + ts.NG : ts[k]; tong += v.bac * tw; w += tw; }
    let chung = w ? Math.floor(tong / w + 1e-9) : null;
    const ghiChu = [];
    if (kq['Z-G'] && kq['Z-G'].c0 && L === 'zh') chung = 0;
    if (kn.NO && chung != null && kn.NO.bac <= chung - 2) { chung = Math.max(0, chung - 1); ghiChu.push('Nói thấp hơn bậc chung 2 bậc: xếp xuống 1 bậc, cần ưu tiên nói.'); }
    if (choNoi) ghiChu.push('Bậc tạm tính, chưa có điểm Nói (giáo viên chấm).');
    if (kq['E-VI'] && kq['E-VI'].choGV && L === 'en') ghiChu.push('Bài viết tự do bậc E4 chờ giáo viên chấm.');
    const tran = Object.entries(kq).filter(([m, r]) => m.startsWith(P + '-') && r && r.tran).map(([m]) => TEN_KN[m.split('-')[1]]);
    if (tran.length) ghiChu.push('Đạt bậc cao nhất bài đo được ở: ' + tran.join(', ') + '. Bé có thể còn giỏi hơn, giáo viên kiểm tra thêm nếu cần.');
    // điểm vững / cần luyện
    const vung = [], luyen = []; let soChuaVung = 0;
    for (const [m, r] of Object.entries(kq)) {
      if (!m.startsWith(P + '-') || !r.chiTiet) continue;
      const kny = TEN_KN[m.split('-')[1]];
      for (const c of r.chiTiet) for (const d of c.diem) {
        if (d.ketLuan === 'chua_vung') soChuaVung++;
        if (c.qua && (d.ketLuan === 'vung' || d.ketLuan === 'nham') && c.bac === r.bac) vung.push(kny + ': ' + d.ten);
        if (!c.qua && (d.ketLuan === 'chua_vung' || d.ketLuan === 'chua_nam')) luyen.push(kny + ': ' + d.ten);
      }
    }
    const bacs = Object.values(kn).map(v => v.bac);
    const lech = bacs.length ? Math.max(...bacs) - Math.min(...bacs) : 0;
    const mic = kq[P + '-NO'] && kq[P + '-NO'].khongMic;
    const chac = mic || lech >= 3 ? 3 : (soChuaVung >= 2 || (L === 'en' && (S.soNhanhEn || 0) >= 5)) ? 2 : 1;
    out[L] = { kn, chung, ghiChu, vung: [...new Set(vung)], luyen: [...new Set(luyen)], chac, choNoi };
  }
  return out;
}

/* ============================================================
   BÁO CÁO
   ============================================================ */
const CHAC = { 1: 'Chắc chắn – xếp lớp ngay', 2: 'Cần xem lại – giáo viên nghe lại phần nói hoặc hỏi thêm 3 phút', 3: 'Cần gặp trực tiếp – giáo viên kiểm tra trực tiếp' };
function hangKyNang(L, k, v) {
  const ten = KT.BAC[L][v.bac] || '—';
  return `<div class="ky-nang"><b>${TEN_KN[k]}</b><div class="thanh-bac"><i style="width:${Math.max(4, v.bac / 5 * 100)}%"></i></div><span>${esc(ten)}</span></div>`;
}
async function baoCao(laGV) {
  if (laGV && !GV) return;
  if (laGV && CF.MAT_KHAU_GV && !S.gvMo) {
    const g = khung(`<div class="form"><h2>Trang giáo viên</h2><label>Mật khẩu</label><input type="text" id="mk"><div class="hang-nut"><button class="nut" id="ok">Vào</button></div></div>`);
    g.querySelector('#ok').onclick = () => { if (g.querySelector('#mk').value === CF.MAT_KHAU_GV) { S.gvMo = true; baoCao(true); } };
    return;
  }
  if (!S.hs) return trangChu();
  const T = tinh();
  const ngay = new Date(S.ketThuc || Date.now()).toLocaleDateString('vi-VN');
  let html = `<span class="nhan">Báo cáo kiểm tra đầu vào</span><h1 style="margin-top:6px">${esc(S.hs.ten)} · ${S.hs.tuoi} tuổi</h1><p class="nho">Ngày làm: ${ngay}${S.batDau && S.ketThuc ? ' · Thời gian: ' + Math.round((S.ketThuc - S.batDau) / 60000) + ' phút' : ''}</p>`;
  for (const L of ['en', 'zh']) {
    const r = T[L], tenL = L === 'en' ? 'Tiếng Anh' : 'Tiếng Trung';
    const lop = r.chung != null && KT.LOP[L][r.chung];
    html += `<div class="bc ${L === 'zh' ? '' : ''}"><h2>${tenL}${r.chung != null ? ' · ' + esc(KT.BAC[L][r.chung]) : ''}</h2>
      ${Object.entries(r.kn).map(([k, v]) => hangKyNang(L, k, v)).join('')}
      ${r.choNoi ? `<div class="ky-nang"><b>Nói</b><div class="thanh-bac"></div><span>Chờ giáo viên chấm</span></div>` : ''}
      ${r.vung.length ? `<h3 style="margin-top:12px">Con đã làm được</h3><ul>${r.vung.slice(0, 6).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      ${r.luyen.length ? `<h3 style="margin-top:12px">Con cần luyện thêm</h3><ul>${r.luyen.slice(0, 5).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      ${L === 'zh' && S.kq['Z-DO'] && S.kq['Z-DO'].han ? `<p><b>Thẻ chữ Hán:</b> ${S.kq['Z-DO'].han.dung}/${S.kq['Z-DO'].han.tong} · ${esc(S.kq['Z-DO'].han.muc)}</p>` : ''}
      ${L === 'zh' && S.kq['Z-G'] && S.kq['Z-G'].c0 ? `<p>Con chưa học tiếng Trung. ${S.kq['Z-G'].thanhDieu ? 'Trò tai nghe thanh điệu: ' + S.kq['Z-G'].thanhDieu.dung + '/6 (chỉ để giáo viên tham khảo).' : ''}</p>` : ''}
      ${r.ghiChu.map(x => `<p class="nho">ⓘ ${esc(x)}</p>`).join('')}
      <p><b>Lớp đề xuất:</b> ${lop ? esc(lop) : 'Trung tâm sẽ liên hệ ba mẹ để tư vấn lớp phù hợp.'}</p>
      ${laGV ? `<p><span class="nhan-chac c${r.chac}">${CHAC[r.chac]}</span></p>` : ''}</div>`;
  }
  html += `<div class="hang-nut"><button class="nut vang" id="tai">⬇️ Tải kết quả</button>${CF.KQ_API ? '<button class="nut" id="gui">📤 Gửi lại kết quả cho trung tâm</button>' : ''}${laGV ? '<button class="nut trang" id="csv">⬇️ Tải bảng câu trả lời (.csv)</button>' : ''}</div><p class="nho" id="tt-gui" style="text-align:center"></p>`;
  if (laGV) html += await phanGV();
  const g = khung(html, { man: 'bc' });
  if (!laGV) Am.noi('huou', 'vi', KT.LOI.baoCao);
  g.querySelector('#tai').onclick = () => taiFile(true);
  const gui = g.querySelector('#gui'); if (gui) gui.onclick = () => guiKetQua(true);
  const csv = g.querySelector('#csv'); if (csv) csv.onclick = taiCsv;
  if (laGV) ganGV(g);
}

async function phanGV() {
  let h = `<div class="bc"><h2>Phần giáo viên</h2><p class="nho">Phụ huynh: ${esc(S.hs.sdt || '—')} · Học tiếng Anh: ${esc(KT.PHU_HUYNH[0].o[S.hs.ph.en])} · Học tiếng Trung: ${esc(KT.PHU_HUYNH[1].o[S.hs.ph.zh])} · Đọc tiếng Việt: ${esc(KT.PHU_HUYNH[2].o[S.hs.ph.doc])} · ${esc(KT.PHU_HUYNH[3].o[S.hs.ph.cung])}${S.ngan ? ' · <b>Đã bật bản ngắn cho tiếng Trung</b>' : ''}</p>`;
  for (const m of ['E-NO', 'Z-NO']) {
    const r = S.kq[m]; if (!r) continue;
    h += `<h3>Chấm Nói ${m === 'E-NO' ? 'tiếng Anh' : 'tiếng Trung'}</h3>`;
    if (r.khongMic) { h += '<p>Không ghi âm được (bé bỏ qua phần Nói).</p>'; continue; }
    h += '<p class="nho">0 im lặng / tiếng Việt · 1 một từ đúng nghĩa · 2 cụm hoặc câu ngắn còn lỗi · 3 đạt tiêu chí. Câu có gợi ý tối đa 2 điểm.</p><table><tr><th>Nhiệm vụ</th><th>Ghi âm</th><th>Điểm</th></tr>';
    for (const t of r.tasks) {
      const cd = (S.chamNoi || {})[t.id] || {};
      let am = '';
      for (const b of t.buoc) { const blob = await Kho.lay(b.key); am += `<div class="nho">${esc(b.a)} ${b.goiY ? '(có gợi ý)' : ''}<br>${blob ? `<audio controls src="${URL.createObjectURL(blob)}"></audio>` : '<i>không có file</i>'}</div>`; }
      h += `<tr><td><b>${esc(t.id)}</b> · ${esc(t.ten)}<br><span class="nho">Bậc ${t.bac} · ${esc(t.dat)}</span></td><td>${am}</td><td>
        <div class="cham-noi" data-t="${t.id}" data-k="d">${[0, 1, 2, 3].map(v => `<button data-v="${v}" class="${cd.d === v ? 'chon' : ''}">${v}</button>`).join('')}</div>
        ${t.nhac && m === 'Z-NO' && t.bac >= 2 ? `<div class="nho">Thanh điệu</div><div class="cham-noi" data-t="${t.id}" data-k="td">${[0, 1, 2].map(v => `<button data-v="${v}" class="${cd.td === v ? 'chon' : ''}">${v}</button>`).join('')}</div>` : ''}</td></tr>`;
    }
    h += '</table>';
  }
  const ev = S.kq['E-VI'];
  if (ev && ev.choGV) {
    const bv = ev.chiTiet.flatMap(c => c.diem.filter(d => d.ketLuan === 'cho_gv').map(d => d.baiViet));
    h += `<h3>Bài viết tự do (E4)</h3>${bv.map(b => `<p style="background:#FFF4CC;border-radius:10px;padding:8px">${esc(b || '—')}</p>`).join('')}<p class="nho">Thang 0–3: 0 không viết / sai chủ đề · 1 từ rời đúng ý · 2 câu hiểu được còn lỗi · 3 hai câu đúng có nối ý. Đạt 2 trở lên thì giữ E5, dưới 2 thì xếp E4.</p>
      <div class="cham-noi" data-t="E-VI-TUDO" data-k="d">${[0, 1, 2, 3].map(v => `<button data-v="${v}" class="${((S.chamNoi || {})['E-VI-TUDO'] || {}).d === v ? 'chon' : ''}">${v}</button>`).join('')}</div>`;
  }
  h += `<h3>Kết luận từng điểm kiến thức</h3><table><tr><th>Kỹ năng</th><th>Bậc</th><th>Điểm kiến thức</th><th>Kết luận</th></tr>`;
  const KL = { vung: 'Nắm vững', nham: 'Nhầm nhất thời', chua_vung: 'Chưa vững', chua_nam: 'Chưa nắm', cho_gv: 'Chờ GV chấm', chua_hoi: 'Không cần hỏi (đã đủ kết luận)' };
  for (const [m, r] of Object.entries(S.kq)) (r.chiTiet || []).forEach(c => c.diem.forEach(d => { h += `<tr><td>${m}</td><td>${c.bac} ${c.qua ? '✔' : '✘'}</td><td>${esc(d.ten)}</td><td>${KL[d.ketLuan] || ''}</td></tr>`; }));
  h += `</table><h3>Nhật ký câu trả lời (${S.log.length})</h3><table><tr><th>Mã</th><th>Câu</th><th>Bé chọn</th><th>Đáp án</th><th>Kết quả</th><th>Thời gian</th></tr>`;
  for (const l of S.log) h += `<tr><td>${esc(l.id)}</td><td>${esc(l.loai)}</td><td>${esc(l.chon)}</td><td>${esc(l.dapAn)}</td><td>${l.dung == null ? '—' : l.dung ? '<span class="dung-c">đúng</span>' : '<span class="sai-c">sai</span>'}${l.nhanh ? ' ⚡' : ''}</td><td>${(l.ms / 1000).toFixed(1)}s</td></tr>`;
  h += `</table><div class="hang-nut"><button class="nut trang" id="ve-tram">Mở lại các trạm (thử)</button></div></div>`;
  return h;
}
function ganGV(g) {
  g.querySelectorAll('.cham-noi').forEach(h => h.querySelectorAll('button').forEach(b => b.onclick = () => {
    S.chamNoi = S.chamNoi || {}; const t = h.dataset.t, k = h.dataset.k;
    S.chamNoi[t] = Object.assign(S.chamNoi[t] || {}, { [k]: +b.dataset.v });
    if (t === 'E-VI-TUDO' && S.kq['E-VI'] && S.kq['E-VI'].choGV) { S.kq['E-VI'].bacGoc = S.kq['E-VI'].bacGoc || S.kq['E-VI'].bac; S.kq['E-VI'].bac = +b.dataset.v >= 2 ? S.kq['E-VI'].bacGoc : Math.min(S.kq['E-VI'].bacGoc, 4); }
    luu(); const y = window.scrollY; baoCao(true).then(() => window.scrollTo(0, y));
  }));
  const v = g.querySelector('#ve-tram'); if (v) v.onclick = () => banDo();
}

/* ---------- xuất, gửi ---------- */
async function goiKetQua(coGhiAm, st = S, T = null) {
  if (!T) T = tinh();
  const ghiAm = {};
  if (coGhiAm) for (const m of ['E-NO', 'Z-NO']) for (const t of ((st.kq[m] || {}).tasks || [])) for (const b of t.buoc) {
    const blob = await Kho.lay(b.key); if (!blob) continue;
    /* Chrome ghi "audio/webm;codecs=opus": bỏ phần codecs để máy chủ nhận đúng dạng data:<loại>;base64, */
    ghiAm[b.key] = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(String(fr.result).replace(/^data:([^;,]+)[^,]*?;base64,/, 'data:$1;base64,')); fr.readAsDataURL(blob); });
  }
  const tienDo = st.tien.KET ? 'Xong bài' : st === S ? 'Đang làm: ' + daXongSo() + '/' + LO.length + ' trạm' : 'Bỏ dở';
  return { phienBan: 2, tienDo, phien: st.phien, hs: st.hs, batDau: st.batDau, ketThuc: st.ketThuc, ketQua: st.kq, tongHop: T, chamNoi: st.chamNoi || {}, nhatKy: st.log, ghiAm };
}
async function taiFile(coGhiAm) {
  const d = await goiKetQua(coGhiAm);
  await luuFile(`kiem-tra-${(S.hs.ten || 'be').replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.json`, new Blob([JSON.stringify(d)], { type: 'application/json' }));
}
/* Lưu file: trong bản xem trước trên claude.ai dùng hộp lưu của Claude, trên GitHub Pages dùng link tải thường */
async function luuFile(ten, blob) {
  try {
    const dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
    if (dl) { await dl.save({ filename: ten, data: blob }); return; }
  } catch (e) { /* người xem từ chối hoặc không hỗ trợ: dùng link */ }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = ten;
  document.body.appendChild(a); a.click(); a.remove();
}
function taiCsv() {
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const rows = [['Mã', 'Loại', 'Bé chọn', 'Đáp án', 'Đúng', 'Nhanh', 'Giây']].concat(S.log.map(l => [l.id, l.loai, l.chon, l.dapAn, l.dung, l.nhanh, (l.ms / 1000).toFixed(1)]));
  luuFile(`cau-tra-loi-${(S.hs.ten || 'be').replace(/\s+/g, '-')}.csv`, new Blob(['\ufeff' + rows.map(r => r.map(q).join(',')).join('\n')], { type: 'text/csv' }));
}
async function guiKetQua(baoLai, coGhiAm = true) {
  if (!CF.KQ_API) return;
  const tt = document.getElementById('tt-gui');
  try {
    if (tt) tt.textContent = 'Đang gửi…';
    const d = await goiKetQua(coGhiAm);
    await fetch(CF.KQ_API, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(d) });
    S.daGui = Date.now(); if (coGhiAm) S.guiAmV = 2; luu();
    if (tt) tt.textContent = 'Đã gửi kết quả cho trung tâm.';
  } catch (e) { if (tt) tt.textContent = 'Chưa gửi được. Ba mẹ bấm "Tải kết quả" rồi gửi file qua Zalo cho trung tâm nhé.'; }
}

/* ---------- công cụ kiểm thử (chỉ dùng khi chạy thử tự động) ---------- */
window.KT_THU = { S: () => S, tinh, chayBac, hienCau, banDo, trangChu, LO };

/* ---------- bắt đầu ---------- */
/* ============================================================
   XEM TOÀN BỘ ĐỀ (?xem=1): để giáo viên duyệt hình thức từng phần, không lưu, không gửi kết quả
   ============================================================ */
const XEM = /[?&]xem=1/.test(location.search);
const XEM_TRAM = [['E-TV', 'TA · Từ vựng'], ['E-NG', 'TA · Nghe'], ['E-DO', 'TA · Đọc'], ['E-VI', 'TA · Viết'], ['E-NO', 'TA · Nói'],
  ['Z-G', 'TT · Cổng'], ['Z-NG', 'TT · Nghe'], ['Z-DO', 'TT · Đọc'], ['Z-HZ', 'TT · Thẻ chữ Hán'], ['Z-VI', 'TT · Viết'], ['Z-NO', 'TT · Nói']];
let xemCuon = 0;
function xemDe(ma = 'E-TV', baoKq = '') {
  const tab = `<div class="xem-tab">${XEM_TRAM.map(([m, t]) => `<button class="${m === ma ? 'chon' : ''}" data-tab="${m}">${t}</button>`).join('')}</div>`;
  const nut = (id, nhan) => `<button class="xem-cau" data-id="${id}">${nhan}</button>`;
  let noi = '';
  const def = TRAM_DEF[ma];
  if (ma === 'Z-G') noi = [KT.ZH.CONG].concat(KT.ZH.CONG_SS || []).map((bo, k) => `<div class="xem-bac"><h3>3 câu sàng lọc · bộ ${k + 1}</h3><div class="xem-diem">${bo.map((it, i) => nut('CONG:' + k + ':' + i, 'Câu ' + (i + 1))).join('')}</div></div>`).join('')
    + KT.ZH.THANH_DIEU.map((bo, k) => `<div class="xem-bac"><h3>Trò tai nghe thanh điệu · bộ ${k + 1} <span class="nho">(chỉ cho bé chưa học tiếng Trung)</span></h3><div class="xem-diem">${bo.cap.map(([a, b2, gi]) => `<span>${esc(a)} – ${esc(b2)} (${gi ? 'giống' : 'khác'}) <button class="xem-nghe" data-nv="xm" data-lang="zh" data-t="${esc(bo.nghe[a])}">🔊</button><button class="xem-nghe" data-nv="xm" data-lang="zh" data-t="${esc(bo.nghe[b2])}">🔊</button></span>`).join(' · ')}</div></div>`).join('');
  else if (ma === 'Z-HZ') noi = [KT.ZH.HAN].concat(KT.ZH.HAN_SS || []).map((bo, k) => `<div class="xem-bac"><h3>12 thẻ chữ Hán · bộ ${k + 1} (dừng khi sai 3 thẻ liền)</h3><div class="xem-diem">${bo.map((h, i) => nut('HZ:' + k + ':' + i, esc(h[0]))).join('')}</div></div>`).join('');
  else if (ma.endsWith('NO')) {
    noi = Object.entries(def.bac).map(([b, ts]) => `<div class="xem-bac"><h3>Bậc ${b}</h3>${ts.map(t => `<div class="xem-noi"><b>${esc(t.ten)}</b> <span class="nho">· đạt: ${esc(t.dat || (t.loai === 'nhac' ? 'nhắc lại đủ, rõ, đúng thanh điệu' : ''))}</span>
      <div class="xem-buoc">${t.buoc.map((bc, i) => `<div>${bc.pic ? tranh(bc.pic, t.id + '_b' + (i + 1)) : ''}<button class="xem-nghe" data-nv="${def.dan}" data-lang="${def.lang}" data-t="${esc(bc.a)}">🔊</button> <span class="${def.lang === 'zh' ? 'zh' : ''}">${t.loai === 'nhac' ? '(nhắc lại) ' : ''}${esc(bc.a)}</span></div>`).join('')}</div></div>`).join('')}</div>`).join('');
  } else {
    if (def.thu) noi += `<div class="xem-bac"><h3>Câu làm thử (mỗi bé 1 trong ${1 + (def.thuSS || []).length} câu)</h3><div class="xem-diem">${[def.thu].concat(def.thuSS || []).map((it, k) => nut(ma + ':THU:' + k, 'Bộ ' + (k + 1))).join('')}</div></div>`;
    if (def.kiemTra) noi += [def.kiemTra].concat(def.kiemTraSS || []).map((bo, k) => `<div class="xem-bac"><h3>Kiểm tra biết đọc · bộ ${k + 1}</h3><div class="xem-diem">${bo.map((it, i) => nut(ma + ':KT:' + k + ':' + i, 'Câu ' + (i + 1))).join('')}</div></div>`).join('');
    noi += Object.entries(def.bac).map(([b, lv]) => `<div class="xem-bac"><h3>Bậc ${b} <button class="xem-nghe" data-nv="huou" data-lang="vi" data-t="${esc(lv.hd)}">🔊</button></h3><p class="nho">${esc(lv.hd)}</p>
      ${lv.diem.map((p, pi) => `<div class="xem-diem"><span class="ten-diem">${pi + 1}. ${esc(p.ten)}${p.tuDo ? ' (viết tự do, GV chấm)' : ''}</span>${p.cau.map((c, ci) => nut(`${ma}:${b}:${pi}:${ci}`, ABC[ci])).join('')}</div>`).join('')}</div>`).join('');
  }
  const g = khung(`<span class="nhan">Xem toàn bộ đề · chế độ duyệt</span><p class="nho">Bấm vào từng câu để làm thử đúng như bé thấy. Chế độ này không lưu, không gửi kết quả. A/B/C là 3 câu song song; khi bé làm thật, máy chọn ngẫu nhiên một câu làm câu chính.</p>
    ${baoKq ? `<div class="xem-kq">${baoKq}</div>` : ''}${tab}<div class="xem-noi-dung">${noi}</div>`, { man: 'xem' });
  window.scrollTo(0, xemCuon);
  g.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { xemCuon = 0; xemDe(b.dataset.tab); });
  g.querySelectorAll('.xem-nghe').forEach(b => b.onclick = () => { Am.dung(); Am.noi(b.dataset.nv, b.dataset.lang, b.dataset.t); });
  g.querySelectorAll('.xem-cau').forEach(b => b.onclick = async () => {
    xemCuon = window.scrollY;
    const id = b.dataset.id, p = id.split(':');
    let e;
    if (p[0] === 'CONG') { const it = [KT.ZH.CONG].concat(KT.ZH.CONG_SS || [])[+p[1]][+p[2]]; e = { id: it.id, lang: 'zh', dan: 'xm', item: it }; }
    else if (p[0] === 'HZ') { const k = +p[1], [d, s2] = [KT.ZH.HAN].concat(KT.ZH.HAN_SS || [])[k][+p[2]]; e = { id: 'Z-HZ-' + (+p[2] + 1) + (k ? '-' + (k + 1) : ''), lang: 'zh', dan: 'xm', item: { a: d, o: ['t:' + d, 't:' + s2] } }; }
    else if (p[1] === 'THU') { const k = +p[2]; e = { id: p[0] + '-THU' + (k ? k + 1 : ''), lang: def.lang, dan: def.dan, item: [def.thu].concat(def.thuSS || [])[k] }; }
    else if (p[1] === 'KT') { const k = +p[2]; e = { id: p[0] + '-KT' + (+p[3] + 1) + (k ? '-' + (k + 1) : ''), lang: def.lang, dan: def.dan, item: [def.kiemTra].concat(def.kiemTraSS || [])[k][+p[3]] }; }
    else e = entry(p[0], def, +p[1], +p[2], +p[3]);
    const r = await hienCau(e, 'Xem đề · ' + XEM_TRAM.find(x => x[0] === ma)[1] + ' · ' + e.id);
    xemDe(ma, `Câu ${esc(e.id)}: ${r.dung === null ? 'viết tự do (giáo viên chấm)' : r.dung ? '✅ đúng' : '❌ sai'}${r.chon != null ? ' · đã chọn: ' + esc(String(r.chon)) : ''}`);
  });
}

if (XEM) xemDe();
else if (GV && S.hs && S.tien.KET) baoCao(true); else chamBatDau();
/* gửi bù ghi âm phần Nói (bản cũ gửi sai định dạng nên Drive chưa nhận được): làm một lần, chạy ngầm */
if (!XEM && CF.KQ_API) setTimeout(async () => {
  try {
    if (S.phien && S.hs && (S.kq['E-NO'] || S.kq['Z-NO']) && S.guiAmV !== 2) await guiKetQua(false);
    const cu = JSON.parse(localStorage.getItem(LUU + '-cu') || '[]'); let doi = false;
    for (const x of cu) if (x.S && x.S.guiAmV !== 2) {   // bài của bé trước trên cùng máy
      const d = await goiKetQua(true, x.S, x.tongHop);
      await fetch(CF.KQ_API, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(d) });
      x.guiAmV = 2; x.S = null; doi = true;
    }
    if (doi) localStorage.setItem(LUU + '-cu', JSON.stringify(cu));
  } catch (e) {}
}, 4000);
})();
