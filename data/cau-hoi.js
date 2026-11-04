/* ============================================================
   NGÂN HÀNG CÂU HỎI – Bài kiểm tra đầu vào Anh – Trung (5–10 tuổi)
   Nguồn: tài liệu "Nội dung chi tiết bài kiểm tra đầu vào Lingo Cub".
   Sửa nội dung ở file này; web tự đọc lại, không cần sửa code.

   Quy ước lựa chọn (o): phần tử ĐẦU TIÊN luôn là đáp án đúng
   (web tự xáo thứ tự khi hiện cho bé).
     "t:chữ"           thẻ chữ  ("t:学生 / xuésheng" = chữ + dòng phụ)
     "s:câu"           nút loa, bé nghe rồi chọn
     "ts:câu"          thẻ chữ có nút loa
     "<tranh> ~ mô tả" tranh; mô tả dùng để vẽ tranh thật và làm chú thích tạm
   Tranh tạm (cho tới khi có tranh vẽ thật trong img/tranh/):
     e:🐶        hình emoji Fluent (nhiều emoji = ghép cạnh nhau)
     f:ten       tranh có sẵn của web 21 ngày (img/dung-lai)
     ch:anna     nhân vật (anna, bong, leo, xiaomei, tho, gau, huou)
     ch:leo:⚽   nhân vật cầm/kèm đồ vật
     c:red       mảng màu; c:green:👕 đồ vật tô màu
     n:3         thẻ số;  k:7:⭐ đếm 7 ngôi sao;  L:b thẻ chữ cái to
     clock:7:30  đồng hồ;  cal:WED  tờ lịch;  x  khung "tranh sắp có"
     a+b         ghép hai tranh
   Lời đọc (a): chuỗi = người dẫn đọc; mảng [[người, câu], ...] = hội thoại.
     Người: huou (cô Hươu), anna, leo, bong, xm (Xiaomei), tho (Thỏ con),
            bo (giọng bố / nam), me (giọng mẹ / nữ)
   ============================================================ */
window.KT = window.KT || {};

/* ---------- Chuyển đổi bậc → tên ---------- */
KT.BAC = {
  en: ['E0 · Khởi đầu', 'E1 · Làm quen', 'E2 · Starters (Pre A1)', 'E3 · Movers (A1)', 'E4 · Flyers (A2)', 'E5 · Trên Flyers (A2+)'],
  zh: ['C0 · Chưa học', 'C1 · Làm quen', 'C2 · YCT 1', 'C3 · YCT 2 (≈ HSK 1)', 'C4 · YCT 3 (≈ HSK 2)', 'C5 · YCT 4+ (≈ HSK 3)']
};

/* Lớp đề xuất theo bậc: cô điền tên lớp vào đây (để trống = chưa có) */
KT.LOP = {
  en: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' },
  zh: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' }
};

/* ---------- Câu hỏi phụ huynh ---------- */
KT.PHU_HUYNH = [
  { id: 'en', q: 'Con đã học tiếng Anh bao lâu?', o: ['Chưa học', 'Dưới 6 tháng', '6 tháng – 1 năm', 'Trên 1 năm'] },
  { id: 'zh', q: 'Con đã học tiếng Trung bao lâu?', o: ['Chưa học', 'Dưới 6 tháng', '6 tháng – 1 năm', 'Trên 1 năm'] },
  { id: 'doc', q: 'Con đã tự đọc được chữ tiếng Việt chưa?', o: ['Chưa', 'Đánh vần được', 'Đọc trôi chảy'] },
  { id: 'cung', q: 'Ai cầm máy cùng con?', o: ['Con tự làm', 'Ba mẹ ngồi cạnh'] }
];

/* ============================================================
   TIẾNG ANH
   ============================================================ */
KT.EN = {};

/* ---------- Từ vựng (trạm định vị) ---------- */
KT.EN.TV = {
  ten: 'Từ vựng', o: 'cx_o_cards', lang: 'en', dan: 'anna',
  thu: { a: 'apple', o: ['e:🍎 ~ quả táo', 'e:🍌 ~ quả chuối', 'e:🥛 ~ cốc sữa'] },
  bac: {
    1: { hd: 'Con nghe từ rồi chạm vào tranh đúng nhé.', diem: [
      { ten: 'Màu sắc', cau: [
        { a: 'red', o: ['c:red ~ bóng đỏ', 'c:blue ~ bóng xanh dương', 'c:yellow ~ bóng vàng'] },
        { a: 'green', o: ['c:green:👕 ~ áo xanh lá', 'c:pink:👕 ~ áo hồng', 'c:orange:👕 ~ áo cam'] },
        { pic: 'ch:anna:🌼 ~ Anna cầm bông hoa vàng', o: ['s:yellow', 's:blue', 's:black'] } ] },
      { ten: 'Con vật', cau: [
        { a: 'dog', o: ['f:cun ~ con chó', 'f:meo ~ con mèo', 'e:🐟 ~ con cá'] },
        { a: 'fish', o: ['e:🐟 ~ con cá', 'e:🐦 ~ con chim', 'e:🦆 ~ con vịt'] },
        { pic: 'f:meo ~ con mèo', o: ['s:cat', 's:duck', 's:cow'] } ] },
      { ten: 'Số 1–10', cau: [
        { a: 'three', o: ['n:3', 'n:8', 'n:6'] },
        { a: 'seven', o: ['k:7:⭐ ~ 7 ngôi sao', 'k:4:⭐ ~ 4 ngôi sao', 'k:10:⭐ ~ 10 ngôi sao'] },
        { pic: 'k:5:🎈 ~ 5 quả bóng bay', o: ['s:five', 's:nine', 's:two'] } ] } ] },
    2: { hd: 'Con nhìn tranh rồi chọn chữ đúng.', diem: [
      { ten: 'Đồ dùng học tập', cau: [
        { pic: 'e:📏 ~ cây thước kẻ', o: ['t:ruler', 't:rubber', 't:pencil'] },
        { pic: 'e:🎒 ~ chiếc cặp sách', o: ['t:bag', 't:book', 't:desk'] },
        { a: 'pencil', o: ['e:✏️ ~ bút chì', 'x ~ cục tẩy', 'e:📏 ~ thước kẻ'] } ] },
      { ten: 'Đồ ăn, đồ uống', cau: [
        { pic: 'e:🥚 ~ quả trứng', o: ['t:egg', 't:milk', 't:cake'] },
        { pic: 'e:🍌 ~ nải chuối', o: ['t:banana', 't:bread', 't:apple'] },
        { a: 'juice', o: ['e:🧃 ~ cốc nước cam', 'e:🥛 ~ cốc sữa', 'e:🍞 ~ ổ bánh mì'] } ] },
      { ten: 'Cơ thể, quần áo', cau: [
        { pic: 'e:👃 ~ cái mũi', o: ['t:nose', 't:mouth', 't:ear'] },
        { pic: 'e:👟 ~ đôi giày', o: ['t:shoes', 't:socks', 't:hat'] },
        { a: 'hand', o: ['e:✋ ~ bàn tay', 'e:🦶 ~ bàn chân', 'e:💪 ~ cánh tay'] } ] } ] },
    3: { hd: 'Con đọc (hoặc bấm loa nghe) câu giải thích, rồi chọn tranh đúng.', diem: [
      { ten: 'Nơi chốn', cau: [
        { q: 'You go here when you are ill. Doctors and nurses work here.', a: '=q', o: ['f:hospital ~ bệnh viện', 'f:park ~ công viên', 'e:📚 ~ thư viện', 'e:🎬 ~ rạp chiếu phim'] },
        { q: 'You can borrow books here.', a: '=q', o: ['e:📚 ~ thư viện', 'f:shop ~ chợ', 'e:🏊 ~ bể bơi', 'e:🚉 ~ nhà ga'] },
        { pic: 'e:🎬 ~ rạp chiếu phim', o: ['t:cinema', 't:café', 't:bus station'] } ] },
      { ten: 'Nghề nghiệp', cau: [
        { q: 'This person cooks food in a restaurant.', a: '=q', o: ['f:chef ~ đầu bếp', 'e:🧑‍🌾 ~ nông dân', 'e:🧑‍✈️ ~ phi công', 'e:🧑‍⚕️ ~ y tá'] },
        { q: 'This person drives a bus or a taxi.', a: '=q', o: ['f:driver ~ tài xế', 'e:🤡 ~ chú hề', 'f:doctor ~ bác sĩ', 'e:🧑‍🌾 ~ nông dân'] },
        { pic: 'e:🧑‍🌾🐄 ~ bác nông dân cạnh đàn bò', o: ['t:farmer', 't:nurse', 't:clown'] } ] },
      { ten: 'Thời tiết, thiên nhiên', cau: [
        { q: 'It is white and cold. It falls from the sky in winter.', a: '=q', o: ['e:❄️ ~ tuyết', 'e:🌧️ ~ mưa', 'e:🌬️ ~ gió', 'e:☀️ ~ nắng'] },
        { q: 'It is long and full of water. Boats can go on it.', a: '=q', o: ['e:🏞️ ~ dòng sông', 'e:⛰️ ~ ngọn núi', 'e:🏝️ ~ hòn đảo', 'e:🌾 ~ cánh đồng'] },
        { pic: 'e:🌬️🌳 ~ cây nghiêng, lá bay', o: ['t:windy', 't:cloudy', 't:sunny'] } ] } ] },
    4: { hd: 'Con đọc câu và chọn từ đúng cho chỗ trống.', diem: [
      { ten: 'Động từ', cau: [
        { q: "Can I ___ your pen? I forgot mine.", pic: 'e:🧒🖊️👧 ~ hai bạn ngồi bàn học', o: ['t:borrow', 't:invite', 't:climb'] },
        { q: 'We ___ all our friends to the party.', pic: 'e:💌🎂 ~ thiệp mời sinh nhật', o: ['t:invited', 't:forgot', 't:dropped'] },
        { a: 'What is he doing?', pic: 'e:🧒🌳 ~ cậu bé leo cây', o: ['t:climbing', 't:carrying', 't:collecting'] } ] },
      { ten: 'Tính từ', cau: [
        { q: "Don't swim in that river. It's very ___.", pic: 'e:🏞️🚫 ~ dòng sông có biển cấm bơi', o: ['t:dangerous', 't:quiet', 't:delicious'] },
        { q: 'Please be ___ in the library.', pic: 'e:📚🤫 ~ thư viện', o: ['t:quiet', 't:heavy', 't:brave'] },
        { pic: 'ch:leo:🧳 ~ Leo kéo chiếc vali to, mồ hôi nhễ nhại', o: ['t:heavy', 't:empty', 't:soft'] } ] },
      { ten: 'Từ chỉ thời gian', cau: [
        { q: "I've ___ finished my homework, so I can play now.", pic: 'e:📒✅ ~ vở bài tập đã xong', o: ['t:already', 't:never', 't:yet'] },
        { q: 'We went to the beach ___ year.', pic: 'e:🏖️🫂 ~ ảnh cả nhà ở bãi biển', o: ['t:last', 't:next', 't:ago'] },
        { q: "We have lunch ___ twelve o'clock.", pic: 'clock:12:00+e:🍱 ~ đồng hồ 12:00 cạnh bàn ăn', o: ['t:at', 't:on', 't:in'] } ] } ] }
  }
};

/* ---------- Nghe ---------- */
KT.EN.NG = {
  ten: 'Nghe', o: 'cx_o_quiz', lang: 'en', dan: 'anna',
  thu: { a: 'cat', o: ['f:meo ~ con mèo', 'f:cun ~ con chó', 'e:🐟 ~ con cá'] },
  bac: {
    1: { hd: 'Con nghe câu rồi chạm vào tranh đúng nhé.', diem: [
      { ten: 'Vị trí: in, on, under', cau: [
        { a: [['me', 'Put the ball under the chair.']], o: ['e:🪑⚽ ~ quả bóng ở dưới ghế', 'e:🍽️⚽ ~ quả bóng ở dưới gầm bàn', 'e:📦⚽ ~ quả bóng ở trong hộp'] },
        { a: [['me', 'Put the cat in the box.']], o: ['e:📦🐈 ~ con mèo ở trong hộp', 'e:🪑🐈 ~ con mèo ở dưới ghế', 'e:🍽️🐈 ~ con mèo ở trên bàn'] },
        { pic: 'e:🍽️🦆 ~ con vịt đứng trên bàn', o: ['s:The duck is on the table.', 's:The duck is under the table.', 's:The duck is in the bag.'] } ] },
      { ten: 'Màu và đồ vật', cau: [
        { k: 'mau', a: [['me', 'Colour the kite blue.']], vat: ['e:🪁 ~ con diều', 'e:🚗 ~ ô tô', 'e:🍎 ~ quả táo'], dap: [0, 'blue'] },
        { k: 'mau', a: [['me', 'Colour the car red.']], vat: ['e:🪁 ~ con diều', 'e:🚗 ~ ô tô', 'e:🎩 ~ cái mũ'], dap: [1, 'red'] },
        { pic: 'ch:leo+c:green:🧢 ~ Leo đội mũ xanh lá', o: ['s:Leo has got a green hat.', 's:Leo has got a red hat.', 's:Leo has got a green bag.'] } ] },
      { ten: 'Đồ chơi (have got)', cau: [
        { a: [['leo', "I've got a robot!"]], o: ['e:🤖 ~ rô-bốt', 'e:🚂 ~ tàu hỏa', 'e:🪆 ~ búp bê'] },
        { a: [['me', 'Look! Leo has got a train.']], o: ['ch:leo:🚂 ~ Leo cầm tàu hỏa', 'ch:leo:⚽ ~ Leo cầm quả bóng', 'ch:leo:🧸 ~ Leo cầm gấu bông'] },
        { pic: 'ch:anna:🪆 ~ Anna ôm búp bê', o: ['s:Anna has got a doll.', 's:Anna has got a ball.', 's:Anna has got a car.'] } ] } ] },
    2: { hd: 'Con nghe các bạn nói chuyện rồi chọn tranh đúng.', diem: [
      { ten: 'Tên và mô tả người', cau: [
        { q: 'Where is Anna?', a: [['bo', "Who's that girl with the long hair?"], ['me', "That's Anna. She's reading a book."]], o: ['e:👧📖 ~ cô bé tóc dài đang đọc sách', 'e:👧📗 ~ cô bé tóc ngắn đang đọc sách', 'e:👧⚽ ~ cô bé tóc dài đang đá bóng'] },
        { q: 'Where is Tom?', a: [['me', 'And the boy with the apple?'], ['bo', 'His name is Tom.']], o: ['e:👦🍎 ~ cậu bé đang ăn táo', 'e:👦🍌 ~ cậu bé cầm chuối', 'e:👦⚽ ~ cậu bé cầm bóng'] },
        { pic: 'e:👧🌳 ~ cô bé đội mũ đỏ ngồi dưới gốc cây', o: ['s:Sam is sitting under the tree.', 's:Sam is standing next to the tree.', 's:Sam is sitting in the car.'] } ] },
      { ten: 'Đang làm gì (-ing)', cau: [
        { a: [['me', 'Is your brother playing football?'], ['leo', "No, he isn't. He's swimming."], ['anna', 'What is the brother doing?']], o: ['e:🏊 ~ đang bơi', 'e:⚽ ~ đang đá bóng', 'e:📖 ~ đang đọc sách'] },
        { a: [['bo', "What's Lucy doing?"], ['me', "She's painting a picture of her cat."], ['anna', 'What is Lucy doing?']], o: ['e:🎨🐈 ~ đang vẽ tranh con mèo', 'e:👧🐈 ~ đang chơi với mèo', 'e:🎤 ~ đang hát'] },
        { pic: 'ch:gau:🍰 ~ Gấu con đang ăn bánh', o: ['s:The bear is eating.', 's:The bear is sleeping.', 's:The bear is running.'] } ] },
      { ten: 'Số và đánh vần', cau: [
        { a: [['bo', 'How old is your sister?'], ['me', "She's seven."], ['anna', 'How old is the sister?']], o: ['n:7', 'n:8', 'n:11'] },
        { a: [['me', "What's your cat's name?"], ['leo', 'Kim. K, I, M.'], ['anna', "What's the cat's name?"]], o: ['t:Kim', 't:Tim', 't:Kit'] },
        { pic: 'k:9:📘 ~ 9 cuốn sách trên bàn', o: ['s:There are nine books.', 's:There are five books.', 's:There are six books.'] } ] } ] },
    3: { hd: 'Con nghe hết đoạn hội thoại rồi mới chọn nhé. Có bạn đổi ý giữa chừng đấy!', diem: [
      { ten: 'Ngày và giờ', cau: [
        { a: [['bo', 'Do you have swimming lessons on Monday, Mary?'], ['anna', 'No, on Monday I have music. I go swimming on Wednesday.'], ['me', 'When does Mary go swimming?']], o: ['cal:WED ~ lịch khoanh Thứ Tư', 'cal:MON ~ lịch khoanh Thứ Hai', 'cal:FRI ~ lịch khoanh Thứ Sáu'] },
        { a: [['me', 'What time do you get up, Ben?'], ['leo', "At seven o'clock... no, at half past seven on school days."], ['me', 'What time does Ben get up?']], o: ['clock:7:30', 'clock:7:00', 'clock:8:30'] },
        { pic: 'e:🧒⚽+cal:SAT ~ cậu bé đá bóng, lịch ghi SATURDAY', o: ['s:He plays football on Saturdays.', 's:He plays football on Sundays.', 's:He plays tennis on Saturdays.'] } ] },
      { ten: 'Việc đã làm (quá khứ)', cau: [
        { a: [['me', 'What did you do yesterday, Sam?'], ['leo', 'I went to the zoo with Grandpa. We saw a big crocodile!'], ['me', 'Where did Sam go yesterday?']], o: ['f:zoo ~ sở thú', 'e:🏖️ ~ bãi biển', 'e:🎬 ~ rạp chiếu phim'] },
        { a: [['bo', 'Did you watch TV last night, Lily?'], ['anna', "No, I didn't. I read a comic."], ['me', 'What did Lily do last night?']], o: ['e:📖💥 ~ đọc truyện tranh', 'e:📺 ~ xem TV', 'e:🎮 ~ chơi game'] },
        { pic: 'e:👧🏖️ ~ Mary xây lâu đài cát trên bãi biển', o: ['s:Mary went to the beach.', 's:Mary went to the market.', 's:Mary went to the farm.'] } ] },
      { ten: 'Vị trí đồ vật', cau: [
        { a: [['leo', "Mum, where's my jacket?"], ['me', "Is it next to the door? No, look, it's behind the sofa."], ['bo', 'Where is the jacket?']], o: ['e:🛋️🧥 ~ áo khoác ở sau ghế sofa', 'e:🚪🧥 ~ áo khoác ở cạnh cửa', 'e:🛏️🧥 ~ áo khoác ở trên giường'] },
        { a: [['me', "Where's the kitten?"], ['bo', "It's between the two boxes."], ['me', 'Where is the kitten?']], o: ['e:📦🐈📦 ~ mèo con ở giữa hai cái hộp', 'e:🐈📦 ~ mèo con ở trên hộp', 'e:📦🐈 ~ mèo con ở sau hộp'] },
        { pic: 'e:☂️ ~ cái ô dựa cạnh tủ lạnh', o: ['s:The umbrella is next to the fridge.', 's:The umbrella is in the fridge.', 's:The umbrella is behind the door.'] } ] } ] },
    4: { hd: 'Con nghe kỹ lý do và kế hoạch của các bạn rồi chọn tranh đúng.', diem: [
      { ten: 'Kế hoạch (going to)', cau: [
        { a: [['bo', 'What are you going to do this weekend, Emma?'], ['anna', "I wanted to go camping, but it's going to rain. So I'm going to visit my aunt."], ['me', 'What is Emma going to do?']], o: ['e:👩👧🏠 ~ đến thăm cô', 'e:⛺ ~ đi cắm trại', 'e:🏊 ~ đi bơi'] },
        { a: [['me', 'Are you going to fly to Da Nang?'], ['bo', "Not this time. It's cheaper by train, so we're going to take the train."], ['me', 'How are they going to travel?']], o: ['f:train ~ tàu hỏa', 'f:plane ~ máy bay', 'f:bus ~ xe buýt'] },
        { pic: 'e:👧🚲💭 ~ cô bé đội mũ bảo hiểm cạnh xe đạp, bóng nghĩ "tomorrow"', o: ["s:She's going to ride her bike tomorrow.", 's:She rode her bike yesterday.', "s:She's going to buy a new bike."] } ] },
      { ten: 'Lý do (why, because)', cau: [
        { a: [['me', "Why didn't you come to school yesterday, Peter?"], ['leo', 'I had a terrible toothache, so I went to the dentist.'], ['me', "Why didn't Peter go to school?"]], o: ['f:dentist ~ đau răng, đi nha sĩ', 'e:🤒🛏️ ~ bị sốt, nằm ở nhà', 'e:👵🏡 ~ về quê thăm bà'] },
        { a: [['bo', 'Why is Sophia so happy today?'], ['me', 'She won a prize in the drawing competition.'], ['bo', 'Why is Sophia happy?']], o: ['e:🏆🎨 ~ cầm cúp giải vẽ', 'e:🎂 ~ có bánh sinh nhật', 'e:🐶🎁 ~ được tặng chó con'] },
        { pic: 'e:🧒💦🌂 ~ cậu bé ướt sũng, ô gập trong tay', o: ["s:He's wet because he didn't open his umbrella.", "s:He's wet because he went swimming.", "s:He's happy because it's sunny."] } ] },
      { ten: 'So sánh', cau: [
        { a: [['me', 'Which one is your brother?'], ['anna', "He's the tallest boy. The one with glasses."], ['me', 'Which boy is the brother?']], o: ['e:🧑👓 ~ cậu cao nhất, đeo kính', 'e:🧑 ~ cậu cao nhất, không đeo kính', 'e:👦👓 ~ cậu thấp, đeo kính'] },
        { a: [['bo', 'Which bag is the cheapest?'], ['me', 'The green one is cheaper than the red one, but the blue one is the cheapest.']], o: ['c:blue:👜 ~ túi xanh dương', 'c:green:👜 ~ túi xanh lá', 'c:red:👜 ~ túi đỏ'] },
        { pic: 'e:🐕🐕🐕 ~ 3 con chó to dần: trắng nhỏ nhất, nâu vừa, đen to nhất', o: ['s:The white dog is the smallest.', 's:The white dog is the biggest.', 's:The black dog is the smallest.'] } ] } ] }
  }
};

/* ---------- Đọc ---------- */
KT.EN.DO = {
  ten: 'Đọc', o: 'cx_o_story', lang: 'en', dan: 'anna',
  /* 2 câu kiểm tra nhận chữ, không tính điểm */
  kiemTra: [
    { pic: 'f:cun ~ con chó', o: ['t:dog', 't:bed', 't:sun'] },
    { pic: 'e:🍎 ~ quả táo', o: ['t:apple', 't:egg', 't:bus'] } ],
  thu: { pic: 'e:☀️ ~ mặt trời', o: ['t:sun', 't:bus', 't:hat'] },
  truyen: {
    1: "Last Saturday, Ben and his dad went to the mountains. They wanted to see a waterfall. It was a long walk, and Ben's legs were tired, but he didn't stop. When they arrived, the waterfall was enormous and very loud. Ben took lots of photos. \"That was the best day ever!\" he said.",
    2: "Yesterday was Emma's first day at a new school. In the morning she felt nervous because she didn't know anyone. In the art lesson, a girl called Zoe lent her some colouring pens. At lunchtime they sat together and talked about their favourite animals. Now Emma has a new friend.",
    3: "Sam's kite got stuck in a tall tree. He couldn't reach it. His grandma brought a ladder and helped him. Sam said thank you and gave her a big hug."
  },
  bac: {
    1: { ten: 'Tiền đọc viết', hd: 'Con nghe cô đọc rồi chạm vào chữ đúng nhé.', diem: [
      { ten: 'Nhận mặt chữ cái', cau: [
        { a: 'Touch the letter B.', o: ['t:b', 't:d', 't:p'] },
        { a: 'Touch the letter M.', o: ['t:m', 't:n', 't:w'] },
        { pic: 'L:s', o: ['s:S', 's:C', 's:Z'] } ] },
      { ten: 'Âm đầu', cau: [
        { a: 'Sun. Which letter does sun start with?', pic: 'e:☀️ ~ mặt trời', o: ['t:s', 't:m', 't:t'] },
        { a: 'Fish. Which letter does fish start with?', pic: 'e:🐟 ~ con cá', o: ['t:f', 't:v', 't:h'] },
        { a: 'Which picture starts with this letter?', pic: 'L:b', o: ['e:⚽ ~ quả bóng', 'f:meo ~ con mèo', 'e:🥤 ~ cái cốc'] } ] },
      { ten: 'Nhận từ quen', cau: [
        { pic: 'f:meo ~ con mèo', o: ['t:cat', 't:cap', 't:cot'] },
        { pic: 'e:👒 ~ chiếc mũ', o: ['t:hat', 't:hot', 't:hut'] },
        { pic: 'L:pig', o: ['e:🐖 ~ con lợn', 'e:🖊️ ~ cái bút', 'e:🥤 ~ cái cốc'] } ] } ] },
    2: { hd: 'Con đọc câu. Đúng với tranh thì chạm 👍, sai thì chạm 👎.', diem: [
      { ten: 'This is / These are', cau: [
        { k: 'dungsai', q: 'This is a chair.', pic: 'x ~ một cái bàn', dap: false },
        { k: 'dungsai', q: 'These are apples.', pic: 'k:3:🍎 ~ ba quả táo', dap: true },
        { pic: 'f:cun+f:cun ~ hai con chó', o: ['t:These are dogs.', 't:This is a dog.', 't:These are cats.'] } ] },
      { ten: 'Vị trí trong tranh', cau: [
        { k: 'dungsai', q: 'The cat is under the table.', pic: 'x ~ phòng khách: mèo dưới bàn, sách trên ghế, bóng trong hộp', dap: true },
        { k: 'dungsai', q: 'The book is in the box.', pic: 'x ~ phòng khách: mèo dưới bàn, sách trên ghế, bóng trong hộp', dap: false },
        { pic: 'x ~ phòng khách: mèo dưới bàn, sách trên ghế, bóng trong hộp (khoanh quả bóng)', o: ['t:The ball is in the box.', 't:The ball is on the box.', 't:The ball is under the box.'] } ] },
      { ten: 'can / has got', cau: [
        { k: 'dungsai', q: 'Anna can jump.', pic: 'ch:anna:🪢 ~ Anna đang nhảy dây', dap: true },
        { k: 'dungsai', q: 'Leo has got a hat.', pic: 'ch:leo:⚽ ~ Leo đầu trần, cầm quả bóng', dap: false },
        { pic: 'e:🐦 ~ con chim đang bay', o: ['t:The bird can fly.', "t:The bird can't fly.", 't:The fish can fly.'] } ] } ] },
    3: { hd: 'Con đọc và chọn câu trả lời đúng.', diem: [
      { ten: 'Điền từ vào đoạn ngắn', cau: [
        { q: 'Lily lives near the ___. She can see boats from her window.', pic: 'e:🏠🏞️⛵ ~ ngôi nhà cạnh sông', o: ['t:river', 't:cinema', 't:farm'] },
        { q: 'On Sundays, Tom helps his grandpa on the ___. They feed the cows and the sheep.', pic: 'e:👴🧒🐄 ~ ông và cháu với đàn bò', o: ['t:farm', 't:hospital', 't:library'] },
        { pic: 'e:🍎🍊🛒 ~ khu chợ hoa quả đông người', o: ['ts:People are buying fruit at the market.', 'ts:People are watching a film at the cinema.', 'ts:People are reading at the library.'] } ] },
      { ten: 'Hỏi – đáp', cau: [
        { q: 'Where do you live?', o: ['t:In a flat in the city.', 't:Yes, I do.', "t:At eight o'clock."] },
        { q: 'Would you like some water?', o: ['t:Yes, please.', "t:I'm nine.", "t:It's blue."] },
        { a: "What's the matter?", pic: 'ch:anna:🤕 ~ Anna ôm đầu', o: ["t:I've got a headache.", "t:It's Monday.", 't:On the table.'] } ] },
      { ten: 'Hiểu câu (because, when)', cau: [
        { q: "Jack is hungry because he didn't have breakfast.\nWhy is Jack hungry?", o: ["t:He didn't eat breakfast.", 't:He is ill.', 't:He is tired.'] },
        { q: 'When it rains, Mia stays at home and reads books.\nWhat does Mia do on rainy days?', o: ['t:She reads at home.', 't:She plays football.', 't:She goes swimming.'] },
        { pic: 'ch:leo:☔ ~ Leo mặc áo mưa, đi ủng, trời mưa', o: ["ts:Leo is wearing boots because it's raining.", "ts:Leo is wearing a hat because it's sunny.", "ts:Leo is at home because it's raining."] } ] } ] },
    4: { hd: 'Con đọc truyện ngắn rồi trả lời câu hỏi.', diem: [
      { ten: 'Ý chính của truyện', cau: [
        { truyen: 1, q: 'What is the story about?', o: ['t:A trip to see a waterfall.', 't:A football match.', 't:A birthday party.'] },
        { truyen: 2, q: 'What is the story about?', o: ["t:Emma's first day at a new school.", "t:Emma's holiday.", 't:A trip to the zoo.'] },
        { truyen: 3, docTo: true, pic: 'e:🪁🌳👵🧒 ~ Sam, cái diều mắc trên cây cao, bà mang thang tới', q: 'What is the best title?', o: ['t:Grandma Saves the Kite', "t:Sam's New Bike", 't:A Day at the Beach'] } ] },
      { ten: 'Chi tiết', cau: [
        { truyen: 1, q: 'Who went to the mountains with Ben?', o: ['t:His dad.', 't:His mum.', 't:His teacher.'] },
        { truyen: 2, q: 'What did Zoe lend Emma?', o: ['t:Colouring pens.', 't:A book.', 't:A sandwich.'] },
        { truyen: 3, docTo: true, pic: 'e:🪁🌳👵🧒 ~ Sam, cái diều mắc trên cây cao, bà mang thang tới', q: 'What did Grandma bring?', o: ['t:A ladder.', 't:A new kite.', 't:A box.'] } ] },
      { ten: 'Suy luận', cau: [
        { truyen: 1, q: 'How did Ben feel at the end?', o: ['t:Happy.', 't:Bored.', 't:Angry.'] },
        { truyen: 2, q: 'Why was Emma nervous?', o: ["t:She didn't know anyone.", 't:She was late.', 't:She was ill.'] },
        { truyen: 3, docTo: true, pic: 'e:🪁🌳👵🧒 ~ Sam, cái diều mắc trên cây cao, bà mang thang tới', q: "How did Sam feel about Grandma's help?", o: ['t:Thankful.', 't:Scared.', 't:Angry.'] } ] } ] }
  }
};

/* ---------- Viết ---------- */
KT.EN.VI = {
  ten: 'Viết', o: 'cx_o_puzzle', lang: 'en', dan: 'anna',
  thu: { k: 'xep', pic: 'e:☀️ ~ mặt trời', the: ['u', 's', 'n'], dap: ['sun'] },
  bac: {
    1: { ten: 'Tiền đọc viết', hd: 'Con chọn chữ cái còn thiếu, hoặc xếp chữ thành từ.', diem: [
      { ten: 'Chữ đầu', cau: [
        { q: '_ i s h', pic: 'e:🐟 ~ con cá', o: ['t:f', 't:s', 't:d'] },
        { q: '_ u n', pic: 'e:☀️ ~ mặt trời', o: ['t:s', 't:r', 't:b'] },
        { q: '_ e d', a: 'bed', o: ['t:b', 't:d', 't:p'] } ] },
      { ten: 'Chữ giữa', cau: [
        { q: 'c _ t', pic: 'f:meo ~ con mèo', o: ['t:a', 't:o', 't:u'] },
        { q: 'd _ g', pic: 'f:cun ~ con chó', o: ['t:o', 't:a', 't:i'] },
        { q: 'b _ s', a: 'bus', o: ['t:u', 't:a', 't:e'] } ] },
      { ten: 'Xếp chữ thành từ', cau: [
        { k: 'xep', pic: 'e:🐖 ~ con lợn', the: ['g', 'p', 'i'], dap: ['pig'] },
        { k: 'xep', pic: 'e:👒 ~ chiếc mũ', the: ['t', 'a', 'h'], dap: ['hat'] },
        { k: 'xep', a: 'red', the: ['d', 'r', 'e'], dap: ['red'] } ] } ] },
    2: { hd: 'Con xếp chữ hoặc gõ từ còn thiếu.', diem: [
      { ten: 'Chính tả từ', cau: [
        { k: 'xep', pic: 'e:🐒 ~ con khỉ', the: ['y', 'k', 'e', 'n', 'o', 'm'], dap: ['monkey'] },
        { k: 'xep', pic: 'e:🏡🌷 ~ khu vườn', the: ['d', 'n', 'a', 'g', 'e', 'r'], dap: ['garden'] },
        { k: 'go', a: 'sheep', goiY: '_ _ _ _ _', dap: ['sheep'] } ] },
      { ten: 'Trả lời bằng 1 từ', cau: [
        { k: 'go', q: 'How many balls has Leo got?', pic: 'ch:leo+k:3:⚽ ~ Leo ôm 3 quả bóng', dap: ['three', '3'] },
        { k: 'go', q: 'What is Leo eating?', pic: 'ch:leo:🍦 ~ Leo ăn kem', dap: ['ice cream', 'icecream', 'an ice cream', 'ice-cream', 'an icecream'] },
        { k: 'go', a: 'What colour is the chair?', pic: 'ch:anna+c:red:🪑 ~ Anna ngồi trên ghế đỏ', dap: ['red'] } ] },
      { ten: 'Chép từ vào chỗ trống', cau: [
        { k: 'go', q: 'A ___ lives in the sea. It can swim.', hop: ['fish', 'bird', 'cow'], dap: ['fish'] },
        { k: 'go', q: 'You can sit on a ___.', hop: ['chair', 'apple', 'door'], dap: ['chair'] },
        { k: 'go', a: 'I drink milk every morning.', q: 'I drink ___ every morning.', dap: ['milk'] } ] } ] },
    3: { hd: 'Con kéo thẻ từ thành câu, hoặc gõ câu trả lời.', diem: [
      { ten: 'Xếp câu kể', cau: [
        { k: 'xep', the: ['likes', 'Tom', 'football', 'playing'], dap: ['Tom likes playing football'] },
        { k: 'xep', the: ['is', 'the bed', 'sleeping', 'The cat', 'under'], dap: ['The cat is sleeping under the bed'] },
        { k: 'xep', a: 'We went to the park yesterday.', the: ['went', 'yesterday', 'We', 'to the park'], dap: ['We went to the park yesterday'] } ] },
      { ten: 'Xếp câu hỏi', cau: [
        { k: 'xep', the: ['you', 'Can', 'swim', '?'], dap: ['Can you swim ?'] },
        { k: 'xep', the: ['does', 'Where', 'live', 'she', '?'], dap: ['Where does she live ?'] },
        { k: 'xep', a: 'What did you eat?', the: ['eat', 'What', 'you', 'did', '?'], dap: ['What did you eat ?'] } ] },
      { ten: 'Trả lời bằng cụm từ', cau: [
        { k: 'go', tuKhoa: true, q: 'Where are the children?', pic: 'e:🧒⚽🧒🌳 ~ hai bạn đá bóng ở công viên', dap: ['park'] },
        { k: 'go', tuKhoa: true, q: 'What is Mum doing?', pic: 'e:👩‍🍳 ~ mẹ nấu ăn trong bếp', dap: ['cook'] },
        { k: 'go', tuKhoa: true, a: "What's the weather like?", pic: 'e:🌧️ ~ trời mưa to', dap: ['rain'] } ] } ] },
    4: { hd: 'Con xếp câu, gõ động từ, rồi viết vài câu về tranh.', diem: [
      { ten: 'Câu có because / but', cau: [
        { k: 'xep', the: ['because', 'Mia', 'she was ill', 'stayed at home'], dap: ['Mia stayed at home because she was ill'] },
        { k: 'xep', the: ['but', 'It was cold', 'went swimming', 'we'], dap: ['It was cold but we went swimming'] },
        { k: 'xep', a: "I couldn't go out because it was raining.", the: ['because', "I couldn't go out", 'it was raining'], dap: ["I couldn't go out because it was raining"] } ] },
      { ten: 'Động từ quá khứ', cau: [
        { k: 'go', q: 'Yesterday I ___ (go) to the market.', dap: ['went'] },
        { k: 'go', q: 'Last week we ___ (see) a rainbow.', dap: ['saw'] },
        { k: 'go', a: 'She bought a new bag.', q: 'She ___ a new bag.', dap: ['bought'] } ] },
      { ten: 'Viết câu tự do (giáo viên chấm)', tuDo: true, cau: [
        { k: 'tudo', q: 'Write 1 or 2 sentences about the picture.', pic: 'e:🫂🧺🐕⚽ ~ cả nhà picnic bên hồ, chó chạy theo quả bóng' },
        { k: 'tudo', q: 'Write 1 or 2 sentences about the picture.', pic: 'e:🧑‍🍳🧁 ~ lớp học làm bánh, bột bay tung tóe' },
        { k: 'tudo', q: 'What happened? Write 1 or 2 sentences.', pic: 'e:🧒⚽🪟💥 ~ tranh 2 khung: cậu bé đá bóng, cửa kính vỡ' } ] } ] }
  }
};

/* ---------- Nói (ghi âm, giáo viên chấm) ---------- */
KT.EN.NO = {
  ten: 'Nói', o: 'cx_o_speak', lang: 'en', dan: 'anna',
  bac: {
    1: [
      { id: 'E-NO-1-1', ten: 'Gọi tên đồ vật', dat: 'Gọi đúng cả 3 từ, phát âm rõ', goiY: 'Is it an apple or a banana?', buoc: [
        { pic: 'e:🍎 ~ quả táo', a: "What's this?", giay: 8 },
        { pic: 'f:cun ~ con chó', a: "What's this?", giay: 8 },
        { pic: 'e:⚽ ~ quả bóng', a: "What's this?", giay: 8 } ] },
      { id: 'E-NO-1-2', ten: 'Nói màu', dat: '"Blue" hoặc "It\'s blue"', goiY: 'Is it blue or red?', buoc: [
        { pic: 'c:blue ~ quả bóng xanh dương', a: 'What colour is it?', giay: 10 } ] },
      { id: 'E-NO-1-3', ten: 'Tên và tuổi', dat: 'Nói được tên và tuổi bằng câu', goiY: 'My name is...', buoc: [
        { pic: 'ch:anna ~ Anna vẫy tay', a: "What's your name? How old are you?", giay: 15 } ] } ],
    2: [
      { id: 'E-NO-2-1', ten: 'Trả lời về tranh', dat: 'Trả lời đúng cả 2, có câu ngắn', goiY: 'Count the birds with me: one...', buoc: [
        { pic: 'k:3:🐦+c:yellow:🪁+f:cun ~ công viên: 3 con chim, cánh diều vàng, chó nâu đuổi bóng', a: 'How many birds can you see? What colour is the kite?', giay: 20 } ] },
      { id: 'E-NO-2-2', ten: 'Tả con chó', dat: '2 ý trở lên (màu, kích thước, đang làm gì)', goiY: 'Is the dog big or small? What is it doing?', buoc: [
        { pic: 'f:cun ~ con chó nâu trong công viên', a: 'Tell me about the dog.', giay: 20 } ] },
      { id: 'E-NO-2-3', ten: 'Nói về mình', dat: 'Trả lời cả 2 bằng câu', goiY: 'Do you like ice cream?', buoc: [
        { a: "What's your favourite food? Have you got a pet?", giay: 20 } ] } ],
    3: [
      { id: 'E-NO-3-1', ten: 'Kể chuyện 3 tranh', dat: 'Kể đủ 3 khung, có "but" / "so"', goiY: "What's the weather like in picture 2?", buoc: [
        { pic: 'e:🧒⚽+e:🌧️+e:🧩 ~ 3 khung: Sam muốn đá bóng, trời mưa, Sam chơi xếp hình trong nhà', a: 'This is Sam. He wants to play football. Tell me the story.', giay: 45 } ] },
      { id: 'E-NO-3-2', ten: 'Gia đình', dat: 'Nói số người và gọi tên vai (mum, dad...)', goiY: 'Have you got a brother or a sister?', buoc: [
        { a: 'How many people are there in your family? Who are they?', giay: 20 } ] },
      { id: 'E-NO-3-3', ten: 'Sau giờ học', dat: '2 hoạt động, thì hiện tại đúng', goiY: 'Do you play games or read books?', buoc: [
        { a: 'What do you do after school?', giay: 20 } ] } ],
    4: [
      { id: 'E-NO-4-1', ten: 'Kể chuyện 4 tranh', dat: 'Kể bằng thì quá khứ, đủ 4 khung, có nối ý', goiY: 'What happened to the bike?', buoc: [
        { pic: 'ch:leo:🚲+e:💥+ch:anna+e:🚲🚲 ~ 4 khung: Leo đạp xe, lốp xe xẹp, Anna mang bơm đến, hai bạn cùng đạp xe về', a: 'Look at the pictures and tell me the story.', giay: 45 } ] },
      { id: 'E-NO-4-2', ten: 'Cuối tuần qua', dat: '2 câu trở lên, quá khứ đúng', goiY: 'Did you go anywhere?', buoc: [
        { a: 'What did you do last weekend?', giay: 20 } ] },
      { id: 'E-NO-4-3', ten: 'Hỏi đường', dat: 'Đặt câu hỏi đúng, lịch sự', goiY: 'Start with: Excuse me...', buoc: [
        { pic: 'ch:leo+e:🏛️ ~ Leo đứng trước ngã tư, biển Library', a: 'Ask Leo where the library is.', giay: 15 } ] } ]
  }
};

/* ============================================================
   TIẾNG TRUNG
   ============================================================ */
KT.ZH = {};

/* ---------- Cổng sàng lọc ---------- */
KT.ZH.CONG = [
  { id: 'Z-G-1', a: '你好', o: ['f:hello ~ hai bạn vẫy tay chào nhau', 'e:😴 ~ bạn đang ngủ', 'e:🍚 ~ bạn đang ăn'] },
  { id: 'Z-G-2', a: '二', o: ['n:2', 'n:5', 'n:8'] },
  { id: 'Z-G-3', a: '妈妈', o: ['f:mom ~ mẹ', 'f:dad ~ bố', 'e:👶 ~ em bé'] }
];

/* ---------- Nghe + Từ vựng ---------- */
KT.ZH.NG = {
  ten: 'Nghe + Từ vựng', o: 'cx_o_quiz', lang: 'zh', dan: 'xm',
  thu: { a: '猫', o: ['f:meo ~ con mèo', 'f:cun ~ con chó', 'e:🐟 ~ con cá'] },
  bac: {
    1: { hd: 'Con nghe bạn Xiaomei nói rồi chạm vào tranh đúng nhé.', diem: [
      { ten: 'Chào hỏi, lịch sự', cau: [
        { a: '再见', o: ['f:goodbye ~ vẫy tay tạm biệt ở cửa', 'f:hello ~ hai bạn gặp nhau chào', 'e:🎁 ~ bạn nhận quà'] },
        { a: '谢谢', o: ['e:🎁🙇 ~ bạn nhận quà, cúi đầu', 'f:goodbye ~ vẫy tay tạm biệt', 'e:😴 ~ bạn đang ngủ'] },
        { pic: 'ch:bong+ch:xiaomei ~ Bông và Xiaomei gặp nhau, vẫy tay', o: ['s:你好', 's:再见', 's:不客气'] } ] },
      { ten: 'Gia đình', cau: [
        { a: '爸爸', o: ['f:dad ~ bố', 'f:mom ~ mẹ', 'e:👶 ~ em bé'] },
        { a: '哥哥', o: ['f:obro ~ anh trai', 'f:osis ~ chị gái', 'f:grandpa ~ ông'] },
        { pic: 'f:osis ~ chị gái (bạn gái lớn dắt em nhỏ)', o: ['s:姐姐', 's:妹妹', 's:妈妈'] } ] },
      { ten: 'Số đếm', cau: [
        { a: '五', o: ['n:5', 'n:2', 'n:9'] },
        { a: '八', o: ['k:8:⭐ ~ 8 ngôi sao', 'k:4:⭐ ~ 4 ngôi sao', 'k:1:⭐ ~ 1 ngôi sao'] },
        { pic: 'k:3:🍎 ~ 3 quả táo', o: ['s:三', 's:四', 's:十'] } ] } ] },
    2: { hd: 'Con nghe từ hoặc câu ngắn rồi chọn tranh đúng.', diem: [
      { ten: 'Màu sắc', cau: [
        { a: '红色', o: ['c:red ~ ô màu đỏ', 'c:blue ~ ô màu xanh dương', 'c:green ~ ô màu xanh lá'] },
        { a: '黄色', o: ['c:yellow ~ ô màu vàng', 'c:green ~ ô màu xanh lá', 'c:red ~ ô màu đỏ'] },
        { pic: 'c:blue ~ quả bóng xanh dương', o: ['s:蓝色', 's:绿色', 's:黑色'] } ] },
      { ten: 'Con vật, trái cây', cau: [
        { a: '狗', o: ['f:cun ~ con chó', 'f:meo ~ con mèo', 'e:🐟 ~ con cá'] },
        { a: '苹果', o: ['e:🍎 ~ quả táo', 'e:🍌 ~ quả chuối', 'e:🍇 ~ chùm nho'] },
        { pic: 'e:🍌 ~ nải chuối', o: ['s:香蕉', 's:草莓', 's:葡萄'] } ] },
      { ten: 'Câu đơn về bản thân', cau: [
        { a: '我五岁。', o: ['e:🎂+n:5 ~ bánh sinh nhật 5 nến', 'e:🎂+n:6 ~ bánh sinh nhật 6 nến', 'e:🎂+n:8 ~ bánh sinh nhật 8 nến'] },
        { a: '我喜欢猫。', o: ['ch:bong+f:meo ~ bé ôm mèo cười', 'ch:bong+f:cun ~ bé ôm chó', 'ch:bong:🧸 ~ bé ôm gấu bông'] },
        { pic: 'ch:xiaomei:🍎 ~ Xiaomei ăn táo', o: ['s:小美吃苹果。', 's:小美喝水。', 's:小美看书。'] } ] } ] },
    3: { hd: 'Con nghe câu. Đúng với tranh thì chạm ✔, sai thì chạm ✘. Có câu con nghe hai bạn nói chuyện rồi chọn tranh.', diem: [
      { ten: 'Thời tiết', cau: [
        { k: 'dungsai', a: '今天下雨了。', pic: 'e:☀️ ~ trời nắng to', dap: false },
        { a: [['bo', '今天天气怎么样？'], ['me', '很热。']], o: ['e:☀️🥵 ~ trời nắng nóng', 'e:🌧️ ~ trời mưa', 'e:❄️ ~ trời có tuyết'] },
        { pic: 'e:🌧️ ~ trời mưa', o: ['s:下雨了', 's:下雪了', 's:天气很好'] } ] },
      { ten: 'Hoạt động', cau: [
        { k: 'dungsai', a: '她在看书。', pic: 'ch:anna:📖 ~ bé gái đang đọc sách', dap: true },
        { a: [['me', '你在做什么？'], ['bo', '我在写字。']], o: ['e:✍️ ~ viết chữ', 'e:📖 ~ đọc sách', 'e:🎨 ~ vẽ tranh'] },
        { pic: 'ch:leo:🎮 ~ bé trai chơi game', o: ['s:他在玩游戏', 's:他在睡觉', 's:他在吃饭'] } ] },
      { ten: 'Ăn uống, nơi chốn', cau: [
        { k: 'dungsai', a: '我想喝牛奶。', pic: 'x ~ một ly nước lọc', dap: false },
        { a: [['bo', '你喜欢吃什么？'], ['me', '我喜欢吃米饭。']], o: ['e:🍚 ~ cơm', 'e:🍜 ~ mì', 'e:🍎 ~ táo'] },
        { pic: 'ch:leo:🎒+f:school ~ bé trai đeo cặp đi về phía trường', o: ['s:他去学校', 's:他回家', 's:他去商店'] } ] } ] },
    4: { hd: 'Con nghe hai bạn nói chuyện và câu hỏi, rồi chọn tranh đúng.', diem: [
      { ten: 'Thời gian', cau: [
        { a: [['bo', '你每天几点起床？'], ['me', '我早上七点起床。'], ['xm', '她几点起床？']], o: ['clock:7:00 ~ 7 giờ sáng', 'clock:9:00 ~ 9 giờ', 'clock:6:00 ~ 6 giờ'] },
        { a: [['me', '今天星期几？'], ['bo', '今天星期三。明天我们去公园。'], ['xm', '他们星期几去公园？']], o: ['cal:Thứ 5 ~ lịch khoanh Thứ Năm', 'cal:Thứ 4 ~ lịch khoanh Thứ Tư', 'cal:CN ~ lịch khoanh Chủ nhật'] },
        { pic: 'clock:9:00+e:🛏️🌙 ~ bé đi ngủ, đồng hồ 9 giờ tối', o: ['s:晚上九点我睡觉', 's:早上九点我起床', 's:下午五点我回家'] } ] },
      { ten: 'Nơi chốn, việc hằng ngày', cau: [
        { a: [['me', '你下午去哪儿？'], ['bo', '我去商店买水果。'], ['xm', '他下午去哪儿？']], o: ['f:shop ~ cửa hàng hoa quả', 'f:hospital ~ bệnh viện', 'f:school ~ trường học'] },
        { a: [['bo', '你妈妈在家吗？'], ['me', '不在，她在医院工作。'], ['xm', '妈妈在哪儿？']], o: ['f:hospital ~ bệnh viện', 'f:home ~ ở nhà', 'f:shop ~ cửa hàng'] },
        { pic: 'ch:leo:🎒+f:school ~ bé đeo cặp vẫy tay chào cô, đi ra cổng trường', o: ['s:他放学回家', 's:他去上课', 's:他去医院'] } ] },
      { ten: 'So sánh, lý do', cau: [
        { a: [['me', '哥哥高还是你高？'], ['bo', '哥哥比我高。'], ['xm', '谁高？']], o: ['e:🧑 ~ cậu anh (cao hơn)', 'e:👦 ~ cậu em (thấp hơn)', 'e:🧑🧑 ~ hai bạn cao bằng nhau'] },
        { a: [['bo', '你为什么不吃饭？'], ['me', '因为我不饿。'], ['xm', '她为什么不吃饭？']], o: ['e:🙅 ~ bé xoa bụng, lắc đầu (không đói)', 'e:🤒 ~ bé bị ốm nằm giường', 'e:😖🍲 ~ bé nhăn mặt chê món ăn'] },
        { pic: 'e:😋🍜 ~ bé ôm bụng đói, rồi ăn bát mì', o: ['s:因为我饿了，所以我吃面条', 's:因为我累了，所以我睡觉', 's:因为下雨了，所以我在家'] } ] } ] }
  }
};

/* ---------- Đọc (có pinyin) ---------- */
KT.ZH.DO = {
  ten: 'Đọc', o: 'cx_o_story', lang: 'zh', dan: 'xm',
  thu: { pic: 'e:🍎 ~ quả táo', o: ['t:苹果 / píngguǒ', 't:狗 / gǒu', 't:书 / shū'] },
  bac: {
    2: { hd: 'Con đọc từ. Đúng với tranh thì chạm ✔, sai thì chạm ✘.', diem: [
      { ten: 'Người', cau: [
        { k: 'dungsai', q: '老师 / lǎoshī', pic: 'f:teacher ~ cô giáo đứng trước bảng', dap: true },
        { k: 'dungsai', q: '妈妈 / māma', pic: 'f:dad ~ một người bố', dap: false },
        { pic: 'f:student ~ học sinh đeo cặp', o: ['t:学生 / xuésheng', 't:老师 / lǎoshī', 't:爸爸 / bàba'] } ] },
      { ten: 'Con vật, màu sắc', cau: [
        { k: 'dungsai', q: '猫 / māo', pic: 'f:meo ~ con mèo', dap: true },
        { k: 'dungsai', q: '红色 / hóngsè', pic: 'c:green:🍃 ~ chiếc lá xanh lá', dap: false },
        { pic: 'f:cun ~ con chó', o: ['t:狗 / gǒu', 't:猫 / māo', 't:鱼 / yú'] } ] },
      { ten: 'Đồ vật, đồ ăn', cau: [
        { k: 'dungsai', q: '书 / shū', pic: 'e:📕 ~ cuốn sách', dap: true },
        { k: 'dungsai', q: '米饭 / mǐfàn', pic: 'x ~ một ly nước lọc', dap: false },
        { pic: 'e:🍎 ~ quả táo', o: ['t:苹果 / píngguǒ', 't:水 / shuǐ', 't:书 / shū'] } ] } ] },
    3: { hd: 'Con đọc câu rồi chọn tranh, hoặc chọn câu trả lời đúng.', diem: [
      { ten: 'Đọc câu, chọn tranh', cau: [
        { q: '她在看书。 / Tā zài kàn shū.', o: ['ch:anna:📖 ~ bé gái đọc sách', 'ch:anna:✍️ ~ bé gái viết chữ', 'ch:anna:😴 ~ bé gái ngủ'] },
        { q: '今天很冷。 / Jīntiān hěn lěng.', o: ['e:🥶🧣 ~ trời lạnh, bé quàng khăn', 'e:☀️🥵 ~ trời nắng nóng', 'e:🌧️ ~ trời mưa'] },
        { pic: 'ch:leo:🥛 ~ bé trai uống nước', o: ['t:他在喝水。 / Tā zài hē shuǐ.', 't:他在吃饭。 / Tā zài chī fàn.', 't:他在睡觉。 / Tā zài shuìjiào.'] } ] },
      { ten: 'Hỏi – đáp', cau: [
        { q: '你叫什么名字？ / Nǐ jiào shénme míngzi?', o: ['t:我叫小美。 / Wǒ jiào Xiǎoměi.', 't:我七岁。 / Wǒ qī suì.', 't:我喜欢狗。 / Wǒ xǐhuan gǒu.'] },
        { q: '你家有几口人？ / Nǐ jiā yǒu jǐ kǒu rén?', o: ['t:我家有四口人。 / Wǒ jiā yǒu sì kǒu rén.', 't:我是学生。 / Wǒ shì xuésheng.', 't:今天星期一。 / Jīntiān xīngqīyī.'] },
        { a: '你喜欢什么颜色？', o: ['t:我喜欢红色。 / Wǒ xǐhuan hóngsè.', 't:我去学校。 / Wǒ qù xuéxiào.', 't:我很好。 / Wǒ hěn hǎo.'] } ] },
      { ten: 'Nơi chốn', cau: [
        { q: '老师在学校。 / Lǎoshī zài xuéxiào.', o: ['f:teacher+f:school ~ cô giáo ở trường', 'f:teacher+f:home ~ cô giáo ở nhà', 'f:teacher+f:shop ~ cô giáo ở cửa hàng'] },
        { q: '爸爸在家看电视。 / Bàba zài jiā kàn diànshì.', o: ['f:dad+e:📺 ~ bố xem TV ở nhà', 'f:dad+e:📰 ~ bố đọc báo', 'f:dad+e:💼 ~ bố đi làm'] },
        { pic: 'f:park ~ bé chơi cầu trượt ở công viên', o: ['t:我在公园。 / Wǒ zài gōngyuán.', 't:我在学校。 / Wǒ zài xuéxiào.', 't:我在家。 / Wǒ zài jiā.'] } ] } ] },
    4: { hd: 'Con chọn câu hoặc từ đúng cho chỗ trống.', diem: [
      { ten: 'Hoàn thành hội thoại', cau: [
        { q: 'A：你每天几点起床？\nNǐ měitiān jǐ diǎn qǐchuáng?\nB：____', o: ['t:我七点起床。 / Wǒ qī diǎn qǐchuáng.', 't:我去学校。 / Wǒ qù xuéxiào.', 't:我喜欢苹果。 / Wǒ xǐhuan píngguǒ.'] },
        { q: 'A：你周末喜欢做什么？\nNǐ zhōumò xǐhuan zuò shénme?\nB：____', o: ['t:我喜欢打球。 / Wǒ xǐhuan dǎ qiú.', 't:今天星期六。 / Jīntiān xīngqīliù.', 't:我九岁。 / Wǒ jiǔ suì.'] },
        { a: '你今天去哪儿？', o: ['t:我去公园。 / Wǒ qù gōngyuán.', 't:我很忙。 / Wǒ hěn máng.', 't:我吃饭了。 / Wǒ chī fàn le.'] } ] },
      { ten: 'Từ nối 因为 / 所以 / 但是', cau: [
        { q: '____我累了，所以我想睡觉。\n... wǒ lèi le, suǒyǐ wǒ xiǎng shuìjiào.', o: ['t:因为 / yīnwèi', 't:但是 / dànshì', 't:和 / hé'] },
        { q: '今天下雨了，____我们在家玩。\nJīntiān xià yǔ le, ... wǒmen zài jiā wán.', o: ['t:所以 / suǒyǐ', 't:因为 / yīnwèi', 't:也 / yě'] },
        { a: '我喜欢喝茶，但是不喜欢喝牛奶。', q: '我喜欢喝茶，____不喜欢喝牛奶。', o: ['t:但是 / dànshì', 't:所以 / suǒyǐ', 't:因为 / yīnwèi'] } ] },
      { ten: 'Từ chỉ việc, thời gian', cau: [
        { q: '我早上七点____。\nWǒ zǎoshang qī diǎn ...', o: ['t:起床 / qǐchuáng', 't:睡觉 / shuìjiào', 't:回家 / huí jiā'] },
        { q: '下课了，我们去外面____。\nXiàkè le, wǒmen qù wàimiàn ...', o: ['t:打球 / dǎ qiú', 't:上课 / shàngkè', 't:起床 / qǐchuáng'] },
        { q: '今天星期三，明天星期____。\nJīntiān xīngqīsān, míngtiān xīngqī ...', pic: 'cal:Thứ 4 ~ tờ lịch: hôm nay Thứ Tư', o: ['t:四 / sì', 't:二 / èr', 't:天 / tiān'] } ] } ] }
  }
};

/* ---------- Thẻ chữ Hán (giữ nguyên từ bộ cũ) ---------- */
KT.ZH.HAN = [
  ['妈妈', '爸爸', 'C2'], ['红色', '蓝色', 'C2'], ['狗', '猫', 'C2'], ['苹果', '草莓', 'C2'],
  ['老师', '学生', 'C3'], ['学校', '家', 'C3'], ['水', '米饭', 'C3'], ['写字', '看书', 'C3'],
  ['雨', '雪', 'C4'], ['起床', '睡觉', 'C4'], ['教室', '商店', 'C4'], ['喜欢', '不喜欢', 'C4']
];

/* ---------- Viết ---------- */
KT.ZH.VI = {
  ten: 'Viết', o: 'cx_o_puzzle', lang: 'zh', dan: 'xm',
  thu: { k: 'xep', the: ['好|hǎo', '你|nǐ'], dap: ['你好'] },
  bac: {
    3: { hd: 'Con kéo thẻ từ thành câu đúng.', diem: [
      { ten: 'Câu chủ – vị – tân', cau: [
        { k: 'xep', the: ['喜欢|xǐhuan', '我|wǒ', '苹果|píngguǒ', '吃|chī'], dap: ['我喜欢吃苹果'] },
        { k: 'xep', the: ['水|shuǐ', '我|wǒ', '喝|hē', '想|xiǎng'], dap: ['我想喝水'] },
        { k: 'xep', a: '今天天气很好。', the: ['很好|hěn hǎo', '今天|jīntiān', '天气|tiānqì'], dap: ['今天天气很好'] } ] },
      { ten: 'Câu hỏi', cau: [
        { k: 'xep', the: ['什么|shénme', '你|nǐ', '名字|míngzi', '叫|jiào', '？'], dap: ['你叫什么名字？'] },
        { k: 'xep', the: ['岁|suì', '你|nǐ', '几|jǐ', '？'], dap: ['你几岁？'] },
        { k: 'xep', a: '你家有几口人？', the: ['有|yǒu', '你家|nǐ jiā', '几口人|jǐ kǒu rén', '？'], dap: ['你家有几口人？'] } ] },
      { ten: 'Câu có 在 (ở đâu làm gì)', cau: [
        { k: 'xep', the: ['学习|xuéxí', '他|tā', '学校|xuéxiào', '在|zài'], dap: ['他在学校学习'] },
        { k: 'xep', the: ['家|jiā', '妈妈|māma', '做饭|zuò fàn', '在|zài'], dap: ['妈妈在家做饭'] },
        { k: 'xep', a: '小美在公园玩。', the: ['公园|gōngyuán', '小美|Xiǎoměi', '玩|wán', '在|zài'], dap: ['小美在公园玩'] } ] } ] },
    4: { hd: 'Con xếp câu (không có pinyin) hoặc chọn chữ Hán đúng.', diem: [
      { ten: 'Câu có thời gian', cau: [
        { k: 'xep', the: ['起床', '我', '七点', '每天'], dap: ['我每天七点起床', '每天七点我起床'] },
        { k: 'xep', the: ['去', '我们', '公园', '星期六'], dap: ['我们星期六去公园', '星期六我们去公园'] },
        { k: 'xep', a: '我晚上九点睡觉。', the: ['睡觉', '晚上', '我', '九点'], dap: ['我晚上九点睡觉', '晚上九点我睡觉'] } ] },
      { ten: 'Câu 因为…所以…', cau: [
        { k: 'xep', the: ['所以', '因为', '我们在家', '下雨了'], dap: ['因为下雨了所以我们在家'] },
        { k: 'xep', the: ['想吃饭', '因为', '所以我', '我饿了'], dap: ['因为我饿了所以我想吃饭'] },
        { k: 'xep', a: '因为我很累，所以我想睡觉。', the: ['所以', '我很累', '因为', '我想睡觉'], dap: ['因为我很累所以我想睡觉'] } ] },
      { ten: 'Chọn chữ Hán đúng', cau: [
        { q: '我喜欢喝___。', pic: 'x ~ một ly nước lọc', o: ['t:水', 't:木', 't:火'] },
        { q: '我家有三___人。', o: ['t:口', 't:日', 't:中'] },
        { a: '今天天气很好。', q: '今天___气很好。', pic: 'e:☀️ ~ mặt trời', o: ['t:天', 't:大', 't:夫'] } ] } ] }
  }
};

/* ---------- Nói (ghi âm, giáo viên chấm) ---------- */
KT.ZH.NO = {
  ten: 'Nói', o: 'cx_o_speak', lang: 'zh', dan: 'xm',
  bac: {
    1: [
      { id: 'Z-NO-1-R', ten: 'Nghe – nhắc lại', loai: 'nhac', buoc: [
        { a: '你好！', giay: 6 }, { a: '谢谢老师。', giay: 6 }, { a: '我是小美。', giay: 6 } ] },
      { id: 'Z-NO-1-H', ten: 'Trả lời câu hỏi', dat: 'Trả lời bằng câu 我叫… / 我…岁', buoc: [
        { a: '你叫什么名字？', giay: 15 }, { a: '你几岁？', giay: 15 } ] } ],
    2: [
      { id: 'Z-NO-2-R', ten: 'Nghe – nhắc lại', loai: 'nhac', buoc: [
        { a: '我喜欢红色。', giay: 8 }, { a: '我有一只狗。', giay: 8 }, { a: '这是我妈妈。', giay: 8 } ] },
      { id: 'Z-NO-2-H', ten: 'Trả lời câu hỏi', dat: 'Câu đủ cấu trúc 我喜欢… / 我家有…', buoc: [
        { a: '你喜欢什么颜色？', giay: 15 }, { a: '你喜欢什么动物？', giay: 15 }, { a: '你家有几口人？', giay: 15 } ] },
      { id: 'Z-NO-2-T', ten: 'Nhìn tranh', dat: 'Trả lời 他是爸爸 / 他是我爸爸', buoc: [
        { pic: 'f:dad ~ tranh gia đình, chỉ vào người bố', a: '他是谁？', giay: 15 } ] } ],
    3: [
      { id: 'Z-NO-3-R', ten: 'Nghe – nhắc lại', loai: 'nhac', buoc: [
        { a: '我想喝水。', giay: 8 }, { a: '今天天气很好。', giay: 8 }, { a: '她在教室里看书。', giay: 8 },
        { a: '我每天早上去学校。', giay: 8 }, { a: '我喜欢吃米饭，不喜欢吃面条。', giay: 10 } ] },
      { id: 'Z-NO-3-H', ten: 'Trả lời câu hỏi', dat: 'Mỗi câu trả lời bằng câu đủ', buoc: [
        { a: '今天天气怎么样？', giay: 15 }, { a: '你喜欢吃什么？', giay: 15 }, { a: '你喜欢做什么？', giay: 15 },
        { a: '你喜欢汉语吗？', giay: 15 }, { a: '你喜欢英语吗？', giay: 15 } ] },
      { id: 'Z-NO-3-T', ten: 'Nhìn tranh nói 1–2 câu', dat: '1–2 câu đúng về tranh', buoc: [
        { pic: 'f:family ~ cả nhà Xiaomei ăn cơm', a: '请说一说这张图。', giay: 40 } ] } ],
    4: [
      { id: 'Z-NO-4-H', ten: 'Trả lời câu hỏi', dat: 'Câu đủ, đúng thời gian, có lý do', buoc: [
        { a: '你每天几点起床？', giay: 15 }, { a: '你每天几点去学校？', giay: 15 }, { a: '你周末喜欢做什么？', giay: 15 },
        { a: '你今天去哪儿？', giay: 15 }, { a: '你为什么学汉语？用"因为……所以……"说一说。', giay: 20 },
        { a: '很高兴认识你！', giay: 10 } ] },
      { id: 'Z-NO-4-T', ten: 'Nhìn tranh nói 2–3 câu', dat: 'Mỗi tranh 2–3 câu, có thời gian, nơi chốn', buoc: [
        { pic: 'clock:7:00+f:school+clock:5:00+f:home ~ một ngày của Xiaomei: 7 giờ dậy, đi học, 5 giờ về nhà', a: '请说一说这张图。', giay: 40 },
        { pic: 'f:park ~ công viên cuối tuần', a: '请说一说这张图。', giay: 40 } ] } ]
  }
};

/* ---------- Lời thoại nhân vật (tiếng Việt, cô Hươu đọc) ---------- */
KT.LOI = {
  chao: 'Chào {ten}! Cô là cô Hươu. Hôm nay Bông sẽ cùng con đi một chuyến thám hiểm qua hai vùng đất: vùng tiếng Anh của bạn Anna và vùng tiếng Trung của bạn Xiaomei nhé!',
  trangChu: 'Chào mừng con đến với chuyến thám hiểm ngôn ngữ! Ba mẹ bấm vào ô Ba mẹ để điền thông tin của con, rồi con bấm Bắt đầu thám hiểm nhé!',
  trangChuLai: 'Con quay lại rồi! Con bấm vào bản đồ để đi tiếp chuyến thám hiểm nhé!',
  luat: 'Ở mỗi trạm, con chọn một ô may mắn, nghe thật kỹ rồi chạm vào đáp án. Không biết cũng không sao, con cứ chọn đáp án con thấy đúng nhất nhé!',
  thuLoa: 'Con có nghe rõ cô nói không? Nếu nghe rõ, con chạm vào ngôi sao nhé!',
  thuMic: 'Con nói thật to: Hello!',
  vaoTram: 'Trạm {tram}! Con chọn một ô may mắn nào!',
  thuThem: 'Ôi, Thỏ con muốn chơi thêm một thử thách nữa!',
  xongTram: 'Con nhận được một sticker!',
  imLang: 'Con cần nghe lại không? Con chạm vào cái loa nhé!',
  nghi: 'Con giỏi quá! Vùng tiếng Anh xong rồi. Cùng các bạn vươn vai nào!',
  vaoZh: 'Mình là Xiaomei. Chào mừng bạn đến vùng tiếng Trung!',
  ket: 'Chúc mừng {ten}! Con đã đi hết hai vùng đất rồi!',
  ketPh: 'Giờ con đưa máy cho ba mẹ nhé. Hẹn gặp con ở lớp học!',
  viDu: 'Mình làm thử một câu nhé!',
  noiHd: 'Con bấm nút micro rồi nói thật to nhé. Nói xong con bấm Xong.',
  nhacHd: 'Con nghe bạn nói, rồi nói lại giống hệt bạn nhé.'
};
KT.KHEN = { en: ['Great!', 'Thank you!', 'Next one!'], zh: ['好！', '谢谢！', '下一个！'] };
