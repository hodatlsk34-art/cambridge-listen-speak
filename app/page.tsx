"use client";

import { useMemo, useRef, useState } from "react";

const programs = [
  { id: "kids", label: "Trẻ em", age: "6-11 tuổi", icon: "ABC", promise: "Nghe âm, bắt chước, nói câu ngắn qua tranh và trò chơi.", stages: ["Âm và từ", "Câu ngắn", "Hỏi đáp", "Kể chuyện bằng tranh"] },
  { id: "teens", label: "Thiếu niên", age: "12-17 tuổi", icon: "CHAT", promise: "Phản xạ hội thoại ở trường, bạn bè, sở thích, học tập và đời sống.", stages: ["Hỏi nhanh", "Trả lời có lý do", "Mô tả tình huống", "Thảo luận ngắn"] },
  { id: "adults", label: "Người lớn", age: "18+", icon: "WORK", promise: "Dùng tiếng Anh trong công việc, du lịch, dịch vụ, gia đình và xã hội.", stages: ["Giao tiếp sinh tồn", "Hội thoại thực tế", "Trình bày ý", "Thảo luận linh hoạt"] },
] as const;

const roadmap = [
  { id: "foundation", level: "A0 - Pre A1", title: "Nghe âm trước, nói theo ngay", goal: "Xây phản xạ âm thanh: nghe được từ khóa và nói câu rất ngắn.", output: "Tự chào hỏi, gọi tên đồ vật, trả lời câu hỏi đơn giản." },
  { id: "daily", level: "A1", title: "Sinh hoạt hằng ngày", goal: "Nói được nhu cầu thật: ăn uống, lớp học, gia đình, thời gian, địa điểm.", output: "Tạo hội thoại 4-6 lượt trong tình huống quen thuộc." },
  { id: "story", level: "A2", title: "Mô tả, kể chuyện, hỏi lại", goal: "Nói theo tranh, kể việc đã xảy ra, hỏi lại khi chưa rõ.", output: "Nói liên tục 45-60 giây về một chủ đề đời sống." },
  { id: "conversation", level: "B1", title: "Hội thoại đời sống thật", goal: "Phản xạ trong trường học, du lịch, dịch vụ, sức khỏe an toàn, công nghệ.", output: "Duy trì hội thoại 2-3 phút, có lý do và ví dụ." },
  { id: "discussion", level: "B2", title: "Nêu quan điểm và tương tác", goal: "Nghe ý kiến khác nhau, phản hồi, đồng ý, không đồng ý lịch sự.", output: "Thảo luận vấn đề quen thuộc với lập luận rõ." },
  { id: "second-language", level: "C1 - C2", title: "Tiếng Anh như ngôn ngữ thứ hai", goal: "Dùng tiếng Anh để học, làm việc, trình bày, thương lượng và suy nghĩ.", output: "Nói tự nhiên, chính xác, linh hoạt theo người nghe và mục đích." },
] as const;

const topics = [
  { id: "family", en: "Family and daily life", vi: "Gia đình và sinh hoạt hằng ngày", level: "A0-A1", track: "kids", lines: [["Who is in your family?", "Gia đình bạn có những ai?"], ["I live with my parents and my younger sister.", "Tôi sống cùng bố mẹ và em gái."], ["What do you usually do after school?", "Bạn thường làm gì sau giờ học?"], ["I have a snack, do homework, and play for a while.", "Tôi ăn nhẹ, làm bài tập và chơi một lúc."]], listenTask: "Nghe và chọn đúng người, hoạt động, thời gian.", speakTask: "Nói 5 câu về gia đình và một thói quen mỗi ngày." },
  { id: "school", en: "School, friends and learning", vi: "Trường học, bạn bè và việc học", level: "A1-A2", track: "kids", lines: [["Which subject do you like most?", "Bạn thích môn học nào nhất?"], ["I like science because we do experiments.", "Tôi thích khoa học vì chúng tôi làm thí nghiệm."], ["Can you help me with this exercise?", "Bạn có thể giúp tôi bài này không?"], ["Sure. Let's read the example first.", "Được. Hãy đọc ví dụ trước."]], listenTask: "Nghe để xác định môn học, lý do và lời đề nghị giúp đỡ.", speakTask: "Đóng vai hỏi bạn về môn học yêu thích và cách học tốt hơn." },
  { id: "food", en: "Food, drinks and ordering", vi: "Đồ ăn, thức uống và gọi món", level: "A1-A2", track: "kids", lines: [["Could I have a bowl of noodles, please?", "Cho tôi một bát mì được không?"], ["Would you like anything to drink?", "Bạn muốn uống gì không?"], ["A glass of orange juice, please.", "Cho tôi một ly nước cam."], ["That's all, thank you.", "Vậy là đủ rồi, cảm ơn."]], listenTask: "Nghe và ghi món ăn, đồ uống, số lượng.", speakTask: "Thực hành gọi món lịch sự bằng 4 lượt thoại." },
  { id: "travel", en: "Travel and directions", vi: "Du lịch và hỏi đường", level: "A2-B1", track: "teens", lines: [["Excuse me, how can I get to the museum?", "Xin lỗi, tôi đến bảo tàng bằng cách nào?"], ["Go straight and turn left at the traffic lights.", "Đi thẳng và rẽ trái ở đèn giao thông."], ["How long does it take on foot?", "Đi bộ mất bao lâu?"], ["About ten minutes if the street is not busy.", "Khoảng mười phút nếu đường không đông."]], listenTask: "Nghe chỉ đường và sắp xếp các bước theo đúng thứ tự.", speakTask: "Hỏi đường, xác nhận lại và cảm ơn." },
  { id: "feelings", en: "Feelings and communication", vi: "Cảm xúc và giao tiếp", level: "A2-B1", track: "teens", lines: [["You look worried. What's wrong?", "Bạn trông có vẻ lo. Có chuyện gì vậy?"], ["I have to speak in front of the class tomorrow.", "Ngày mai tôi phải nói trước lớp."], ["Let's practise together for ten minutes.", "Chúng ta luyện cùng nhau mười phút nhé."], ["Thanks. That makes me feel better.", "Cảm ơn. Điều đó làm tôi thấy khá hơn."]], listenTask: "Nghe để nhận ra cảm xúc, vấn đề và lời hỗ trợ.", speakTask: "Đóng vai động viên bạn bằng tiếng Anh an toàn, tích cực." },
  { id: "technology", en: "Technology and media", vi: "Công nghệ và truyền thông", level: "B1-B2", track: "teens", lines: [["Do you use apps to learn English?", "Bạn có dùng ứng dụng để học tiếng Anh không?"], ["Yes, but I learn better when I speak with someone.", "Có, nhưng tôi học tốt hơn khi nói với ai đó."], ["What should we do after watching a video?", "Sau khi xem video, chúng ta nên làm gì?"], ["We should retell the main idea in our own words.", "Chúng ta nên kể lại ý chính bằng lời của mình."]], listenTask: "Nghe quan điểm và chọn phương pháp học hiệu quả hơn.", speakTask: "Nêu ý kiến về cách dùng công nghệ để luyện nói." },
  { id: "work", en: "Work, teamwork and meetings", vi: "Công việc, làm việc nhóm và họp", level: "B1-B2", track: "adults", lines: [["Could we start with the main problem?", "Chúng ta bắt đầu với vấn đề chính được không?"], ["The team needs a clearer schedule.", "Nhóm cần một lịch trình rõ ràng hơn."], ["I agree. We should divide the task into smaller steps.", "Tôi đồng ý. Chúng ta nên chia việc thành các bước nhỏ hơn."], ["Great. I'll write the action points.", "Tốt. Tôi sẽ ghi lại các đầu việc cần làm."]], listenTask: "Nghe để lấy vấn đề chính, giải pháp và người phụ trách.", speakTask: "Mô phỏng họp ngắn: nêu vấn đề, đề xuất, thống nhất bước tiếp theo." },
  { id: "community", en: "Community and real-life problems", vi: "Cộng đồng và vấn đề đời sống", level: "B2-C1", track: "adults", lines: [["What can local people do to make the area cleaner?", "Người dân địa phương có thể làm gì để khu vực sạch hơn?"], ["Small habits matter, but the plan must be easy to follow.", "Thói quen nhỏ rất quan trọng, nhưng kế hoạch phải dễ thực hiện."], ["How can we encourage more people to join?", "Làm sao để khuyến khích nhiều người tham gia hơn?"], ["We can explain the benefits and invite schools and families.", "Chúng ta có thể giải thích lợi ích và mời trường học, gia đình tham gia."]], listenTask: "Nghe để nhận ra vấn đề, đề xuất và lý do.", speakTask: "Trình bày giải pháp 60-90 giây cho một vấn đề cộng đồng." },
] as const;

type ProgramId = (typeof programs)[number]["id"];
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
  const [program, setProgram] = useState<ProgramId>("kids");
  const [query, setQuery] = useState("");
  const [openTopic, setOpenTopic] = useState<Topic | null>(null);
  const [showVietnamese, setShowVietnamese] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const selectedProgram = programs.find((item) => item.id === program) ?? programs[0];
  const filteredTopics = useMemo(() => topics.filter((topic) =>
    topic.track === program &&
    (!query || `${topic.en} ${topic.vi} ${topic.level}`.toLowerCase().includes(query.toLowerCase()))
  ), [program, query]);

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
          <button className={activeView === "programs" ? "active" : ""} onClick={() => openView("programs")}>Chương trình</button>
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
            <div className="hero-actions"><button className="button primary" onClick={() => openView("programs")}>Chọn chương trình</button><button className="button secondary" onClick={() => openView("topics")}>Vào bài song ngữ</button></div>
            <div className="trust-row"><span>Tiếng Việt có dấu đầy đủ</span><span>Luyện nói trước câu hỏi</span><span>Trẻ em đến người lớn</span></div>
          </div>
          <div className="audio-lab compact-lab"><div className="audio-card"><div className="card-top"><div><span className="pill yellow">{selectedProgram.label} · {selectedProgram.age}</span><h2>{selectedProgram.promise}</h2></div><span className="big-emoji">{selectedProgram.icon}</span></div><Wave active={playing}/><div className="player"><button onClick={() => filteredTopics[0] && playTopic(filteredTopics[0])}>{playing ? "Ⅱ" : "▶"}</button><div><b>Nghe mẫu hội thoại thật</b><small>Nghe tiếng Anh trước, mở dịch Việt sau, rồi nói lại.</small></div><span>listen · repeat · speak</span></div></div></div>
        </div>}

        {activeView === "roadmap" && <div className="level-rail app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH TỔNG THỂ</span><h2>Từ người mới bắt đầu đến dùng tiếng Anh tự nhiên</h2></div><p>Mỗi chặng có đầu ra nghe - nói rõ ràng.</p></div><div className="lesson-grid">{roadmap.map((stage) => <article key={stage.id}><div className="lesson-visual"><span>{stage.level}</span></div><div className="lesson-body"><h3>{stage.title}</h3><p>{stage.goal}</p><div className="format">Đầu ra: {stage.output}</div></div></article>)}</div></div>}

        {activeView === "programs" && <div className="tracks-section app-panel"><div className="section-heading"><div><span className="kicker">CHƯƠNG TRÌNH THEO ĐỘ TUỔI</span><h2>Cùng một mục tiêu, khác cách học</h2></div><p>Chọn nhóm học để lọc chủ đề và bài luyện nói phù hợp.</p></div><div className="track-grid">{programs.map((item) => <article key={item.id} className={program === item.id ? "selected-card" : ""} onClick={() => setProgram(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{item.age}</small><p>{item.promise}</p><ul>{item.stages.map((stage) => <li key={stage}>{stage}</li>)}</ul><button className="button secondary" onClick={(event) => { event.stopPropagation(); setProgram(item.id); openView("topics"); }}>Xem chủ đề</button></article>)}</div></div>}

        {activeView === "method" && <div className="method app-panel"><span className="kicker">CÔNG THỨC PHẢN XẠ</span><h2>Nghe trước, luyện nói song ngữ, rồi mới trả lời câu hỏi</h2><p className="section-sub">Cấu trúc mỗi bài: bài nghe song ngữ, bài luyện nói song ngữ, ghi âm, sau đó mới đến câu hỏi kiểm tra.</p><div className="method-grid"><article><span>1</span><b>Nghe không nhìn chữ</b><p>Bắt bối cảnh, người nói, ý chính.</p></article><article><span>2</span><b>Mở song ngữ</b><p>Đọc câu tiếng Anh kèm dịch Việt.</p></article><article><span>3</span><b>Luyện nói song ngữ</b><p>Nói câu mẫu, hiểu nghĩa, rồi đổi thành câu của mình.</p></article><article><span>4</span><b>Câu hỏi sau cùng</b><p>Trả lời để kiểm tra nghe hiểu và khả năng dùng câu.</p></article></div></div>}

        {activeView === "topics" && <div className="lesson-section app-panel"><div className="section-heading"><div><span className="kicker">CHỦ ĐỀ SONG NGỮ</span><h2>{selectedProgram.label}: bài nghe - nói theo đời sống</h2><p className="catalog-summary">Mỗi chủ đề đều có bài luyện nói song ngữ trước phần câu hỏi.</p></div><div className="filters">{programs.map((item) => <button key={item.id} className={program === item.id ? "active" : ""} onClick={() => setProgram(item.id)}>{item.label}</button>)}</div></div><div className="catalog-tools"><label className="search-box">Tìm <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="chủ đề, bản dịch, cấp độ..." /></label><span><b>{filteredTopics.length}</b> chủ đề phù hợp</span></div><div className="lesson-grid">{filteredTopics.map((topic) => <article key={topic.id} onClick={() => setOpenTopic(topic)}><div className="lesson-visual"><span>{topic.level}</span><button aria-label={`Mở ${topic.vi}`}>▶</button><i>{selectedProgram.label}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{topic.en}</span></div><h3>{topic.vi}</h3><p>{topic.listenTask}</p><div className="format">Luyện nói: {topic.speakTask}</div><footer><span>Anh - Việt</span><span>12-18 phút</span></footer></div></article>)}</div></div>}
      </section>

      {openTopic && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={() => setOpenTopic(null)}/><div className="lesson-panel"><button className="close" onClick={() => setOpenTopic(null)}>×</button><header><span className="lesson-icon">{openTopic.level}</span><div><span className="pill blue">{openTopic.en}</span><h2>{openTopic.vi}</h2><p>Thứ tự: nghe song ngữ → luyện nói song ngữ → ghi âm → câu hỏi.</p></div></header><section className="listen-block"><h3>1. Bài nghe song ngữ</h3><div className="audio-player"><button onClick={() => playTopic(openTopic)}>{playing ? "Ⅱ" : "▶"}</button><Wave active={playing}/><span>Nghe tiếng Anh bằng giọng đọc trình duyệt</span></div><button className="transcript-toggle" onClick={() => setShowVietnamese(!showVietnamese)}>{showVietnamese ? "Ẩn dịch tiếng Việt" : "Hiện dịch tiếng Việt"}</button><div className="transcript bilingual-lines">{openTopic.lines.map(([en, vi]) => <p key={en}><b>{en}</b>{showVietnamese && <span>{vi}</span>}</p>)}</div></section><section><h3>2. Bài luyện nói song ngữ</h3><div className="speaking-drill-list">{speakingDrills(openTopic).map((drill) => <article key={drill.en}><b>{drill.en}</b><span>{drill.vi}</span><small>{drill.action}</small></article>)}</div><p><b>Nhiệm vụ nói:</b> {openTopic.speakTask}</p></section><section className="speaking-practice"><h3>3. Ghi âm luyện nói</h3><p>Nói lại câu mẫu, sau đó đổi thông tin thành câu của bạn: người, nơi chốn, lý do, thời gian.</p><button className={`record-button ${recording ? "active" : ""}`} onClick={recordSpeech}><b>{recording ? "Dừng và lưu bản ghi" : "Bắt đầu nói"}</b><small>{recording ? "Đang ghi âm" : "Cho phép micro để luyện nói"}</small></button>{recordingUrl && <div className="recording-result"><audio controls src={recordingUrl}/></div>}</section><section><h3>4. Câu hỏi sau luyện nói</h3><div className="question-list">{topicQuestions(openTopic).map((item) => <article key={item.q}><b>{item.q}</b><span>{item.vi}</span><small>Gợi ý: {item.answer}</small></article>)}</div></section></div></div>}
      <footer className="footer"><div className="brand"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></div><p>Chương trình luyện nghe - nói phản xạ, hướng tới dùng tiếng Anh như ngôn ngữ thứ hai.</p><span>Nội dung tự biên soạn, có dịch tiếng Việt để hỗ trợ hiểu và luyện nói.</span></footer>
    </main>
  );
}
