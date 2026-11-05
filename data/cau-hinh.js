/* ============================================================
   CÀI ĐẶT – sửa ở đây, không cần sửa code
   ============================================================ */
window.KT_CAU_HINH = {
  /* Link Web App Apps Script nhận kết quả (xem apps-script/KiemTra.gs).
     Để trống: kết quả chỉ lưu trên máy, ba mẹ / giáo viên tải file về. */
  KQ_API: 'https://script.google.com/macros/s/AKfycbxMGjKLZqGBbdNp-WOBzi8clym5r2hVnIoE3LEkemEJ38vGTW_DZE5ZZ_ElLyaRl0rB/exec',

  /* Hiện chú thích tiếng Việt dưới tranh tạm (emoji) – tắt khi đã có đủ tranh vẽ thật */
  CHU_THICH: true,

  /* Tiếng Anh đọc bằng giọng máy khi chưa có file giọng: 'en-GB' (Anh) hoặc 'en-US' (Mỹ) */
  GIONG_ANH: 'en-GB',

  /* Số lần tối đa được nghe lại một câu */
  SO_LAN_NGHE: 2,

  /* Mật khẩu xem trang giáo viên (thêm ?gv=1 vào link). Để trống = không hỏi */
  MAT_KHAU_GV: '',

  /* Trọng số tính bậc tổng (phần trăm), theo tuổi */
  TRONG_SO: {
    nho: { TV: 25, NG: 30, NO: 25, DO: 10, VI: 10 },   /* 5–7 tuổi */
    lon: { TV: 20, NG: 25, NO: 20, DO: 20, VI: 15 }    /* 8–10 tuổi */
  }
};
