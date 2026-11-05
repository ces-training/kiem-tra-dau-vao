/* Hàm dùng chung cho web (kt.js) và công cụ sinh danh sách (tools/build.js).
   Mã câu hỏi, mã tranh, mã giọng đọc đều sinh ở đây để hai bên luôn khớp nhau. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.KT_CHUNG = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const ABC = 'ABC';

  function cacTram(KT) {
    return [
      { ma: 'E-TV', L: 'E', sk: 'TV', lang: 'en', def: KT.EN.TV },
      { ma: 'E-NG', L: 'E', sk: 'NG', lang: 'en', def: KT.EN.NG },
      { ma: 'E-DO', L: 'E', sk: 'DO', lang: 'en', def: KT.EN.DO },
      { ma: 'E-VI', L: 'E', sk: 'VI', lang: 'en', def: KT.EN.VI },
      { ma: 'Z-NG', L: 'Z', sk: 'NG', lang: 'zh', def: KT.ZH.NG },
      { ma: 'Z-DO', L: 'Z', sk: 'DO', lang: 'zh', def: KT.ZH.DO },
      { ma: 'Z-VI', L: 'Z', sk: 'VI', lang: 'zh', def: KT.ZH.VI }
    ];
  }

  function lapNganHang(KT) {
    const out = [];
    for (const st of cacTram(KT)) {
      const d = st.def, base = { L: st.L, sk: st.sk, lang: st.lang, dan: d.dan };
      if (d.thu) out.push(Object.assign({ id: st.ma + '-THU', kind: 'thu', item: d.thu }, base));
      (d.thuSS || []).forEach((it, k) => out.push(Object.assign({ id: st.ma + '-THU' + (k + 2), kind: 'thu', item: it }, base)));
      [d.kiemTra || []].concat(d.kiemTraSS || []).forEach((bo, k) => bo.forEach((it, i) => out.push(Object.assign({ id: st.ma + '-KT' + (i + 1) + (k ? '-' + (k + 1) : ''), kind: 'kiemtra', item: it }, base))));
      for (const [b, lv] of Object.entries(d.bac)) {
        lv.diem.forEach((p, pi) => p.cau.forEach((it, ci) => out.push(Object.assign({
          id: `${st.ma}-${b}-${pi + 1}${ABC[ci]}`, kind: 'cau', bac: +b, diem: pi + 1, idx: ci, item: it
        }, base))));
      }
    }
    for (const [L, def] of [['E', KT.EN.NO], ['Z', KT.ZH.NO]]) {
      for (const [b, tasks] of Object.entries(def.bac)) tasks.forEach(t => out.push({
        id: t.id, kind: 'noi', L, sk: 'NO', lang: def.lang, dan: def.dan, bac: +b, item: t
      }));
    }
    [KT.ZH.CONG].concat(KT.ZH.CONG_SS || []).forEach(bo => bo.forEach(it => out.push({ id: it.id, kind: 'cong', L: 'Z', sk: 'G', lang: 'zh', dan: 'xm', item: it })));
    return out;
  }

  /* "spec ~ mô tả" → {spec, desc} */
  function tachTranh(s) {
    const i = s.indexOf('~');
    return i < 0 ? { spec: s.trim(), desc: '' } : { spec: s.slice(0, i).trim(), desc: s.slice(i + 1).trim() };
  }

  /* FNV-1a 32 bit trên UTF-8 */
  function bam(str) {
    const bytes = typeof TextEncoder !== 'undefined' ? new TextEncoder().encode(str) : Buffer.from(str, 'utf8');
    let h = 0x811c9dc5;
    for (const b of bytes) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function maGiong(nv, lang, loi) { return `${nv}_${lang}_${bam(loi.trim())}`; }

  return { cacTram, lapNganHang, tachTranh, maGiong, bam };
});
