"use client";

import { useMemo, useRef, useState } from "react";
import { cambridgePracticeBank } from "./data/cambridgePracticeBank";

const levels = [
  { id: "pre-a1", short: "Pre A1", name: "Starters", icon: "🦁", color: "yellow", age: "6–8 tuổi", listen: "Nghe từ, số và mô tả ngắn", speak: "Chào hỏi, gọi tên và trả lời đơn" },
  { id: "a1", short: "A1", name: "Movers", icon: "🐢", color: "green", age: "7–10 tuổi", listen: "Hiểu hội thoại và chỉ dẫn đơn giản", speak: "Mô tả tranh, kể chuyện rất ngắn" },
  { id: "a2y", short: "A2", name: "Flyers", icon: "🐬", color: "blue", age: "9–12 tuổi", listen: "Nghe detail trong hội thoại quen thuộc", speak: "So sánh tranh, kể chuyện và trao đổi" },
  { id: "a2", short: "A2", name: "Key", icon: "🚀", color: "cyan", age: "Thiếu niên · người lớn", listen: "Thông tin chính trong tình huống hằng ngày", speak: "Hỏi đáp và thảo luận chủ đề quen thuộc" },
  { id: "b1", short: "B1", name: "Preliminary", icon: "🐼", color: "purple", age: "Thiếu niên · người lớn", listen: "Nắm ý chính, thái độ và detail", speak: "Phỏng vấn, mô tả và thảo luận" },
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
    description: "Luyện nghe detail, đọc hiểu văn bản ngắn và nói thành đoạn rõ ý.",
    papers: [
      { name: "Nghe", time: "khoảng 25 phút", parts: 5, tasks: ["Nối tên", "Hoàn thành ghi chú", "Chọn tranh", "Hoàn thành đoạn văn", "Tô màu và viết"] },
      { name: "Đọc và Viết", time: "khoảng 40 phút", parts: 7, tasks: ["Nối định nghĩa", "Hoàn thành hội thoại", "Điền từ cho truyện", "Ngữ pháp trong đoạn văn", "Viết câu trả lời ngắn", "Viết đoạn theo gợi ý"] },
      { name: "Nói", time: "7–9 phút", parts: 4, tasks: ["Tìm điểm khác nhau", "Hỏi đáp thông tin", "Kể chuyện theo tranh", "Câu hỏi cá nhân mở rộng"] },
    ],
    practice: [
      { title: "Trao đổi thông tin", skill: "Nói", sample: "Hỏi và trả lời để hoàn thành bảng thông tin." },
      { title: "Câu hỏi văn bản ngắn", skill: "Đọc", sample: "Đọc thông báo, email hoặc truyện ngắn rồi trả lời." },
      { title: "Hoàn thành ghi chú", skill: "Nghe", sample: "Nghe thông tin về lớp học/chuyến đi và điền detail còn thiếu." },
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
function lessonContent(lesson: Lesson) {
  const advanced = ["B2","C1","C2"].some(x => lesson.level.startsWith(x));
  const mid = lesson.level.startsWith("B1") || lesson.level.startsWith("A2 Key");
  const englishTopic = lesson.englishTopic;
  const transcript = advanced
    ? `Host: Today we are exploring ${englishTopic} and the way it influences everyday decisions. Speaker: In my experience, small choices can have a surprisingly significant effect. Although people may disagree about the best approach, listening carefully helps us understand the reasons behind each opinion. Host: What would you recommend? Speaker: I would begin with a practical goal, review the results, and then adapt the plan rather than expecting an immediate perfect solution.`
    : mid
    ? `Anna: Hi Ben. Our topic today is ${englishTopic}. What do you think? Ben: I think it is useful because it is part of everyday life. Anna: Can you give me an example? Ben: Yes. Yesterday I made a simple plan, asked two friends for advice, and then chose the best option. Anna: That sounds sensible. I will try the same idea next time.`
    : `Lucy: Hello, Tom! Today we are learning about ${englishTopic}. Tom: Great! I can see three things in the picture. Lucy: What is your favourite one? Tom: I like the blue one. It is small and friendly. Lucy: Let us listen, point, and say the words together.`;
  const questions = [
    { q:"What is the main topic of the conversation?", options:[englishTopic,"a difficult examination","a sports result"], answer:0, explain:`Người nói giới thiệu ${englishTopic} là chủ đề chính.` },
    { q:advanced ? "What does the speaker recommend?" : "How many things can Tom see?", options:advanced?["Set a goal, review and adapt","Avoid making a plan","Expect a perfect result immediately"]:["Two","Three","Five"], answer:advanced?0:1, explain:advanced?"Người nói khuyên nên đặt mục tiêu, xem lại kết quả rồi điều chỉnh dần.":"Tom nói rằng bạn ấy nhìn thấy ba đồ vật." },
    { q:mid ? "Who did Ben ask for advice?" : advanced ? "Why is careful listening useful?" : "Which one does Tom like?", options:mid?["Two friends","His teacher","Nobody"]:advanced?["It reveals reasons behind opinions","It ends every disagreement","It makes decisions immediate"]:["The blue one","The red one","The big one"], answer:0, explain:mid?"Ben nói rằng bạn ấy đã hỏi ý kiến hai người bạn.":advanced?"Nghe kỹ giúp hiểu lý do phía sau các ý kiến khác nhau.":"Tom nói rằng bạn ấy thích đồ vật màu xanh." }
  ];
  return { transcript, questions, prompt: advanced ? `Give a 60-90 second response about ${englishTopic}. State your view, give an example, acknowledge another perspective and conclude.` : mid ? `Talk for 45 seconds about ${englishTopic}. Give your opinion and two supporting details.` : `Look at the picture and say 4-6 simple sentences about ${englishTopic}.`, target: advanced ? "Độ trôi chảy · độ đa dạng từ vựng · liên kết ý · phát âm" : mid ? "Ý rõ ràng · từ nối · phát âm" : "Từ khóa đúng · câu hoàn chỉnh · âm rõ" };
}

export default function Home() {
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
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recognisedText, setRecognisedText] = useState("");
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const current = levels.find(l => l.id === selected) ?? levels[0];
  const currentExam = cambridgeExamFormats.find(exam => exam.id === examLevelId) ?? cambridgeExamFormats[0];
  const practiceTests = cambridgePracticeBank.filter(test => test.levelId === examLevelId);
  const activePracticeTest = practiceTests.find(test => test.id === practiceTestId) ?? practiceTests[0];
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
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="SpeakUp Cambridge"><span className="brand-mark">▥</span><span>SpeakUp <b>Cambridge</b></span></a>
        <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Mở menu">☰</button>
        <nav className={menu ? "open" : ""}>
          <a href="#roadmap">🗺️ Lộ trình</a><a href="#exam-formats">📝 Dạng đề</a><a href="#lessons">📚 Kho bài học</a><a href="#practice">🎧 Luyện nghe</a><a href="#practice">🎙️ Luyện nói</a><a href="#progress">📈 Tiến độ</a>
        </nav>
        <a className="hello" href="/login">👤 <span>Đăng nhập</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">▥ CAMBRIDGE LISTENING & SPEAKING</div>
          <h1>Nghe chuẩn.<br/><em>Nói tự tin.</em><br/>Chinh phục Cambridge.</h1>
          <p>Lộ trình từ Pre A1 đến C2, tập trung luyện nghe chủ động và phản xạ nói qua bài học ngắn, hội thoại thực tế và phản hồi phát âm.</p>
          <div className="hero-actions"><a className="button primary" href="#roadmap">✨ Kiểm tra trình độ</a><a className="button secondary" href="#roadmap">Khám phá lộ trình →</a></div>
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
      </section>

      <section className="level-rail" id="roadmap">
        <div className="section-heading"><div><span className="kicker">LỘ TRÌNH CAMBRIDGE</span><h2>Chọn đúng cấp độ, tiến bộ từng ngày</h2></div><p>8 chặng học từ làm quen tiếng Anh đến giao tiếp thành thạo.</p></div>
        <div className="levels">{levels.map(l=><button key={l.id} className={`level ${l.color} ${selected===l.id?"selected":""}`} onClick={()=>setSelected(l.id)}><span>{l.icon}</span><b>{l.short}</b><small>{l.name}</small></button>)}</div>
        <div className="level-detail"><div className="detail-title"><span>{current.icon}</span><div><small>CẤP ĐỘ ĐANG CHỌN</small><h3>{current.short} {current.name}</h3><p>{current.age}</p></div></div><div><b>🎧 Mục tiêu Nghe</b><p>{current.listen}</p></div><div><b>🎙️ Mục tiêu Nói</b><p>{current.speak}</p></div><button className="button primary">Bắt đầu học →</button></div>
      </section>

      <section className="method">
        <span className="kicker">PHƯƠNG PHÁP TRỌNG TÂM</span><h2>Nghe chủ động – Nói phản xạ</h2><p className="section-sub">Mỗi bài học đi theo vòng luyện tập ngắn, rõ ràng và có thể lặp lại.</p>
        <div className="method-grid"><article><span>🎧</span><b>1. Nghe lấy ý</b><p>Nghe tình huống tự nhiên để xác định người nói, bối cảnh và ý chính.</p></article><article><span>🔍</span><b>2. Nghe detail</b><p>Phát lại theo tốc độ phù hợp, hoàn thành câu hỏi và mở transcript.</p></article><article><span>🗣️</span><b>3. Nói có hướng dẫn</b><p>Shadowing từng câu, luyện trọng âm, nhịp điệu và âm cuối.</p></article><article><span>🏆</span><b>4. Nói tự do</b><p>Trả lời mở, đóng vai và nhận tiêu chí tự đánh giá theo cấp độ.</p></article></div>
      </section>

      <section className="exam-section" id="exam-formats">
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
              <span className="kicker">NGÂN HÀNG 36 ĐỀ LUYỆN</span>
              <h3>{activePracticeTest.title}</h3>
              <p>{activePracticeTest.level} {activePracticeTest.exam} · Chủ đề: {activePracticeTest.theme}</p>
            </div>
            <select value={activePracticeTest.id} onChange={e=>setPracticeTestId(e.target.value)} aria-label="Chọn đề luyện tập">
              {practiceTests.map(test => <option key={test.id} value={test.id}>{test.title} · {test.theme}</option>)}
            </select>
          </div>
          <div className="test-paper-list">
            {activePracticeTest.papers.map(paper => <article key={paper.paper} className="test-paper">
              <header><b>{paper.paper}</b><span>{paper.time}</span></header>
              <div className="test-items">
                {paper.items.map(item => <section key={`${paper.paper}-${item.part}`}>
                  <div><strong>{item.part.replace("Part", "Phần")}</strong><em>{item.taskType}</em></div>
                  <p>{item.instruction}</p>
                  <ul>
                    <li><b>Câu mẫu:</b> {item.sampleQuestion}</li>
                    <li><b>Đáp án/gợi ý:</b> {item.answerKey}</li>
                    <li><b>Trọng tâm:</b> {item.skillFocus}</li>
                  </ul>
                </section>)}
              </div>
            </article>)}
          </div>
        </div>}
      </section>

      <section className="lesson-section" id="lessons">
        <div className="section-heading"><div><span className="kicker">KHO 280 BÀI HỌC</span><h2>Học theo tình huống thực tế</h2><p className="catalog-summary">35 bài cho mỗi chặng · Tập trung Nghe và Nói · Từ Pre A1 đến C2</p></div><div className="filters">{["Tất cả","Trẻ em","Thiếu niên","Người lớn"].map(f=><button key={f} className={filter===f?"active":""} onClick={()=>changeFilter(f,"type")}>{f}</button>)}</div></div>
        <div className="catalog-tools"><label className="search-box">⌕ <input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Tìm chủ đề, dạng bài..." /></label><select value={levelFilter} onChange={e=>changeFilter(e.target.value,"level")}><option>Tất cả cấp độ</option>{levelCatalog.map(l=><option key={l[0]}>{l[0]}</option>)}</select><span><b>{filteredLessons.length}</b> bài phù hợp</span></div>
        <div className="lesson-grid">{visibleLessons.map(l=><article key={l.id} onClick={()=>openDetail(l)}><div className="lesson-visual"><span>{l.icon}</span><button aria-label={`Mở ${l.title}`}>▶</button><i>{l.skill}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{l.level}</span><span>{l.exam}</span></div><h3>{l.title}</h3><p>{l.topic}</p><div className="format">🎯 {l.format}</div><footer><span>🎧 + 🎙️</span><span>⏱ {l.time}</span></footer></div></article>)}</div>
        {visibleLessons.length === 0 && <div className="empty-state">Không tìm thấy bài phù hợp. Hãy thử từ khóa hoặc bộ lọc khác.</div>}
        <div className="pagination"><button disabled={page===1} onClick={()=>setPage(p=>p-1)}>← Trước</button><span>Trang <b>{page}</b> / {totalPages}</span><button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Sau →</button></div>
      </section>

      <section className="progress-section" id="progress"><div><span className="kicker light">TIẾN BỘ MỖI NGÀY</span><h2>Biết mình đang ở đâu<br/>và cần luyện gì tiếp theo.</h2><p>Theo dõi số phút nghe, lượt nói, từ vựng đã học và mức độ hoàn thành từng kỹ năng.</p><a className="button white" href="#top">Bắt đầu lộ trình miễn phí →</a></div><div className="dashboard"><div className="streak">🔥 <b>7 ngày</b><small>Chuỗi học liên tục</small></div><div className="stats"><span><b>84</b><small>phút nghe</small></span><span><b>36</b><small>lượt nói</small></span><span><b>12</b><small>bài hoàn thành</small></span></div><div className="bars"><p>Nghe <span>72%</span></p><i><b style={{width:"72%"}}/></i><p>Nói <span>58%</span></p><i><b style={{width:"58%"}}/></i></div></div></section>

      {openLesson && detail && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={closeDetail}/><div className="lesson-panel"><button className="close" onClick={closeDetail}>×</button><header><span className="lesson-icon">{openLesson.icon}</span><div><span className="pill blue">{openLesson.level} · {openLesson.exam}</span><h2>{openLesson.title}</h2><p>{openLesson.topic} · {openLesson.time}</p></div></header><div className="lesson-tabs"><span>1. Nghe hiểu</span><span>2. Kiểm tra</span><span>3. Luyện nói</span></div><section className="listen-block"><h3>🎧 Bài nghe</h3><div className="accent-picker"><b>Chọn giọng đọc:</b><button className={accent==="en-GB"?"selected":""} onClick={()=>setAccent("en-GB")}>🇬🇧 Anh–Anh</button><button className={accent==="en-US"?"selected":""} onClick={()=>setAccent("en-US")}>🇺🇸 Anh–Mỹ</button></div><div className="audio-player"><button onClick={playLesson}>{lessonAudio?"Ⅱ":"▶"}</button><Wave active={lessonAudio}/><span>{lessonAudio?"Đang phát...":accent==="en-GB"?"Giọng Anh–Anh · 1×":"Giọng Anh–Mỹ · 1×"}</span></div><button className="transcript-toggle" onClick={()=>setShowTranscript(!showTranscript)}>{showTranscript?"Ẩn transcript":"Hiện transcript sau khi nghe"}</button>{showTranscript&&<div className="transcript">{detail.transcript}</div>}</section><section><h3>✅ Câu hỏi nghe hiểu</h3><div className="quiz">{detail.questions.map((q,i)=><article key={q.q}><b>{i+1}. {q.q}</b>{q.options.map((o,j)=><label key={o} className={checked?(j===q.answer?"correct":answers[i]===j?"wrong":""):""}><input type="radio" name={`q${i}`} checked={answers[i]===j} onChange={()=>setAnswers(a=>({...a,[i]:j}))}/>{o}</label>)}{checked&&<p>💡 {q.explain}</p>}</article>)}</div><button className="button primary" onClick={()=>setChecked(true)}>Chấm bài ({Object.keys(answers).length}/3)</button>{checked&&<strong className="score">Kết quả: {detail.questions.filter((q,i)=>answers[i]===q.answer).length}/3 câu đúng</strong>}</section><section className="speaking-practice"><h3>🎙️ Luyện nói & tự chấm</h3><p>{detail.prompt}</p><div className="target">Tiêu chí: {detail.target}</div><button className={`record-button ${speaking?"active":""}`} onClick={recordSpeech}>🎙️ <b>{speaking?"Dừng và lưu bản ghi":"Bắt đầu nói"}</b><small>{speaking?"Đang ghi âm – nhấn để hoàn thành":"Cho phép micro để ghi âm"}</small></button>{speaking&&<Wave active/>}{recordingUrl&&<div className="recording-result"><audio controls src={recordingUrl}/><button onClick={downloadRecording}>⇩ Tải tệp ghi âm</button></div>}{recognisedText&&<div className="ai-feedback"><b>Nhận diện giọng nói: {pronunciationScore}%</b><p>Hệ thống nghe được: “{recognisedText}”</p><small>Điểm dựa trên mức độ nhận diện câu nói; hãy nghe lại bản ghi để tự điều chỉnh âm, nhịp và trọng âm.</small></div>}<p className="privacy-note">Tệp ghi âm chỉ được giữ trong trình duyệt và có thể tải về máy; không tự động tải lên máy chủ.</p></section></div></div>}
      <footer className="footer"><div className="brand"><span className="brand-mark">▥</span><span>SpeakUp <b>Cambridge</b></span></div><p>Nền tảng luyện Nghe – Nói theo lộ trình Cambridge và CEFR.</p><span>Nội dung tham khảo cấu trúc Cambridge English; không phải website chính thức của Cambridge.</span></footer>
    </main>
  );
}
