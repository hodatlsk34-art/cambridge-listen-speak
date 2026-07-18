"use client";

import { useMemo, useRef, useState } from "react";
import { cambridgePracticeBank, type CambridgePracticeTest } from "./data/cambridgePracticeBank";

const levels = [
  { id: "pre-a1", short: "Pre A1", name: "Starters", icon: "🦁", color: "yellow", age: "6–8 tuổi", listen: "Nghe từ, số và mô tả ngắn", speak: "Chào hỏi, gọi tên và trả lời đơn" },
  { id: "a1", short: "A1", name: "Movers", icon: "🐢", color: "green", age: "7–10 tuổi", listen: "Hiểu hội thoại và chỉ dẫn đơn giản", speak: "Mô tả tranh, kể chuyện rất ngắn" },
  { id: "a2y", short: "A2", name: "Flyers", icon: "🐬", color: "blue", age: "9–12 tuổi", listen: "Nghe chi tiết trong hội thoại quen thuộc", speak: "So sánh tranh, kể chuyện và trao đổi" },
  { id: "a2", short: "A2", name: "Key", icon: "🚀", color: "cyan", age: "Thiếu niên · người lớn", listen: "Thông tin chính trong tình huống hằng ngày", speak: "Hỏi đáp và thảo luận chủ đề quen thuộc" },
  { id: "b1", short: "B1", name: "Preliminary", icon: "🐼", color: "purple", age: "Thiếu niên · người lớn", listen: "Nắm ý chính, thái độ và chi tiết", speak: "Phỏng vấn, mô tả và thảo luận" },
  { id: "b2", short: "B2", name: "First", icon: "🦊", color: "coral", age: "Thiếu niên · người lớn", listen: "Hiểu nhiều người nói và quan điểm", speak: "So sánh, lập luận và tương tác tự nhiên" },
  { id: "c1", short: "C1", name: "Advanced", icon: "🦉", color: "mint", age: "Người lớn · học thuật", listen: "Theo dõi bài nói dài và hàm ý", speak: "Trình bày, thương lượng và phát triển ý" },
  { id: "c2", short: "C2", name: "Proficiency", icon: "🦅", color: "indigo", age: "Người lớn · chuyên sâu", listen: "Hiểu sắc thái, tốc độ tự nhiên", speak: "Diễn đạt chính xác, linh hoạt và tinh tế" },
];

const cambridgeExamFormats = [
  {
    id: "pre-a1",
    level: "Pre A1",
    exam: "Starters",
    age: "6–8 tuổi",
    description: "Làm quen tiếng Anh qua tranh, từ vựng quen thuộc, câu trả lời ngắn và tương tác đơn giản.",
    papers: [
      { name: "Nghe", time: "khoảng 20 phút", parts: 4, tasks: ["Nối tên với tranh", "Viết từ hoặc số", "Chọn tranh đúng", "Tô màu hoặc vẽ theo hướng dẫn"] },
      { name: "Đọc và Viết", time: "khoảng 20 phút", parts: 5, tasks: ["Đúng/sai theo tranh", "Viết từ đơn giản", "Chọn từ phù hợp", "Hoàn thành đoạn ngắn", "Trả lời câu hỏi theo tranh"] },
      { name: "Nói", time: "3–5 phút", parts: 4, tasks: ["Tìm đồ vật trong tranh", "Trả lời câu hỏi cá nhân", "Nói từ/câu ngắn", "Gọi tên đồ vật quen thuộc"] },
    ],
    practice: [
      { title: "Chọn tranh đúng", skill: "Nghe", sample: "Nghe câu mô tả và chọn đúng con vật/đồ vật trong tranh." },
      { title: "Trả lời một từ", skill: "Đọc và Viết", sample: "Nhìn tranh và viết một từ: apple, chair, school, blue..." },
      { title: "Chỉ tranh và nói", skill: "Nói", sample: "Chỉ vào đồ vật trong tranh và trả lời: What is this? What colour is it?" },
    ],
  },
  {
    id: "a1",
    level: "A1",
    exam: "Movers",
    age: "7–10 tuổi",
    description: "Tăng khả năng hiểu hội thoại ngắn, mô tả tranh và kể câu chuyện đơn giản.",
    papers: [
      { name: "Nghe", time: "khoảng 25 phút", parts: 5, tasks: ["Nối người với tên", "Điền từ/số", "Chọn tranh", "Hoàn thành ghi chú", "Tô màu và viết"] },
      { name: "Đọc và Viết", time: "khoảng 30 phút", parts: 6, tasks: ["Nối định nghĩa", "Hoàn thành hội thoại", "Chọn từ cho truyện", "Hoàn thành văn bản ngắn", "Viết câu theo tranh"] },
      { name: "Nói", time: "5–7 phút", parts: 4, tasks: ["Tìm điểm khác nhau", "Kể chuyện theo tranh", "Chọn vật khác nhóm", "Trả lời câu hỏi cá nhân"] },
    ],
    practice: [
      { title: "Nối tên với người", skill: "Nghe", sample: "Nghe mô tả và nối từng bạn nhỏ với đúng tên." },
      { title: "Điền từ vào truyện", skill: "Đọc và Viết", sample: "Đọc câu chuyện ngắn và chọn từ còn thiếu." },
      { title: "Kể chuyện 4 tranh", skill: "Nói", sample: "Kể lại câu chuyện từ 4 tranh theo thứ tự." },
    ],
  },
  {
    id: "a2y",
    level: "A2",
    exam: "Flyers",
    age: "9–12 tuổi",
    description: "Luyện nghe chi tiết, đọc hiểu văn bản ngắn và nói thành đoạn rõ ý.",
    papers: [
      { name: "Nghe", time: "khoảng 25 phút", parts: 5, tasks: ["Nối tên", "Hoàn thành ghi chú", "Chọn tranh", "Hoàn thành đoạn văn", "Tô màu và viết"] },
      { name: "Đọc và Viết", time: "khoảng 40 phút", parts: 7, tasks: ["Nối định nghĩa", "Hoàn thành hội thoại", "Điền từ cho truyện", "Ngữ pháp trong đoạn văn", "Viết câu trả lời ngắn", "Viết đoạn theo gợi ý"] },
      { name: "Nói", time: "7–9 phút", parts: 4, tasks: ["Tìm điểm khác nhau", "Hỏi đáp thông tin", "Kể chuyện theo tranh", "Câu hỏi cá nhân mở rộng"] },
    ],
    practice: [
      { title: "Trao đổi thông tin", skill: "Nói", sample: "Hỏi và trả lời để hoàn thành bảng thông tin." },
      { title: "Câu hỏi văn bản ngắn", skill: "Đọc", sample: "Đọc thông báo, email hoặc truyện ngắn rồi trả lời." },
      { title: "Hoàn thành ghi chú", skill: "Nghe", sample: "Nghe thông tin về lớp học/chuyến đi và điền chi tiết còn thiếu." },
    ],
  },
  {
    id: "a2",
    level: "A2",
    exam: "Key",
    age: "Thiếu niên · người lớn",
    description: "Dành cho người học giao tiếp cơ bản trong tình huống đời sống, học tập và du lịch.",
    papers: [
      { name: "Đọc và Viết", time: "60 phút", parts: 7, tasks: ["Trắc nghiệm đọc hiểu", "Nối thông tin", "Điền từ", "Viết email ngắn", "Viết truyện hoặc bài ngắn"] },
      { name: "Nghe", time: "khoảng 30 phút", parts: 5, tasks: ["Chọn đáp án", "Điền thông tin", "Nối người/chủ đề"] },
      { name: "Nói", time: "8–10 phút", parts: 2, tasks: ["Hỏi đáp cá nhân", "Trao đổi theo chủ đề với bạn thi"] },
    ],
    practice: [
      { title: "Viết email ngắn", skill: "Viết", sample: "Viết email 25+ từ trả lời lời mời hoặc kế hoạch." },
      { title: "Tình huống hằng ngày", skill: "Nghe", sample: "Nghe hội thoại ở nhà ga, lớp học, cửa hàng, trung tâm thể thao." },
      { title: "Trao đổi theo cặp", skill: "Nói", sample: "Trao đổi lựa chọn hoạt động cuối tuần và giải thích lý do." },
    ],
  },
  {
    id: "b1",
    level: "B1",
    exam: "Preliminary",
    age: "Thiếu niên · người lớn",
    description: "Tập trung đọc hiểu nhiều dạng văn bản, viết email/bài ngắn và nói có phát triển ý.",
    papers: [
      { name: "Đọc", time: "45 phút", parts: 6, tasks: ["Trắc nghiệm", "Nối thông tin", "Điền câu vào đoạn", "Điền từ theo ngữ cảnh", "Điền từ mở"] },
      { name: "Viết", time: "45 phút", parts: 2, tasks: ["Viết email", "Viết bài báo hoặc câu chuyện"] },
      { name: "Nghe", time: "khoảng 30 phút", parts: 4, tasks: ["Chọn đáp án", "Điền ghi chú", "Hiểu ý chính và thái độ"] },
      { name: "Nói", time: "10–12 phút", parts: 4, tasks: ["Phỏng vấn", "Mô tả ảnh", "Thảo luận", "Trả lời câu hỏi mở rộng"] },
    ],
    practice: [
      { title: "Mô tả ảnh", skill: "Nói", sample: "Mô tả ảnh trong 45 giây: nơi chốn, người, hoạt động, cảm xúc." },
      { title: "Email nêu ý kiến", skill: "Viết", sample: "Viết email 100 từ nêu ý kiến và đề xuất." },
      { title: "Điền câu vào đoạn văn", skill: "Đọc", sample: "Chọn câu phù hợp để hoàn thành đoạn văn." },
    ],
  },
  {
    id: "b2",
    level: "B2",
    exam: "First",
    age: "Thiếu niên · người lớn",
    description: "Củng cố năng lực học thuật và giao tiếp độc lập: lập luận, so sánh, viết có cấu trúc.",
    papers: [
      { name: "Đọc & Sử dụng tiếng Anh", time: "75 phút", parts: 7, tasks: ["Điền từ trắc nghiệm", "Điền từ mở", "Cấu tạo từ", "Viết lại câu với từ khóa", "Trắc nghiệm đọc hiểu", "Điền câu vào đoạn văn", "Nối thông tin nhiều lựa chọn"] },
      { name: "Viết", time: "80 phút", parts: 2, tasks: ["Viết luận bắt buộc", "Viết bài/email/báo cáo/đánh giá"] },
      { name: "Nghe", time: "khoảng 40 phút", parts: 4, tasks: ["Trắc nghiệm", "Hoàn thành câu", "Nối người với ý kiến"] },
      { name: "Nói", time: "12–14 phút", parts: 4, tasks: ["Phỏng vấn", "Nói cá nhân dài", "Trao đổi theo cặp", "Thảo luận"] },
    ],
    practice: [
      { title: "Viết lại câu với từ khóa", skill: "Sử dụng tiếng Anh", sample: "Viết lại câu giữ nguyên nghĩa bằng từ khóa cho sẵn." },
      { title: "Viết luận cân đối", skill: "Viết", sample: "Viết bài luận có mở bài, hai luận điểm, ví dụ và kết luận." },
      { title: "So sánh và suy đoán", skill: "Nói", sample: "So sánh hai ảnh, suy đoán tình huống và nêu lựa chọn." },
    ],
  },
  {
    id: "c1",
    level: "C1",
    exam: "Advanced",
    age: "Người lớn · học thuật",
    description: "Dành cho người học cần dùng tiếng Anh linh hoạt trong học thuật, công việc và thảo luận chuyên sâu.",
    papers: [
      { name: "Đọc & Sử dụng tiếng Anh", time: "90 phút", parts: 8, tasks: ["Điền từ trắc nghiệm", "Điền từ mở", "Cấu tạo từ", "Biến đổi câu", "Đọc hiểu dài", "So sánh văn bản", "Điền đoạn", "Nối thông tin"] },
      { name: "Viết", time: "90 phút", parts: 2, tasks: ["Viết luận bắt buộc", "Viết báo cáo/đề xuất/đánh giá/thư"] },
      { name: "Nghe", time: "khoảng 40 phút", parts: 4, tasks: ["Trắc nghiệm đoạn ngắn", "Hoàn thành câu", "Phỏng vấn trắc nghiệm", "Nối ý kiến"] },
      { name: "Nói", time: "15 phút", parts: 4, tasks: ["Phỏng vấn", "Lượt nói dài", "Thảo luận cộng tác", "Thảo luận mở rộng"] },
    ],
    practice: [
      { title: "Biến đổi câu nâng cao", skill: "Sử dụng tiếng Anh", sample: "Dùng cấu trúc nâng cao để viết lại câu giữ nguyên nghĩa." },
      { title: "Viết đề xuất", skill: "Viết", sample: "Viết proposal có mục tiêu, đề xuất cụ thể và lý do thuyết phục." },
      { title: "Thảo luận quan điểm", skill: "Nói", sample: "So sánh lựa chọn, đánh giá ưu/nhược điểm và đi đến quyết định." },
    ],
  },
  {
    id: "c2",
    level: "C2",
    exam: "Proficiency",
    age: "Người lớn · chuyên sâu",
    description: "Dành cho người học cần độ chính xác, sắc thái và khả năng xử lý văn bản/hội thoại phức tạp.",
    papers: [
      { name: "Đọc & Sử dụng tiếng Anh", time: "90 phút", parts: 7, tasks: ["Điền từ trắc nghiệm", "Điền từ mở", "Cấu tạo từ", "Biến đổi câu", "Đọc hiểu dài", "Điền đoạn", "Nối thông tin"] },
      { name: "Viết", time: "90 phút", parts: 2, tasks: ["Viết luận tổng hợp", "Viết bài/báo cáo/thư/đánh giá"] },
      { name: "Nghe", time: "khoảng 40 phút", parts: 4, tasks: ["Trắc nghiệm đoạn ngắn", "Hoàn thành câu", "Phỏng vấn trắc nghiệm", "Nối thông tin"] },
      { name: "Nói", time: "16 phút", parts: 3, tasks: ["Phỏng vấn", "Nhiệm vụ cộng tác", "Lượt nói cá nhân và thảo luận"] },
    ],
    practice: [
      { title: "Sắc thái từ vựng", skill: "Sử dụng tiếng Anh", sample: "Chọn từ/cụm từ chính xác theo sắc thái và văn phong." },
      { title: "Luận tổng hợp", skill: "Viết", sample: "Tóm lược, đánh giá và phát triển lập luận từ hai văn bản." },
      { title: "Tranh luận chuyên sâu", skill: "Nói", sample: "Phát triển quan điểm trừu tượng với ví dụ và phản biện." },
    ],
  },
];

const lessonTopics = [
  ["Gia đình và bạn bè","Gia đình và bạn bè","family and friends","👨‍👩‍👧"],
  ["Ở trường học","Trường học và lớp học","school and classroom objects","🏫"],
  ["Đồ ăn và thức uống","Đồ ăn và thức uống","food and drinks","🍎"],
  ["Động vật quanh em","Động vật quanh em","animals around us","🦁"],
  ["Ngôi nhà của em","Nhà cửa và đồ vật","homes and furniture","🏠"],
  ["Sinh hoạt hằng ngày","Sinh hoạt hằng ngày","daily routines","⏰"],
  ["Trò chơi và sở thích","Trò chơi và sở thích","games and hobbies","⚽"],
  ["Thời tiết và trang phục","Thời tiết và trang phục","weather and clothes","🌦️"],
  ["Địa điểm trong thành phố","Địa điểm trong thành phố","places around town","🏙️"],
  ["Du lịch và phương tiện","Du lịch và phương tiện","travel and transport","🚌"],
  ["Sức khỏe và thói quen tốt","Sức khỏe và thói quen tốt","health and good habits","🌿"],
  ["Mua sắm thông minh","Mua sắm và lựa chọn","shopping and choices","🛍️"],
  ["Thiên nhiên và môi trường","Thiên nhiên và môi trường","nature and the environment","🌳"],
  ["Học tập và công việc","Học tập và công việc","study and work","💼"],
  ["Công nghệ hôm nay","Công nghệ trong cuộc sống","technology in daily life","💻"],
  ["Văn hóa và truyền thông","Văn hóa và truyền thông","culture and media","🎬"],
  ["Ý kiến và thảo luận","Ý kiến và thảo luận","ideas and opinions","💡"],
  ["Tương lai và kế hoạch","Dự đoán và kế hoạch","future plans","🚀"]
] as const;
const lessonFormats = ["Nghe chọn tranh","Nghe điền thông tin","Nghe xác định ý chính","Nghe nhận biết thái độ","Nói theo mẫu","Mô tả tranh","Đóng vai hội thoại","Thảo luận và phản biện"];
const levelCatalog = [
  ["Pre A1","Starters","Trẻ em",10],["A1","Movers","Trẻ em",12],["A2 Flyers","Flyers","Trẻ em",14],["A2 Key","Key","Thiếu niên",16],
  ["B1","Preliminary","Thiếu niên",18],["B2","First","Người lớn",22],["C1","Advanced","Người lớn",25],["C2","Proficiency","Người lớn",28]
] as const;
const lessons = levelCatalog.flatMap(([level, exam, type, base], levelIndex) =>
  Array.from({length:35}, (_, index) => {
    const topic = lessonTopics[(index + levelIndex * 2) % lessonTopics.length];
    return { id:`${levelIndex + 1}-${index + 1}`, level, exam, title:`${topic[0]} ${Math.floor(index / lessonTopics.length) + 1}`, topic:topic[1], englishTopic:topic[2], time:`${base + index % 6} phút`, type, icon:topic[3], format:lessonFormats[(index + levelIndex) % lessonFormats.length], skill:index % 3 === 0 ? "Nghe" : index % 3 === 1 ? "Nói" : "Nghe + Nói" };
  })
);

function Wave({ active = false }: { active?: boolean }) {
  return <div className={`wave ${active ? "active" : ""}`}>{[12,25,18,36,48,26,55,38,22,42,58,31,17,49,34,24,52,29,40,16,33,45,21,37,27].map((h,i)=><span key={i} style={{height:h}} />)}</div>;
}

type Lesson = (typeof lessons)[number];
type ActiveView = "home" | "roadmap" | "exam" | "lessons" | "progress";

function lessonContent(lesson: Lesson) {
  const advanced = ["B2","C1","C2"].some(x => lesson.level.startsWith(x));
  const mid = lesson.level.startsWith("B1") || lesson.level.startsWith("A2 Key");
  const englishTopic = lesson.englishTopic;
  const lessonNumber = Number(lesson.id.split("-").at(-1) ?? 1);
  const variant = (lessonNumber - 1) % 12;
  const speakers = [
    ["Lucy", "Tom"], ["Anna", "Ben"], ["Mia", "Jack"], ["Daisy", "Leo"], ["Emma", "Sam"], ["Grace", "Noah"],
    ["Ruby", "Oscar"], ["Chloe", "Harry"], ["Nina", "Alex"], ["Sophie", "Daniel"], ["Lily", "Max"], ["Eva", "Ryan"],
  ][variant];
  const settings = [
    "in the classroom", "at the school gate", "near the library", "in the sports hall", "at a small cafe", "on a rainy bus ride",
    "beside a noticeboard", "in a community centre", "at the market", "in the computer room", "outside the museum", "in the art room",
  ];
  const actions = [
    "choosing what to do next", "planning a short project", "checking a list of useful items", "comparing two possible activities",
    "preparing for a class presentation", "solving a small problem", "asking for advice", "reviewing what they learned",
    "organising a weekend plan", "making a poster", "recording a short interview", "deciding how to help a friend",
  ];
  const objects = ["a blue notebook", "a green ticket", "three photos", "a yellow bag", "a small map", "two sandwiches", "a red poster", "a white timetable", "a camera", "a sports shirt", "a bus card", "a new app"];
  const details = ["because it saves time", "because it is easier to remember", "because the weather may change", "because the group needs a clear plan", "because the first idea was too expensive", "because everyone can join", "because the instructions were confusing", "because the result was more useful than expected", "because the room was different", "because they wanted more practice", "because the old plan was too slow", "because the final choice felt fair"];
  const advice = ["make a simple checklist", "ask one more question", "compare the choices carefully", "practise for ten minutes", "write the key words first", "check the time and place", "listen before deciding", "give a clear example", "try the easiest step first", "review the answer twice", "work with a partner", "explain the reason clearly"];
  const setting = settings[variant];
  const action = actions[variant];
  const object = objects[variant];
  const reason = details[variant];
  const recommendation = advice[variant];
  const transcript = advanced
    ? `Host: Today we are discussing ${englishTopic} ${setting}. Speaker: The main issue is not simply choosing quickly, but understanding why one option may work better than another. Host: What example can you give? Speaker: A group was ${action}, and they focused on ${object} ${reason}. Host: What would you recommend to learners? Speaker: I would ${recommendation}, support the idea with evidence, and then adapt the plan after receiving feedback.`
    : mid
    ? `${speakers[0]}: Hi ${speakers[1]}. We are talking about ${englishTopic} today. ${speakers[1]}: Yes, and we are ${action} ${setting}. ${speakers[0]}: What is the most important detail? ${speakers[1]}: I think it is ${object}, ${reason}. ${speakers[0]}: What should we do next? ${speakers[1]}: We should ${recommendation} before we finish.`
    : `${speakers[0]}: Hello, ${speakers[1]}! Look at the picture about ${englishTopic}. ${speakers[1]}: I can see ${object} ${setting}. ${speakers[0]}: What are the children doing? ${speakers[1]}: They are ${action}. ${speakers[0]}: Why is it a good idea? ${speakers[1]}: ${reason}. Let us say the words and point to the picture.`;
  const questions = [
    { q:"What is the main topic of the conversation?", options:[englishTopic,"a sports result","a difficult exam rule"], answer:0, explain:`The speakers introduce ${englishTopic} as the main topic.` },
    { q:"Where does the conversation happen?", options:[setting.replace(/^in |^at |^near |^on |^beside |^outside /, ""), "at a train station", "in a hospital"], answer:0, explain:`The transcript says the speakers are ${setting}.` },
    { q:advanced ? "What does the speaker recommend?" : "What detail is mentioned?", options:advanced?[recommendation,"ignore the feedback","choose without checking"]:[object,"a new bicycle","a broken window"], answer:0, explain:advanced?`The speaker recommends learners should ${recommendation}.`:`The detail mentioned is ${object}.` }
  ];
  const prompts = [
    `Describe a picture about ${englishTopic}. Mention the place, people and one object.`,
    `Talk about ${englishTopic}. Say what you usually do and why it is useful.`,
    `Compare two choices connected with ${englishTopic}. Give one reason for each choice.`,
    `Tell a short story about ${englishTopic}. Use first, then and finally.`,
  ];
  return { transcript, questions, prompt: advanced ? `Give a 60-90 second response about ${englishTopic}. Refer to ${setting}, discuss ${action}, and explain whether ${recommendation} is a good strategy.` : mid ? `Talk for 45 seconds about ${englishTopic}. Mention ${object}, explain ${reason}, and add one personal opinion.` : prompts[variant % prompts.length], target: advanced ? "Độ trôi chảy · độ đa dạng từ vựng · liên kết ý · phát âm" : mid ? "Ý rõ ràng · từ nối · phát âm" : "Từ khóa đúng · câu hoàn chỉnh · âm rõ" };
}

function cleanAnswer(answer: string) {
  return answer.replace(/^[A-Z][a-z]+ is /, "").replace(/\s*=\s*/g, " is ").replace(/^học viên tự trả lời$/, "your own ideas");
}

const themeEnglish: Record<string, string> = {
  "Một ngày ở trường": "a day at school",
  "Tham quan sở thú": "a visit to the zoo",
  "Cuối tuần cùng gia đình": "a family weekend",
  "Đồ ăn và bữa tiệc": "food and a party",
  "Kỳ nghỉ ngày mưa": "a rainy holiday",
  "Ngày hội thể thao": "a sports day",
  "Câu lạc bộ mới": "a new club",
  "Kế hoạch du lịch": "travel plans",
  "Thói quen lành mạnh": "healthy habits",
  "Công nghệ ở trường": "technology at school",
  "Lựa chọn khi mua sắm": "shopping choices",
  "Cuối tuần trong thành phố": "a weekend in the city",
  "Học tập trong tương lai": "learning in the future",
  "Dự án cộng đồng": "a community project",
  "Thói quen truyền thông": "media habits",
  "Học tập và công việc": "study and work",
  "Lựa chọn vì môi trường": "environmental choices",
  "Văn hóa và bản sắc": "culture and identity",
};

function testMaterial(test: CambridgePracticeTest, paper: CambridgePracticeTest["papers"][number]) {
  const theme = themeEnglish[test.theme] ?? test.theme.toLowerCase();
  const facts = paper.items.filter(item => item.answerKey !== "học viên tự trả lời").map(item => cleanAnswer(item.answerKey));
  const testNumber = Number(test.id.match(/practice-(\d+)/)?.[1] ?? 1);
  const scenarioIndex = (testNumber - 1) % 6;
  const listeningScenarios = [
    { people: "Mia and Ben", place: "at the school gate", purpose: "choosing activities for the afternoon", extra: "They compare a noticeboard, a map and several small pictures before they decide." },
    { people: "Daisy and her uncle", place: "in a community centre", purpose: "preparing a weekend event", extra: "They check the timetable twice because one room has changed." },
    { people: "Leo and Anna", place: "near the library desk", purpose: "organising a class visit", extra: "They talk quietly while another student writes the important details." },
    { people: "Jack and Emma", place: "beside a sports field", purpose: "planning what to take", extra: "They decide which objects are useful and which ones can stay at home." },
    { people: "Sophia and Tom", place: "in a small shop", purpose: "buying things for a group task", extra: "They compare prices and choose the option that matches their list." },
    { people: "Grace and Daniel", place: "outside the art room", purpose: "finishing a display", extra: "They look at the picture carefully and agree where each label should go." },
  ];
  const readingScenarios = [
    { title: "The lunch club", writer: "a student helper", problem: "only a few students joined at first", result: "the club became busier after pupils suggested their own ideas" },
    { title: "A rainy-day trip", writer: "a class blogger", problem: "the original outdoor plan had to change", result: "the new indoor route helped everyone learn more than expected" },
    { title: "The video project", writer: "a young reporter", problem: "the team had too many ideas and not enough time", result: "a clear plan helped them finish a short but effective film" },
    { title: "The lost timetable", writer: "a course organiser", problem: "several learners went to the wrong room", result: "new signs and messages made the next session easier" },
    { title: "The community garden", writer: "a volunteer", problem: "the group disagreed about the best first step", result: "they tested two ideas and chose the one that worked best" },
    { title: "The study app trial", writer: "a school magazine writer", problem: "students used the app in very different ways", result: "regular reviews showed which features were genuinely helpful" },
  ];
  const speakingScenarios = [
    "two friends choosing what to do after class",
    "a family preparing for a short trip",
    "students comparing two ways to learn a new skill",
    "a group deciding how to improve a school event",
    "people discussing how technology can help learning",
    "volunteers choosing the most useful community project",
  ];
  const listening = listeningScenarios[scenarioIndex];
  const reading = readingScenarios[scenarioIndex];
  const speaking = speakingScenarios[scenarioIndex];
  if (paper.paper.includes("Nghe")) {
    const detailLines = facts.slice(0, 6).map((fact, index) => {
      const cues = ["First", "Next", "After that", "Then", "Near the end", "Finally"];
      return `${cues[index] ?? "Also"}, the important answer is ${fact}.`;
    }).join(" ");
    return {
      label: "Listening script",
      text: `Narrator: You will hear ${listening.people} talking ${listening.place} about ${theme}. They are ${listening.purpose}. ${listening.extra} ${detailLines} Speaker A: Let us check each detail before we finish. Speaker B: Good idea. The names, times, places and objects must match the recording exactly.`,
    };
  }
  if (paper.paper.includes("Đọc") || paper.paper.includes("Viết") || paper.paper.includes("Sử dụng")) {
    const readingDetails = facts.slice(0, 8).map((fact, index) => {
      const links = ["One useful detail is", "The next clue is", "A later sentence explains", "The writer also mentions", "Another answer comes from", "The final paragraph says", "A separate section states", "The last clue is"];
      return `${links[index] ?? "The text says"} ${fact}.`;
    }).join(" ");
    return {
      label: "Reading text",
      text: `Read the text. ${reading.title} is written by ${reading.writer} and focuses on ${theme}. At the beginning, ${reading.problem}. During the activity, the group collected notes, compared choices and checked the details carefully. ${readingDetails} In the end, ${reading.result}.`,
    };
  }
  return {
    label: "Speaking card",
    text: `Candidate card: Talk about ${theme}. The situation shows ${speaking}. Describe the picture or options, give reasons for your ideas, and respond naturally to a follow-up question.`,
  };
}

type PracticePaper = CambridgePracticeTest["papers"][number];
type PracticeItem = PracticePaper["items"][number];

function needsIllustration(paperName: string, item: PracticeItem) {
  const text = `${paperName} ${item.part} ${item.taskType} ${item.instruction} ${item.sampleQuestion}`.toLowerCase();
  return /picture|photo|story|colour|color|tranh|ảnh|tô màu|nối tên|chọn tranh|mô tả ảnh|so sánh|kể chuyện|thẻ nói|find|describe|compare|which|what colour|where is/.test(text);
}

function illustrationKind(paperName: string, item: PracticeItem) {
  const text = `${paperName} ${item.taskType} ${item.instruction} ${item.sampleQuestion}`.toLowerCase();
  if (/story|kể chuyện|sequence|chuỗi/.test(text)) return "story";
  if (/compare|so sánh|different|khác nhau/.test(text)) return "compare";
  if (/colour|color|tô màu|nối tên|find|where is/.test(text)) return "large";
  if (/chọn tranh|which|what will|where did|3 tranh|multiple choice|trắc nghiệm/.test(text)) return "options";
  return paperName.includes("Nói") ? "compare" : "large";
}

function ExamIllustration({ test, paperName, item }: { test: CambridgePracticeTest; paperName: string; item: PracticeItem }) {
  if (!needsIllustration(paperName, item)) return null;
  const kind = illustrationKind(paperName, item);
  const visualIndex = (Number(test.id.match(/practice-(\d+)/)?.[1] ?? 1) - 1) % 6;
  const visualSets = [
    {
      story: [["1", "morning", "A learner opens a school bag."], ["2", "class", "Friends look at a project poster."], ["3", "park", "The group collects ideas outside."], ["4", "show", "They present the finished work."]],
      compare: ["Two students are planning an outdoor activity.", "Two students are working together in a classroom."],
      options: [["A", "library", "quiet study"], ["B", "market", "buying fruit"], ["C", "station", "waiting for a bus"]],
      sky: ["kite", "cloud", "sun"],
      children: ["Ben", "Daisy", "Emma", "Jack", "Mia"],
    },
    {
      story: [["1", "rain", "A class trip changes because it rains."], ["2", "museum", "The learners look at a display."], ["3", "cafe", "They write notes together."], ["4", "bus", "They go home with new ideas."]],
      compare: ["A family is packing for a short journey.", "A family is checking a map indoors."],
      options: [["A", "museum", "looking at art"], ["B", "cafe", "having a snack"], ["C", "bus stop", "waiting in the rain"]],
      sky: ["umbrella", "cloud", "bus"],
      children: ["Daisy", "Leo", "Anna", "Sam", "Ruby"],
    },
    {
      story: [["1", "club", "Students choose a club project."], ["2", "camera", "They record a short video."], ["3", "screen", "They edit their work."], ["4", "prize", "The class watches the film."]],
      compare: ["Students are filming an interview.", "Students are editing a video on a computer."],
      options: [["A", "studio", "recording a video"], ["B", "computer room", "editing pictures"], ["C", "hall", "showing a film"]],
      sky: ["poster", "camera", "screen"],
      children: ["Emma", "Tom", "Grace", "Harry", "Nina"],
    },
    {
      story: [["1", "field", "Friends meet for sports day."], ["2", "race", "They prepare the equipment."], ["3", "break", "They share drinks after the race."], ["4", "medal", "Everyone celebrates fairly."]],
      compare: ["Students are playing outside on a sports field.", "Students are organising equipment inside."],
      options: [["A", "sports field", "running a race"], ["B", "gym", "carrying equipment"], ["C", "shop", "buying drinks"]],
      sky: ["flag", "ball", "medal"],
      children: ["Jack", "Mia", "Oscar", "Lily", "Noah"],
    },
    {
      story: [["1", "garden", "Volunteers arrive at a community garden."], ["2", "plants", "They choose where to plant flowers."], ["3", "sign", "They make labels for each bed."], ["4", "open", "Visitors come to see the garden."]],
      compare: ["People are planting flowers outside.", "People are planning a display at a table."],
      options: [["A", "garden", "planting flowers"], ["B", "table", "making labels"], ["C", "gate", "welcoming visitors"]],
      sky: ["tree", "flower", "sign"],
      children: ["Mia", "Ben", "Chloe", "Ethan", "Zoe"],
    },
    {
      story: [["1", "art room", "Learners prepare a media display."], ["2", "microphone", "One student records an interview."], ["3", "poster", "The team fixes the poster."], ["4", "gallery", "People visit the finished display."]],
      compare: ["Students are recording an interview.", "Students are presenting a poster to visitors."],
      options: [["A", "art room", "making a poster"], ["B", "desk", "recording audio"], ["C", "gallery", "talking to visitors"]],
      sky: ["paint", "map", "camera"],
      children: ["Tom", "Daisy", "Alex", "Grace", "Max"],
    },
  ];
  const visual = visualSets[visualIndex];

  if (kind === "story") {
    return <div className="exam-illustration" aria-label="Picture story illustration">
      <b>Picture story</b>
      <div className="story-strip">
        {visual.story.map(([number, label, caption]) => <div className="story-panel" key={number}>
          <span>{number}</span>
          <i>{label}</i>
          <p>{caption}</p>
        </div>)}
      </div>
    </div>;
  }

  if (kind === "compare") {
    return <div className="exam-illustration" aria-label="Compare two pictures">
      <b>Compare the pictures</b>
      <div className="compare-pictures">
        <div className="picture-panel sunny">
          <span>Picture A</span>
          <div className="scene-row"><i className="sun" /><i className="bench" /><i className="person blue" /></div>
          <p>{visual.compare[0]}</p>
        </div>
        <div className="picture-panel indoor">
          <span>Picture B</span>
          <div className="scene-row"><i className="window" /><i className="desk" /><i className="person coral" /></div>
          <p>{visual.compare[1]}</p>
        </div>
      </div>
    </div>;
  }

  if (kind === "options") {
    return <div className="exam-illustration" aria-label="Choose from picture options">
      <b>Choose A, B or C</b>
      <div className="picture-options">
        {visual.options.map(([letter, title, caption]) => <div className="picture-option" key={letter}>
          <strong>{letter}</strong>
          <span>{title}</span>
          <i className={`option-scene ${title}`} />
          <p>{caption}</p>
        </div>)}
      </div>
    </div>;
  }

  return <div className="exam-illustration" aria-label="Large picture illustration">
    <b>Large picture</b>
    <div className="large-picture">
      <div className="picture-sky">{visual.sky.map(label => <span key={label}>{label}</span>)}</div>
      <div className="picture-ground">
        {visual.children.map((name, index) => <span className={`child child-${index + 1}`} key={name}>{name}</span>)}
        <i className="tree" />
        <i className="table" />
        <i className="ball" />
      </div>
      <p>Use the picture for matching names, finding objects, colouring, or short answers.</p>
    </div>
  </div>;
}

function examTaskType(item: PracticeItem) {
  const text = item.taskType.toLowerCase();
  if (/nối tên|nghe và nối/.test(text)) return "Matching names";
  if (/viết từ|nghe và viết|hoàn thành ghi chú|điền thông tin|hoàn thành câu/.test(text)) return "Note completion";
  if (/chọn|trắc nghiệm/.test(text)) return "Multiple choice";
  if (/tô màu/.test(text)) return "Colouring and writing";
  if (/đúng\/sai/.test(text)) return "Yes / No";
  if (/đánh vần/.test(text)) return "Spelling";
  if (/nối định nghĩa/.test(text)) return "Matching definitions";
  if (/hội thoại/.test(text)) return "Dialogue completion";
  if (/điền từ|cấu tạo từ/.test(text)) return "Gap fill";
  if (/viết lại|biến đổi/.test(text)) return "Key word transformation";
  if (/email/.test(text)) return "Email writing";
  if (/viết luận/.test(text)) return "Essay writing";
  if (/báo cáo|đề xuất|đánh giá/.test(text)) return "Report / proposal / review";
  if (/mô tả ảnh|nói cá nhân|lượt nói dài/.test(text)) return "Long turn";
  if (/so sánh|tìm điểm khác nhau/.test(text)) return "Picture comparison";
  if (/kể chuyện/.test(text)) return "Picture story";
  if (/trao đổi|thảo luận|nhiệm vụ cộng tác/.test(text)) return "Collaborative task";
  if (/phỏng vấn/.test(text)) return "Interview";
  return "Exam task";
}

function examInstruction(paperName: string, item: PracticeItem) {
  const paper = paperName.toLowerCase();
  const task = examTaskType(item);
  if (paper.includes("nghe")) {
    if (task === "Matching names") return "Listen to the conversation and match each name to the correct person or picture.";
    if (task === "Note completion") return "Listen and write the missing word, number, time, place or name.";
    if (task === "Colouring and writing") return "Listen and follow the instructions to colour, draw or write on the picture.";
    return "Listen to the recording and choose the correct answer.";
  }
  if (paper.includes("đọc") || paper.includes("sử dụng")) {
    if (task === "Yes / No") return "Look at the picture or read the short text and write yes or no.";
    if (task === "Matching definitions") return "Match each definition or description with the correct word or text.";
    if (task === "Dialogue completion") return "Choose the best response to complete the conversation.";
    if (task === "Key word transformation") return "Complete the second sentence so that it has a similar meaning to the first sentence.";
    if (task === "Gap fill") return "Read the text and write or choose the best word for each gap.";
    return "Read the text once, then answer the questions below. Do not repeat the source text in your answer.";
  }
  if (paper.includes("viết")) {
    return "Write your answer in English. Use the prompt, organise your ideas clearly and check grammar and spelling.";
  }
  if (task === "Picture comparison") return "Look at the pictures, compare them and answer the examiner's question.";
  if (task === "Picture story") return "Look at the pictures and tell the story in order.";
  if (task === "Collaborative task") return "Discuss the options, respond to your partner and try to reach a decision.";
  if (task === "Long turn") return "Speak for about one minute. Describe what you can see and add a simple opinion or reason.";
  return "Answer the examiner's question in English using complete sentences.";
}

function examFocus(item: PracticeItem) {
  const task = examTaskType(item);
  if (task === "Matching names") return "names, descriptions and position";
  if (task === "Note completion") return "numbers, spelling and key details";
  if (task === "Multiple choice") return "gist, detail and distractors";
  if (task === "Colouring and writing") return "colours, prepositions and objects";
  if (task === "Yes / No") return "picture detail and short statements";
  if (task === "Gap fill") return "grammar, vocabulary and context";
  if (task === "Key word transformation") return "meaning, structure and accuracy";
  if (task.includes("writing") || task.includes("Report")) return "content, organisation and language control";
  if (task.includes("Picture") || task === "Long turn") return "description, comparison and fluency";
  if (task === "Collaborative task") return "interaction, reasons and turn-taking";
  return "accuracy, clarity and exam technique";
}

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("home");
  const [selected, setSelected] = useState("pre-a1");
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [filter, setFilter] = useState("Tất cả");
  const [levelFilter, setLevelFilter] = useState("Tất cả cấp độ");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [menu, setMenu] = useState(false);
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<Record<number,number>>({});
  const [checked, setChecked] = useState(false);
  const [lessonAudio, setLessonAudio] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [accent, setAccent] = useState<"en-GB"|"en-US">("en-GB");
  const [examLevelId, setExamLevelId] = useState("pre-a1");
  const [practiceTestId, setPracticeTestId] = useState("starters-practice-1");
  const [doingTest, setDoingTest] = useState(false);
  const [testAnswers, setTestAnswers] = useState<Record<string,string>>({});
  const [testChecked, setTestChecked] = useState(false);
  const [testAudioKey, setTestAudioKey] = useState<string | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recognisedText, setRecognisedText] = useState("");
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const current = levels.find(l => l.id === selected) ?? levels[0];
  const currentExam = cambridgeExamFormats.find(exam => exam.id === examLevelId) ?? cambridgeExamFormats[0];
  const practiceTests = cambridgePracticeBank.filter(test => test.levelId === examLevelId);
  const activePracticeTest = practiceTests.find(test => test.id === practiceTestId) ?? practiceTests[0];
  const gradableItems = activePracticeTest?.papers.flatMap(paper => paper.items.filter(item => item.answerKey !== "học viên tự trả lời")) ?? [];
  const testScore = gradableItems.filter(item => {
    const key = `${activePracticeTest.id}-${item.part}-${item.sampleQuestion}`;
    return testAnswers[key]?.trim().toLowerCase() === item.answerKey.trim().toLowerCase();
  }).length;
  const filteredLessons = useMemo(() => lessons.filter(l =>
    (filter === "Tất cả" || l.type === filter) &&
    (levelFilter === "Tất cả cấp độ" || l.level === levelFilter) &&
    (!query || `${l.title} ${l.topic} ${l.format}`.toLowerCase().includes(query.toLowerCase()))
  ), [filter, levelFilter, query]);
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredLessons.length / pageSize));
  const visibleLessons = filteredLessons.slice((page - 1) * pageSize, page * pageSize);
  const changeFilter = (value:string, kind:"type"|"level") => { if (kind === "type") setFilter(value); else setLevelFilter(value); setPage(1); };
  const detail = openLesson ? lessonContent(openLesson) : null;
  const openDetail = (lesson:Lesson) => { setOpenLesson(lesson); setShowTranscript(false); setAnswers({}); setChecked(false); setLessonAudio(false); setSpeaking(false); };
  const closeDetail = () => { window.speechSynthesis?.cancel(); if (recorderRef.current?.state === "recording") recorderRef.current.stop(); setOpenLesson(null); };
  const startPracticeTest = () => { setDoingTest(true); setTestChecked(false); setTestAnswers({}); };
  const closePracticeTest = () => { setDoingTest(false); setTestChecked(false); };
  const updateTestAnswer = (key:string, value:string) => setTestAnswers(current => ({...current, [key]: value}));
  const openView = (view:ActiveView) => { setActiveView(view); setMenu(false); window.scrollTo({top:0, behavior:"smooth"}); };
  const playTestAudio = (key:string, text:string) => {
    window.speechSynthesis.cancel();
    if (testAudioKey === key) { setTestAudioKey(null); return; }
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = "en-GB";
    voice.rate = activePracticeTest?.levelId === "pre-a1" || activePracticeTest?.levelId === "a1" ? .78 : .92;
    voice.onend = () => setTestAudioKey(null);
    setTestAudioKey(key);
    window.speechSynthesis.speak(voice);
  };
  const playLesson = () => { if (!detail) return; window.speechSynthesis.cancel(); if (lessonAudio) { setLessonAudio(false); return; } const voice = new SpeechSynthesisUtterance(detail.transcript); voice.lang=accent; voice.rate=openLesson?.level.startsWith("Pre")?.78:openLesson?.level.startsWith("A1")?.85:1; voice.onend=()=>setLessonAudio(false); setLessonAudio(true); window.speechSynthesis.speak(voice); };
  const recordSpeech = async () => {
    if (speaking && recorderRef.current) { recorderRef.current.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder = new MediaRecorder(stream); recorderRef.current=recorder; chunksRef.current=[]; setRecognisedText(""); setPronunciationScore(null);
      recorder.ondataavailable=e=>chunksRef.current.push(e.data);
      recorder.onstop=()=>{ const blob=new Blob(chunksRef.current,{type:recorder.mimeType||"audio/webm"}); if(recordingUrl) URL.revokeObjectURL(recordingUrl); setRecordingUrl(URL.createObjectURL(blob)); stream.getTracks().forEach(t=>t.stop()); setSpeaking(false); };
      recorder.start(); setSpeaking(true);
      const Recognition = (window as unknown as {SpeechRecognition?:new()=>{lang:string;interimResults:boolean;onresult:(event:{results:ArrayLike<ArrayLike<{transcript:string}>>})=>void;onerror:()=>void;start:()=>void}}).SpeechRecognition || (window as unknown as {webkitSpeechRecognition?:new()=>{lang:string;interimResults:boolean;onresult:(event:{results:ArrayLike<ArrayLike<{transcript:string}>>})=>void;onerror:()=>void;start:()=>void}}).webkitSpeechRecognition;
      if (Recognition && detail) { const recognition=new Recognition(); recognition.lang=accent; recognition.interimResults=false; recognition.onresult=e=>{const said=e.results[0][0].transcript; setRecognisedText(said); const target=detail.transcript.toLowerCase().split(/\s+/); const matched=said.toLowerCase().split(/\s+/).filter(w=>target.includes(w)).length; setPronunciationScore(Math.min(98,Math.max(45,Math.round(45+(matched/Math.max(1,said.split(/\s+/).length))*53))));}; recognition.onerror=()=>{}; recognition.start(); }
    } catch { alert("Bạn cần cho phép micro để ghi âm. Hãy kiểm tra quyền truy cập micro của trình duyệt."); }
  };
  const downloadRecording = () => { if (!recordingUrl || !openLesson) return; const link=document.createElement("a"); link.href=recordingUrl; link.download=`speakup-${openLesson.id}.webm`; link.click(); };

  return (
    <main id="top">
      <header className="header">
        <button className="brand brand-button" onClick={()=>openView("home")} aria-label="SpeakUp Cambridge"><span className="brand-mark">▥</span><span>SpeakUp <b>Cambridge</b></span></button>
        <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Mở menu">☰</button>
        <nav className={menu ? "open" : ""}>
          <button className={activeView==="home"?"active":""} onClick={()=>openView("home")}>🏠 Trang chủ</button><button className={activeView==="roadmap"?"active":""} onClick={()=>openView("roadmap")}>🗺️ Lộ trình</button><button className={activeView==="exam"?"active":""} onClick={()=>openView("exam")}>📝 Dạng đề</button><button className={activeView==="lessons"?"active":""} onClick={()=>openView("lessons")}>📚 Kho bài học</button><button className={activeView==="progress"?"active":""} onClick={()=>openView("progress")}>📈 Tiến độ</button>
        </nav>
        <a className="hello" href="/login">👤 <span>Đăng nhập</span></a>
      </header>

      {activeView === "home" && <section className="hero page-view" id="home">
        <div className="hero-copy">
          <div className="eyebrow">▥ CAMBRIDGE LISTENING & SPEAKING</div>
          <h1>Nghe chuẩn.<br/><em>Nói tự tin.</em><br/>Chinh phục Cambridge.</h1>
          <p>Lộ trình từ Pre A1 đến C2, tập trung luyện nghe chủ động và phản xạ nói qua bài học ngắn, hội thoại thực tế và phản hồi phát âm.</p>
          <div className="hero-actions"><button className="button primary" onClick={()=>openView("roadmap")}>✨ Kiểm tra trình độ</button><button className="button secondary" onClick={()=>openView("exam")}>Khám phá dạng đề →</button></div>
          <div className="trust-row"><span>✓ Nội dung theo CEFR</span><span>✓ Trẻ em & người lớn</span><span>✓ Học 15 phút/ngày</span></div>
        </div>
        <div className="audio-lab" id="practice">
          <div className="audio-card">
            <div className="card-top"><div><span className="pill yellow">★ {current.short} {current.name}</span><h2>{selected === "pre-a1" ? "Tham quan sở thú" : current.name + " - luyện tập"}</h2></div><span className="big-emoji">{current.icon}</span></div>
            <Wave active={playing}/>
            <div className="player"><button onClick={()=>setPlaying(!playing)}>{playing ? "Ⅱ" : "▶"}</button><div><b>{playing ? "Đang phát bài nghe..." : "Nhấn để bắt đầu nghe"}</b><small>00:{playing ? "18" : "00"} / 01:05</small></div><span>0.75× &nbsp; <b>1×</b> &nbsp; 1.25×</span></div>
            <div className="sentence">🔊 <span>Could I have an orange juice, please?</span></div>
          </div>
          <div className={`speak-card ${recording ? "recording" : ""}`}>
            <div className="speak-head"><span className="pill mint">✦ Nói lại câu này</span><b>Phát âm <strong>{recording ? "..." : "86%"}</strong></b></div>
            <button className="mic" onClick={()=>setRecording(!recording)}>🎙️</button>
            <Wave active={recording}/>
            <p>{recording ? "Đang lắng nghe... Nhấn để kết thúc" : "Nhấn micro và nói lại câu mẫu"}</p>
          </div>
        </div>
      </section>}

      {activeView === "roadmap" && <section className="level-rail page-view" id="roadmap">
        <div className="section-heading"><div><span className="kicker">LỘ TRÌNH CAMBRIDGE</span><h2>Chọn đúng cấp độ, tiến bộ từng ngày</h2></div><p>8 chặng học từ làm quen tiếng Anh đến giao tiếp thành thạo.</p></div>
        <div className="levels">{levels.map(l=><button key={l.id} className={`level ${l.color} ${selected===l.id?"selected":""}`} onClick={()=>setSelected(l.id)}><span>{l.icon}</span><b>{l.short}</b><small>{l.name}</small></button>)}</div>
        <div className="level-detail"><div className="detail-title"><span>{current.icon}</span><div><small>CẤP ĐỘ ĐANG CHỌN</small><h3>{current.short} {current.name}</h3><p>{current.age}</p></div></div><div><b>🎧 Mục tiêu Nghe</b><p>{current.listen}</p></div><div><b>🎙️ Mục tiêu Nói</b><p>{current.speak}</p></div><button className="button primary" onClick={()=>openView("lessons")}>Bắt đầu học →</button></div>
      </section>}

      {activeView === "home" && <section className="method page-view">
        <span className="kicker">PHƯƠNG PHÁP TRỌNG TÂM</span><h2>Nghe chủ động – Nói phản xạ</h2><p className="section-sub">Mỗi bài học đi theo vòng luyện tập ngắn, rõ ràng và có thể lặp lại.</p>
        <div className="method-grid"><article><span>🎧</span><b>1. Nghe lấy ý</b><p>Nghe tình huống tự nhiên để xác định người nói, bối cảnh và ý chính.</p></article><article><span>🔍</span><b>2. Nghe chi tiết</b><p>Phát lại theo tốc độ phù hợp, hoàn thành câu hỏi và mở transcript.</p></article><article><span>🗣️</span><b>3. Nói có hướng dẫn</b><p>Shadowing từng câu, luyện trọng âm, nhịp điệu và âm cuối.</p></article><article><span>🏆</span><b>4. Nói tự do</b><p>Trả lời mở, đóng vai và nhận tiêu chí tự đánh giá theo cấp độ.</p></article></div>
      </section>}

      {activeView === "exam" && <section className="exam-section page-view" id="exam-formats">
        <div className="section-heading">
          <div>
            <span className="kicker">DẠNG ĐỀ THI CAMBRIDGE</span>
            <h2>Luyện đúng cấu trúc từng chứng chỉ</h2>
            <p className="catalog-summary">Bổ sung khung đề Nghe, Đọc, Viết, Nói và gói luyện tập theo từng cấp độ.</p>
          </div>
          <div className="exam-note">Nội dung luyện tập tự biên soạn theo dạng bài Cambridge English, không phải đề thi chính thức.</div>
        </div>
        <div className="exam-tabs" role="tablist" aria-label="Chọn cấp độ đề thi Cambridge">
          {cambridgeExamFormats.map(exam => <button key={exam.id} className={examLevelId===exam.id?"active":""} onClick={()=>{setExamLevelId(exam.id); setPracticeTestId(cambridgePracticeBank.find(test => test.levelId === exam.id)?.id ?? practiceTestId);}} type="button"><b>{exam.exam}</b><small>{exam.level}</small></button>)}
        </div>
        <div className="exam-overview">
          <div className="exam-intro">
            <span>{currentExam.level}</span>
            <h3>{currentExam.exam}</h3>
            <p>{currentExam.description}</p>
            <small>Nhóm học phù hợp: {currentExam.age}</small>
          </div>
          <div className="paper-grid">
            {currentExam.papers.map(paper => <article key={paper.name} className="paper-card">
              <div><b>{paper.name}</b><span>{paper.time}</span></div>
              <p>{paper.parts} phần</p>
              <ul>{paper.tasks.map(task => <li key={task}>{task}</li>)}</ul>
            </article>)}
          </div>
        </div>
        <div className="practice-pack">
          <h3>Gói bài tập mẫu nên thêm vào kho</h3>
          <div>
            {currentExam.practice.map(item => <article key={item.title}>
              <span>{item.skill}</span>
              <b>{item.title}</b>
              <p>{item.sample}</p>
            </article>)}
          </div>
        </div>
        {activePracticeTest && <div className="test-bank">
          <div className="test-bank-head">
            <div>
              <span className="kicker">NGÂN HÀNG {cambridgePracticeBank.length} ĐỀ LUYỆN</span>
              <h3>{activePracticeTest.title}</h3>
              <p>{activePracticeTest.level} {activePracticeTest.exam} · Chủ đề: {activePracticeTest.theme}</p>
            </div>
            <div className="test-bank-actions">
              <select value={activePracticeTest.id} onChange={e=>setPracticeTestId(e.target.value)} aria-label="Chọn đề luyện tập">
                {practiceTests.map(test => <option key={test.id} value={test.id}>{test.title} · {test.theme}</option>)}
              </select>
              <button className="button primary" type="button" onClick={startPracticeTest}>Làm bài →</button>
            </div>
          </div>
          <div className="test-paper-list">
            {activePracticeTest.papers.map(paper => { const material = testMaterial(activePracticeTest, paper); const audioKey = `${activePracticeTest.id}-${paper.paper}`; return <article key={paper.paper} className="test-paper">
              <header><b>{paper.paper}</b><span>{paper.time}</span></header>
              <div className="test-material paper-material"><b>{material.label}</b><p>{material.text}</p>{paper.paper.includes("Nghe") && <button type="button" onClick={()=>playTestAudio(audioKey, material.text)}>{testAudioKey===audioKey ? "Dừng audio" : "▶ Nghe audio"}</button>}</div>
              <div className="test-items">
                {paper.items.map(item => <section key={`${paper.paper}-${item.part}`}>
                  <div><strong>{item.part}</strong><em>{examTaskType(item)}</em></div>
                  <p>{examInstruction(paper.paper, item)}</p>
                  <ExamIllustration test={activePracticeTest} paperName={paper.paper} item={item} />
                  <ul>
                    <li><b>Question:</b> {item.sampleQuestion}</li>
                    <li><b>Focus:</b> {examFocus(item)}</li>
                  </ul>
                </section>)}
              </div>
            </article>; })}
          </div>
        </div>}
      </section>}

      {activeView === "lessons" && <section className="lesson-section page-view" id="lessons">
        <div className="section-heading"><div><span className="kicker">KHO 280 BÀI HỌC</span><h2>Học theo tình huống thực tế</h2><p className="catalog-summary">35 bài cho mỗi chặng · Tập trung Nghe và Nói · Từ Pre A1 đến C2</p></div><div className="filters">{["Tất cả","Trẻ em","Thiếu niên","Người lớn"].map(f=><button key={f} className={filter===f?"active":""} onClick={()=>changeFilter(f,"type")}>{f}</button>)}</div></div>
        <div className="catalog-tools"><label className="search-box">⌕ <input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Tìm chủ đề, dạng bài..." /></label><select value={levelFilter} onChange={e=>changeFilter(e.target.value,"level")}><option>Tất cả cấp độ</option>{levelCatalog.map(l=><option key={l[0]}>{l[0]}</option>)}</select><span><b>{filteredLessons.length}</b> bài phù hợp</span></div>
        <div className="lesson-grid">{visibleLessons.map(l=><article key={l.id} onClick={()=>openDetail(l)}><div className="lesson-visual"><span>{l.icon}</span><button aria-label={`Mở ${l.title}`}>▶</button><i>{l.skill}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{l.level}</span><span>{l.exam}</span></div><h3>{l.title}</h3><p>{l.topic}</p><div className="format">🎯 {l.format}</div><footer><span>🎧 + 🎙️</span><span>⏱ {l.time}</span></footer></div></article>)}</div>
        {visibleLessons.length === 0 && <div className="empty-state">Không tìm thấy bài phù hợp. Hãy thử từ khóa hoặc bộ lọc khác.</div>}
        <div className="pagination"><button disabled={page===1} onClick={()=>setPage(p=>p-1)}>← Trước</button><span>Trang <b>{page}</b> / {totalPages}</span><button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Sau →</button></div>
      </section>}

      {activeView === "progress" && <section className="progress-section page-view" id="progress"><div><span className="kicker light">TIẾN BỘ MỖI NGÀY</span><h2>Biết mình đang ở đâu<br/>và cần luyện gì tiếp theo.</h2><p>Theo dõi số phút nghe, lượt nói, từ vựng đã học và mức độ hoàn thành từng kỹ năng.</p><button className="button white" onClick={()=>openView("roadmap")}>Bắt đầu lộ trình miễn phí →</button></div><div className="dashboard"><div className="streak">🔥 <b>7 ngày</b><small>Chuỗi học liên tục</small></div><div className="stats"><span><b>84</b><small>phút nghe</small></span><span><b>36</b><small>lượt nói</small></span><span><b>12</b><small>bài hoàn thành</small></span></div><div className="bars"><p>Nghe <span>72%</span></p><i><b style={{width:"72%"}}/></i><p>Nói <span>58%</span></p><i><b style={{width:"58%"}}/></i></div></div></section>}

      {doingTest && activePracticeTest && <div className="exam-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={closePracticeTest}/><div className="exam-panel"><button className="close" onClick={closePracticeTest}>×</button><header><span className="pill blue">{activePracticeTest.level} · {activePracticeTest.exam}</span><h2>{activePracticeTest.title}</h2><p>Chủ đề: {activePracticeTest.theme}. Mỗi paper có một nội dung đề riêng; câu hỏi bên dưới không lặp lại bài đọc hoặc bài nghe.</p></header><div className="exam-work-list">{activePracticeTest.papers.map(paper => { const material = testMaterial(activePracticeTest, paper); const paperAudioKey = `${activePracticeTest.id}-work-${paper.paper}`; return <section key={paper.paper} className="exam-work-paper"><div className="exam-work-head"><h3>{paper.paper}</h3><span>{paper.time}</span></div><div className="test-material paper-material"><b>{material.label}</b><p>{material.text}</p>{paper.paper.includes("Nghe") && <button type="button" onClick={()=>playTestAudio(paperAudioKey, material.text)}>{testAudioKey===paperAudioKey ? "Dừng audio" : "▶ Nghe audio"}</button>}</div>{paper.items.map(item => { const answerKey = `${activePracticeTest.id}-${item.part}-${item.sampleQuestion}`; const userAnswer = testAnswers[answerKey] ?? ""; const isSelfMarked = item.answerKey === "học viên tự trả lời"; const isCorrect = userAnswer.trim().toLowerCase() === item.answerKey.trim().toLowerCase(); return <article key={answerKey} className="exam-work-item"><div><strong>{item.part}</strong><em>{examTaskType(item)}</em></div><p>{examInstruction(paper.paper, item)}</p><ExamIllustration test={activePracticeTest} paperName={paper.paper} item={item} /><label><span>{item.sampleQuestion}</span><textarea value={userAnswer} onChange={event=>updateTestAnswer(answerKey, event.target.value)} placeholder={isSelfMarked ? "Write your answer in English. Use the exam criteria to self-check." : "Type your answer in English..."} /></label>{testChecked && !isSelfMarked && <p className={`answer-feedback ${isCorrect ? "correct" : "wrong"}`}>{isCorrect ? "Correct" : `Try again. Suggested answer: ${item.answerKey}`}</p>}{testChecked && isSelfMarked && <p className="answer-feedback self">This answer should be self-checked. Focus: {examFocus(item)}.</p>}</article>; })}</section>; })}</div><footer className="exam-submit"><button className="button primary" type="button" onClick={()=>setTestChecked(true)}>Check answers</button>{testChecked && <strong>Auto score: {testScore}/{gradableItems.length} fixed-answer questions</strong>}</footer></div></div>}
      {openLesson && detail && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={closeDetail}/><div className="lesson-panel"><button className="close" onClick={closeDetail}>×</button><header><span className="lesson-icon">{openLesson.icon}</span><div><span className="pill blue">{openLesson.level} · {openLesson.exam}</span><h2>{openLesson.title}</h2><p>{openLesson.topic} · {openLesson.time}</p></div></header><div className="lesson-tabs"><span>1. Nghe hiểu</span><span>2. Kiểm tra</span><span>3. Luyện nói</span></div><section className="listen-block"><h3>🎧 Bài nghe</h3><div className="accent-picker"><b>Chọn giọng đọc:</b><button className={accent==="en-GB"?"selected":""} onClick={()=>setAccent("en-GB")}>🇬🇧 Anh–Anh</button><button className={accent==="en-US"?"selected":""} onClick={()=>setAccent("en-US")}>🇺🇸 Anh–Mỹ</button></div><div className="audio-player"><button onClick={playLesson}>{lessonAudio?"Ⅱ":"▶"}</button><Wave active={lessonAudio}/><span>{lessonAudio?"Đang phát...":accent==="en-GB"?"Giọng Anh–Anh · 1×":"Giọng Anh–Mỹ · 1×"}</span></div><button className="transcript-toggle" onClick={()=>setShowTranscript(!showTranscript)}>{showTranscript?"Ẩn transcript":"Hiện transcript sau khi nghe"}</button>{showTranscript&&<div className="transcript">{detail.transcript}</div>}</section><section><h3>✅ Câu hỏi nghe hiểu</h3><div className="quiz">{detail.questions.map((q,i)=><article key={q.q}><b>{i+1}. {q.q}</b>{q.options.map((o,j)=><label key={o} className={checked?(j===q.answer?"correct":answers[i]===j?"wrong":""):""}><input type="radio" name={`q${i}`} checked={answers[i]===j} onChange={()=>setAnswers(a=>({...a,[i]:j}))}/>{o}</label>)}{checked&&<p>💡 {q.explain}</p>}</article>)}</div><button className="button primary" onClick={()=>setChecked(true)}>Chấm bài ({Object.keys(answers).length}/3)</button>{checked&&<strong className="score">Kết quả: {detail.questions.filter((q,i)=>answers[i]===q.answer).length}/3 câu đúng</strong>}</section><section className="speaking-practice"><h3>🎙️ Luyện nói & tự chấm</h3><p>{detail.prompt}</p><div className="target">Tiêu chí: {detail.target}</div><button className={`record-button ${speaking?"active":""}`} onClick={recordSpeech}>🎙️ <b>{speaking?"Dừng và lưu bản ghi":"Bắt đầu nói"}</b><small>{speaking?"Đang ghi âm – nhấn để hoàn thành":"Cho phép micro để ghi âm"}</small></button>{speaking&&<Wave active/>}{recordingUrl&&<div className="recording-result"><audio controls src={recordingUrl}/><button onClick={downloadRecording}>⇩ Tải tệp ghi âm</button></div>}{recognisedText&&<div className="ai-feedback"><b>Nhận diện giọng nói: {pronunciationScore}%</b><p>Hệ thống nghe được: “{recognisedText}”</p><small>Điểm dựa trên mức độ nhận diện câu nói; hãy nghe lại bản ghi để tự điều chỉnh âm, nhịp và trọng âm.</small></div>}<p className="privacy-note">Tệp ghi âm chỉ được giữ trong trình duyệt và có thể tải về máy; không tự động tải lên máy chủ.</p></section></div></div>}
      <a className="back-to-top" href="#top" aria-label="Về đầu trang">↑</a>
      <footer className="footer"><div className="brand"><span className="brand-mark">▥</span><span>SpeakUp <b>Cambridge</b></span></div><p>Nền tảng luyện Nghe – Nói theo lộ trình Cambridge và CEFR.</p><span>Nội dung tham khảo cấu trúc Cambridge English; không phải website chính thức của Cambridge.</span></footer>
    </main>
  );
}
