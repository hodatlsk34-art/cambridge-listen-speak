"use client";

import { useMemo, useRef, useState } from "react";

const fluencyStages = [
  { id: "beginner", label: "Beginner", vi: "Bắt đầu", level: "A0-Pre A1", icon: "A0", promise: "Nghe âm, bắt từ khóa và nói câu rất ngắn.", goals: ["Nghe âm", "Bắt chước", "Câu 3-5 từ", "Phản xạ Yes/No"] },
  { id: "elementary", label: "Elementary", vi: "Sơ cấp", level: "A1", icon: "A1", promise: "Giao tiếp nhu cầu hằng ngày bằng câu đơn giản.", goals: ["Hỏi đáp cơ bản", "Tự giới thiệu", "Nói nhu cầu", "Hội thoại 5 lượt"] },
  { id: "pre-intermediate", label: "Pre-Intermediate", vi: "Tiền trung cấp", level: "A2", icon: "A2", promise: "Mô tả, kể chuyện ngắn và hỏi lại khi chưa rõ.", goals: ["Mô tả", "Kể chuyện ngắn", "Thêm lý do", "Hỏi lại lịch sự"] },
  { id: "intermediate", label: "Intermediate", vi: "Trung cấp", level: "B1", icon: "B1", promise: "Duy trì hội thoại đời sống thật và giải thích ý rõ ràng.", goals: ["Nói 2 phút", "Giải thích lý do", "Hỏi tiếp", "Xử lý tình huống"] },
  { id: "upper-intermediate", label: "Upper-Intermediate", vi: "Trên trung cấp", level: "B2", icon: "B2", promise: "Thảo luận, so sánh lựa chọn và bảo vệ quan điểm.", goals: ["So sánh", "Nêu quan điểm", "Phản hồi", "Thảo luận 3 phút"] },
  { id: "advanced", label: "Advanced", vi: "Nâng cao", level: "C1", icon: "C1", promise: "Trình bày linh hoạt trong học tập, công việc và xã hội.", goals: ["Trình bày", "Tóm tắt", "Phát triển ý", "Điều chỉnh ngôn ngữ"] },
  { id: "proficient", label: "Proficient", vi: "Thông hiểu - thành thạo", level: "C2", icon: "C2", promise: "Dùng tiếng Anh tự nhiên như ngôn ngữ thứ hai.", goals: ["Sắc thái", "Tự nhiên", "Linh hoạt", "Gần như tự động"] },
] as const;

type FluencyStageId = (typeof fluencyStages)[number]["id"];

const roadmap = [
  { id: "foundation", level: "A0 - Pre A1", title: "Nghe âm trước, nói theo ngay", goal: "Xây phản xạ âm thanh: nghe được từ khóa và nói câu rất ngắn.", output: "Tự chào hỏi, gọi tên đồ vật, trả lời câu hỏi đơn giản." },
  { id: "daily", level: "A1", title: "Sinh hoạt hằng ngày", goal: "Nói được nhu cầu thật: ăn uống, lớp học, gia đình, thời gian, địa điểm.", output: "Tạo hội thoại 4-6 lượt trong tình huống quen thuộc." },
  { id: "story", level: "A2", title: "Mô tả, kể chuyện, hỏi lại", goal: "Nói theo tranh, kể việc đã xảy ra, hỏi lại khi chưa rõ.", output: "Nói liên tục 45-60 giây về một chủ đề đời sống." },
  { id: "conversation", level: "B1", title: "Hội thoại đời sống thật", goal: "Phản xạ trong trường học, du lịch, dịch vụ, sức khỏe an toàn, công nghệ.", output: "Duy trì hội thoại 2-3 phút, có lý do và ví dụ." },
  { id: "discussion", level: "B2", title: "Nêu quan điểm và tương tác", goal: "Nghe ý kiến khác nhau, phản hồi, đồng ý, không đồng ý lịch sự.", output: "Thảo luận vấn đề quen thuộc với lập luận rõ." },
  { id: "second-language", level: "C1 - C2", title: "Tiếng Anh như ngôn ngữ thứ hai", goal: "Dùng tiếng Anh để học, làm việc, trình bày, thương lượng và suy nghĩ.", output: "Nói tự nhiên, chính xác, linh hoạt theo người nghe và mục đích." },
] as const;

const levelBands = [
  { stageId: "beginner", level: "A0-Pre A1", turns: 4, speak: "Nói 4-5 câu ngắn, rõ âm và đúng nhịp." },
  { stageId: "elementary", level: "A1", turns: 5, speak: "Tạo hội thoại 5 lượt, có chào hỏi và trả lời ngắn." },
  { stageId: "pre-intermediate", level: "A2", turns: 6, speak: "Đóng vai 6 lượt, thêm lý do hoặc thời gian." },
  { stageId: "intermediate", level: "B1", turns: 7, speak: "Duy trì hội thoại 2 phút, hỏi lại và giải thích rõ." },
  { stageId: "upper-intermediate", level: "B2", turns: 8, speak: "Thảo luận 2-3 phút, so sánh hai lựa chọn và nêu quan điểm." },
  { stageId: "advanced", level: "C1", turns: 9, speak: "Trình bày linh hoạt 3 phút, có ví dụ, phản hồi và kết luận." },
  { stageId: "proficient", level: "C2", turns: 10, speak: "Diễn đạt tự nhiên 3-4 phút, có sắc thái, phản hồi và tổng kết." },
] as const;

const topicSeeds = [
  ["Morning routine", "Thói quen buổi sáng", "morning routine", "thói quen buổi sáng"],
  ["Breakfast choices", "Lựa chọn bữa sáng", "breakfast choices", "lựa chọn bữa sáng"],
  ["Getting ready for school", "Chuẩn bị đi học", "getting ready for school", "chuẩn bị đi học"],
  ["Packing a bag", "Chuẩn bị cặp hoặc túi", "packing a bag", "chuẩn bị cặp hoặc túi"],
  ["Family chores", "Việc nhà trong gia đình", "family chores", "việc nhà trong gia đình"],
  ["Helping at home", "Giúp đỡ ở nhà", "helping at home", "giúp đỡ ở nhà"],
  ["Classroom instructions", "Hướng dẫn trong lớp học", "classroom instructions", "hướng dẫn trong lớp học"],
  ["Asking for help", "Nhờ giúp đỡ", "asking for help", "nhờ giúp đỡ"],
  ["Homework planning", "Lập kế hoạch làm bài tập", "homework planning", "lập kế hoạch làm bài tập"],
  ["Library visit", "Đi thư viện", "library visit", "đi thư viện"],
  ["School project", "Dự án ở trường", "school project", "dự án ở trường"],
  ["Group work", "Làm việc nhóm", "group work", "làm việc nhóm"],
  ["Making friends", "Làm quen bạn mới", "making friends", "làm quen bạn mới"],
  ["Inviting a friend", "Mời bạn tham gia hoạt động", "inviting a friend", "mời bạn tham gia hoạt động"],
  ["Birthday plans", "Kế hoạch sinh nhật", "birthday plans", "kế hoạch sinh nhật"],
  ["Weekend activities", "Hoạt động cuối tuần", "weekend activities", "hoạt động cuối tuần"],
  ["Sports practice", "Luyện tập thể thao", "sports practice", "luyện tập thể thao"],
  ["Music and hobbies", "Âm nhạc và sở thích", "music and hobbies", "âm nhạc và sở thích"],
  ["Art and creativity", "Mỹ thuật và sáng tạo", "art and creativity", "mỹ thuật và sáng tạo"],
  ["Reading stories", "Đọc truyện", "reading stories", "đọc truyện"],
  ["Watching a video for learning", "Xem video để học", "watching a video for learning", "xem video để học"],
  ["Using a learning app", "Dùng ứng dụng học tập", "using a learning app", "dùng ứng dụng học tập"],
  ["Screen time balance", "Cân bằng thời gian dùng màn hình", "screen time balance", "cân bằng thời gian dùng màn hình"],
  ["Online class", "Lớp học trực tuyến", "online class", "lớp học trực tuyến"],
  ["Shopping for school supplies", "Mua đồ dùng học tập", "shopping for school supplies", "mua đồ dùng học tập"],
  ["Buying clothes", "Mua quần áo", "buying clothes", "mua quần áo"],
  ["Choosing a gift", "Chọn quà", "choosing a gift", "chọn quà"],
  ["Ordering food", "Gọi món ăn", "ordering food", "gọi món ăn"],
  ["Cooking together", "Cùng nhau nấu ăn", "cooking together", "cùng nhau nấu ăn"],
  ["Healthy snacks", "Đồ ăn nhẹ lành mạnh", "healthy snacks", "đồ ăn nhẹ lành mạnh"],
  ["Weather changes", "Thời tiết thay đổi", "weather changes", "thời tiết thay đổi"],
  ["Choosing clothes for the weather", "Chọn trang phục theo thời tiết", "choosing clothes for the weather", "chọn trang phục theo thời tiết"],
  ["Going to the park", "Đi công viên", "going to the park", "đi công viên"],
  ["At the playground", "Ở sân chơi", "at the playground", "ở sân chơi"],
  ["Taking a bus", "Đi xe buýt", "taking a bus", "đi xe buýt"],
  ["Asking for directions", "Hỏi đường", "asking for directions", "hỏi đường"],
  ["Planning a trip", "Lập kế hoạch chuyến đi", "planning a trip", "lập kế hoạch chuyến đi"],
  ["At the train station", "Ở ga tàu", "at the train station", "ở ga tàu"],
  ["At the airport", "Ở sân bay", "at the airport", "ở sân bay"],
  ["Hotel check-in", "Nhận phòng khách sạn", "hotel check-in", "nhận phòng khách sạn"],
  ["Visiting a museum", "Tham quan bảo tàng", "visiting a museum", "tham quan bảo tàng"],
  ["Taking photos politely", "Chụp ảnh lịch sự", "taking photos politely", "chụp ảnh lịch sự"],
  ["Lost and found", "Hỏi đồ thất lạc", "lost and found", "hỏi đồ thất lạc"],
  ["Making an appointment", "Đặt lịch hẹn", "making an appointment", "đặt lịch hẹn"],
  ["Talking about safe habits", "Nói về thói quen an toàn", "talking about safe habits", "nói về thói quen an toàn"],
  ["Feeling tired after a busy day", "Cảm thấy mệt sau một ngày bận rộn", "feeling tired after a busy day", "cảm thấy mệt sau một ngày bận rộn"],
  ["Encouraging a friend", "Động viên bạn bè", "encouraging a friend", "động viên bạn bè"],
  ["Solving a small problem", "Giải quyết vấn đề nhỏ", "solving a small problem", "giải quyết vấn đề nhỏ"],
  ["Apologising politely", "Xin lỗi lịch sự", "apologising politely", "xin lỗi lịch sự"],
  ["Giving thanks", "Nói lời cảm ơn", "giving thanks", "nói lời cảm ơn"],
  ["Making a suggestion", "Đưa ra gợi ý", "making a suggestion", "đưa ra gợi ý"],
  ["Choosing between two options", "Chọn giữa hai phương án", "choosing between two options", "chọn giữa hai phương án"],
  ["Explaining an opinion", "Giải thích quan điểm", "explaining an opinion", "giải thích quan điểm"],
  ["Talking about future goals", "Nói về mục tiêu tương lai", "talking about future goals", "nói về mục tiêu tương lai"],
  ["Preparing a presentation", "Chuẩn bị bài thuyết trình", "preparing a presentation", "chuẩn bị bài thuyết trình"],
  ["Joining a club", "Tham gia câu lạc bộ", "joining a club", "tham gia câu lạc bộ"],
  ["Community clean-up", "Dọn dẹp cộng đồng", "community clean-up", "dọn dẹp cộng đồng"],
  ["Saving energy at home", "Tiết kiệm năng lượng ở nhà", "saving energy at home", "tiết kiệm năng lượng ở nhà"],
  ["Recycling at school", "Tái chế ở trường", "recycling at school", "tái chế ở trường"],
  ["Caring for plants", "Chăm sóc cây", "caring for plants", "chăm sóc cây"],
] as const;

const lessonVariants = [
  {
    id: "core",
    label: "Tình huống cơ bản",
    focus: "hiểu tình huống chính và nói lại câu mẫu",
    viFocus: "hiểu tình huống chính và nói lại câu mẫu",
  },
  {
    id: "reflex",
    label: "Phản xạ mở rộng",
    focus: "ask a follow-up question and change the information",
    viFocus: "hỏi tiếp và thay đổi thông tin",
  },
  {
    id: "real-life",
    label: "Ứng dụng đời sống",
    focus: "connect the topic to a real-life plan or opinion",
    viFocus: "liên hệ chủ đề với kế hoạch hoặc quan điểm trong đời sống",
  },
] as const;

function makeLines(seed: (typeof topicSeeds)[number], bandIndex: number, stageLabel: string, variant: (typeof lessonVariants)[number]) {
  const [titleEn, titleVi, phraseEn, phraseVi] = seed;
  const lines = [
    [`Can we talk about ${phraseEn}?`, `Chúng ta có thể nói về ${phraseVi} không?`],
    [`Sure. ${titleEn} is part of everyday life.`, `Được. ${titleVi} là một phần của cuộc sống hằng ngày.`],
    [`What should I say first?`, `Trước tiên tôi nên nói gì?`],
    [`Start with one clear sentence and a real example.`, `Hãy bắt đầu bằng một câu rõ ràng và một ví dụ thật.`],
    [`This lesson helps me ${variant.focus}.`, `Bài này giúp tôi ${variant.viFocus}.`],
    [`For ${stageLabel.toLowerCase()}, this topic should sound natural and useful.`, `Ở cấp ${stageLabel.toLowerCase()}, chủ đề này cần tự nhiên và hữu ích.`],
    [`I can add a reason, such as time, place, or feeling.`, `Tôi có thể thêm lý do, chẳng hạn như thời gian, địa điểm hoặc cảm xúc.`],
    [`If I do not understand, I can ask: Could you say that again?`, `Nếu chưa hiểu, tôi có thể hỏi: Bạn nói lại được không?`],
    [`Then I should answer in my own words, not only repeat the model.`, `Sau đó tôi nên trả lời bằng lời của mình, không chỉ lặp lại câu mẫu.`],
    [`At the end, I can summarise the idea and connect it to my life.`, `Cuối cùng, tôi có thể tóm tắt ý và liên hệ với cuộc sống của mình.`],
    [`My final answer should be clear, personal, and easy to understand.`, `Câu trả lời cuối của tôi nên rõ ràng, mang tính cá nhân và dễ hiểu.`],
  ];
  return lines.slice(0, levelBands[bandIndex].turns);
}

const topics = levelBands.flatMap((band, bandIndex) =>
  topicSeeds.flatMap((seed, seedIndex) =>
    lessonVariants.map((variant, variantIndex) => ({
      id: `${band.stageId}-${seedIndex + 1}-${variant.id}`,
      en: `${seed[0]} - ${variant.label}`,
      vi: `${seed[1]} - ${variant.label}`,
      baseTopic: seed[1],
      level: band.level,
      stageId: band.stageId,
      variant: variant.label,
      lines: makeLines(seed, bandIndex, band.level, variant),
      listenTask: `Nghe hội thoại về ${seed[3]} để xác định chủ đề, ví dụ và phần ${variant.viFocus}.`,
      speakTask: `${band.speak} Chủ đề: ${seed[1]}. Bài ${variantIndex + 1}: ${variant.label}.`,
    }))
  )
);

type Topic = (typeof topics)[number];
type ActiveView = "overview" | "roadmap" | "programs" | "method" | "topics";

function Wave({ active = false }: { active?: boolean }) {
  return <div className={`wave ${active ? "active" : ""}`}>{[16,28,18,42,52,24,48,33,20,44,58,31,18,46,34,24,52,29,40,16].map((height, index) => <span key={index} style={{ height }} />)}</div>;
}

function buildTranscript(topic: Topic) {
  return topic.lines.map(([english]) => english).join(" ");
}

function speakingDrills(topic: Topic) {
  return [
    { en: topic.lines[0][0], vi: topic.lines[0][1], action: "Nghe và nói lại đúng nhịp." },
    { en: topic.lines[1][0], vi: topic.lines[1][1], action: "Đổi thông tin thành câu của bạn." },
    { en: `In my life, ${topic.en.toLowerCase()} is important because I use English to explain real situations.`, vi: `Trong cuộc sống của tôi, ${topic.vi.toLowerCase()} quan trọng vì tôi dùng tiếng Anh để giải thích tình huống thật.`, action: "Nói câu mở rộng 1-2 lần, sau đó ghi âm." },
  ];
}

function topicQuestions(topic: Topic) {
  return [
    { q: "What is the main topic?", vi: "Chủ đề chính là gì?", answer: topic.en },
    { q: "Say one useful sentence from the dialogue.", vi: "Hãy nói một câu hữu ích trong hội thoại.", answer: topic.lines[0][0] },
    { q: "How can you use this topic in real life?", vi: "Bạn có thể dùng chủ đề này trong đời sống như thế nào?", answer: topic.speakTask },
  ];
}

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const [stage, setStage] = useState<FluencyStageId>("beginner");
  const [query, setQuery] = useState("");
  const [openTopic, setOpenTopic] = useState<Topic | null>(null);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const selectedStage = fluencyStages.find((item) => item.id === stage) ?? fluencyStages[0];
  const filteredTopics = useMemo(() => topics.filter((topic) =>
    topic.stageId === stage &&
    (!query || `${topic.en} ${topic.vi} ${topic.level}`.toLowerCase().includes(query.toLowerCase()))
  ), [stage, query]);

  const openView = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const playTopic = (topic: Topic) => {
    window.speechSynthesis.cancel();
    if (playing) {
      setPlaying(false);
      return;
    }
    const voice = new SpeechSynthesisUtterance(buildTranscript(topic));
    voice.lang = "en-GB";
    voice.rate = topic.level.startsWith("A0") || topic.level.startsWith("A1") ? 0.78 : 0.92;
    voice.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(voice);
  };

  const recordSpeech = async () => {
    if (recording && recorderRef.current) {
      recorderRef.current.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (recordingUrl) URL.revokeObjectURL(recordingUrl);
        setRecordingUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
      };
      recorder.start();
      setRecording(true);
    } catch {
      alert("Bạn cần cho phép micro để ghi âm phần nói.");
    }
  };

  return (
    <main id="top" className="app-shell">
      <header className="header app-header">
        <button className="brand brand-button" onClick={() => openView("overview")} aria-label="SpeakUp Second Language"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></button>
        <nav className="app-nav" aria-label="Menu nội dung">
          <button className={activeView === "overview" ? "active" : ""} onClick={() => openView("overview")}>Tổng quan</button>
          <button className={activeView === "roadmap" ? "active" : ""} onClick={() => openView("roadmap")}>Lộ trình</button>
          <button className={activeView === "programs" ? "active" : ""} onClick={() => openView("programs")}>Cấp độ</button>
          <button className={activeView === "method" ? "active" : ""} onClick={() => openView("method")}>Phản xạ</button>
          <button className={activeView === "topics" ? "active" : ""} onClick={() => openView("topics")}>Chủ đề</button>
        </nav>
        <a className="hello" href="/login">Đăng nhập</a>
      </header>

      <section className="app-view">
        {activeView === "overview" && <div className="hero app-panel">
          <div className="hero-copy">
            <div className="eyebrow">NGHE - NÓI PHẢN XẠ</div>
            <h1>Biến tiếng Anh<br/><em>thành ngôn ngữ thứ hai.</em></h1>
            <p>Ứng dụng được cấu trúc theo menu. Bạn chọn một mục ở trên, nội dung tương ứng mới hiện ra, không còn kiểu landing page phải kéo dài liên tục.</p>
            <div className="hero-actions"><button className="button primary" onClick={() => openView("programs")}>Chọn cấp độ</button><button className="button secondary" onClick={() => openView("topics")}>Vào bài song ngữ</button></div>
            <div className="trust-row"><span>Tiếng Việt có dấu đầy đủ</span><span>Luyện nói trước câu hỏi</span><span>Beginner đến thành thạo</span></div>
          </div>
          <div className="audio-lab compact-lab"><div className="audio-card"><div className="card-top"><div><span className="pill yellow">{selectedStage.label} · {selectedStage.vi} · {selectedStage.level}</span><h2>{selectedStage.promise}</h2></div><span className="big-emoji">{selectedStage.icon}</span></div><Wave active={playing}/><div className="player"><button onClick={() => filteredTopics[0] && playTopic(filteredTopics[0])}>{playing ? "Ⅱ" : "▶"}</button><div><b>Nghe mẫu hội thoại thật</b><small>Nghe tiếng Anh trước, mở dịch Việt sau, rồi nói lại.</small></div><span>listen · repeat · speak</span></div></div></div>
        </div>}

        {activeView === "roadmap" && <div className="level-rail app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH TỔNG THỂ</span><h2>Từ người mới bắt đầu đến dùng tiếng Anh tự nhiên</h2></div><p>Mỗi chặng có đầu ra nghe - nói rõ ràng.</p></div><div className="lesson-grid">{roadmap.map((stage) => <article key={stage.id}><div className="lesson-visual"><span>{stage.level}</span></div><div className="lesson-body"><h3>{stage.title}</h3><p>{stage.goal}</p><div className="format">Đầu ra: {stage.output}</div></div></article>)}</div></div>}

        {activeView === "programs" && <div className="tracks-section app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH THEO NĂNG LỰC</span><h2>Từ Beginner đến thông hiểu - thành thạo</h2></div><p>Chọn cấp độ hiện tại để lọc chủ đề, độ dài hội thoại và bài luyện nói phù hợp.</p></div><div className="track-grid">{fluencyStages.map((item) => <article key={item.id} className={stage === item.id ? "selected-card" : ""} onClick={() => setStage(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{`${item.vi} · ${item.level}`}</small><p>{item.promise}</p><ul>{item.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul><button className="button secondary" onClick={(event) => { event.stopPropagation(); setStage(item.id); openView("topics"); }}>Xem chủ đề</button></article>)}</div></div>}

        {activeView === "method" && <div className="method app-panel"><span className="kicker">CÔNG THỨC PHẢN XẠ</span><h2>Nghe trước, luyện nói song ngữ, rồi mới trả lời câu hỏi</h2><p className="section-sub">Cấu trúc mỗi bài: bài nghe song ngữ, bài luyện nói song ngữ, ghi âm, sau đó mới đến câu hỏi kiểm tra.</p><div className="method-grid"><article><span>1</span><b>Nghe không nhìn chữ</b><p>Bắt bối cảnh, người nói, ý chính.</p></article><article><span>2</span><b>Mở song ngữ</b><p>Đọc câu tiếng Anh kèm dịch Việt.</p></article><article><span>3</span><b>Luyện nói song ngữ</b><p>Nói câu mẫu, hiểu nghĩa, rồi đổi thành câu của mình.</p></article><article><span>4</span><b>Câu hỏi sau cùng</b><p>Trả lời để kiểm tra nghe hiểu và khả năng dùng câu.</p></article></div></div>}

        {activeView === "topics" && <div className="lesson-section app-panel"><div className="section-heading"><div><span className="kicker">CHỦ ĐỀ SONG NGỮ</span><h2>{selectedStage.label}: bài nghe - nói theo đời sống</h2><p className="catalog-summary">Mỗi chủ đề đều có bài luyện nói song ngữ trước phần câu hỏi.</p></div><div className="filters">{fluencyStages.map((item) => <button key={item.id} className={stage === item.id ? "active" : ""} onClick={() => setStage(item.id)}>{item.label}</button>)}</div></div><div className="catalog-tools"><label className="search-box">Tìm <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="chủ đề, bản dịch, cấp độ..." /></label><span><b>{filteredTopics.length}</b> chủ đề phù hợp</span></div><div className="lesson-grid">{filteredTopics.map((topic) => <article key={topic.id} onClick={() => setOpenTopic(topic)}><div className="lesson-visual"><span>{topic.level}</span><button aria-label={`Mở ${topic.vi}`}>▶</button><i>{selectedStage.label}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{topic.en}</span></div><h3>{topic.vi}</h3><p>{topic.listenTask}</p><div className="format">Luyện nói: {topic.speakTask}</div><footer><span>Anh - Việt</span><span>12-18 phút</span></footer></div></article>)}</div></div>}
      </section>

      {openTopic && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={() => setOpenTopic(null)}/><div className="lesson-panel"><button className="close" onClick={() => setOpenTopic(null)}>×</button><header><span className="lesson-icon">{openTopic.level}</span><div><span className="pill blue">{openTopic.en}</span><h2>{openTopic.vi}</h2><p>Thứ tự: nghe song ngữ → luyện nói song ngữ → ghi âm → câu hỏi.</p></div></header><section className="listen-block"><h3>1. Bài nghe song ngữ</h3><div className="audio-player"><button onClick={() => playTopic(openTopic)}>{playing ? "Ⅱ" : "▶"}</button><Wave active={playing}/><span>Nghe tiếng Anh bằng giọng đọc trình duyệt</span></div><button className="transcript-toggle" onClick={() => setShowVietnamese(!showVietnamese)}>{showVietnamese ? "Ẩn dịch tiếng Việt" : "Hiện dịch tiếng Việt"}</button><div className="transcript bilingual-lines">{openTopic.lines.map(([en, vi]) => <p key={en}><b>{en}</b>{showVietnamese && <span>{vi}</span>}</p>)}</div></section><section><h3>2. Bài luyện nói song ngữ</h3><div className="speaking-drill-list">{speakingDrills(openTopic).map((drill) => <article key={drill.en}><b>{drill.en}</b><span>{drill.vi}</span><small>{drill.action}</small></article>)}</div><p><b>Nhiệm vụ nói:</b> {openTopic.speakTask}</p></section><section className="speaking-practice"><h3>3. Ghi âm luyện nói</h3><p>Nói lại câu mẫu, sau đó đổi thông tin thành câu của bạn: người, nơi chốn, lý do, thời gian.</p><button className={`record-button ${recording ? "active" : ""}`} onClick={recordSpeech}><b>{recording ? "Dừng và lưu bản ghi" : "Bắt đầu nói"}</b><small>{recording ? "Đang ghi âm" : "Cho phép micro để luyện nói"}</small></button>{recordingUrl && <div className="recording-result"><audio controls src={recordingUrl}/></div>}</section><section><h3>4. Câu hỏi sau luyện nói</h3><div className="question-list">{topicQuestions(openTopic).map((item) => <article key={item.q}><b>{item.q}</b><span>{item.vi}</span><small>Gợi ý: {item.answer}</small></article>)}</div></section></div></div>}
      <footer className="footer"><div className="brand"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></div><p>Chương trình luyện nghe - nói phản xạ, hướng tới dùng tiếng Anh như ngôn ngữ thứ hai.</p><span>Nội dung tự biên soạn, có dịch tiếng Việt để hỗ trợ hiểu và luyện nói.</span></footer>
    </main>
  );
}
