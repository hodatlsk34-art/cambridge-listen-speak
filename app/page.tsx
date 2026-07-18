"use client";

import { useMemo, useRef, useState } from "react";

const programs = [
  {
    id: "kids",
    label: "Trẻ em",
    age: "6-11 tuổi",
    icon: "ABC",
    promise: "Nghe âm, bắt chước, nói câu ngắn qua tranh và trò chơi.",
    stages: ["Âm và từ", "Câu ngắn", "Hỏi đáp", "Kể chuyện bằng tranh"],
  },
  {
    id: "teens",
    label: "Thiếu niên",
    age: "12-17 tuổi",
    icon: "CHAT",
    promise: "Phản xạ hội thoại ở trường, bạn bè, sở thích, học tập và đời sống.",
    stages: ["Hỏi nhanh", "Trả lời có lý do", "Mô tả tình huống", "Thảo luận ngắn"],
  },
  {
    id: "adults",
    label: "Người lớn",
    age: "18+",
    icon: "WORK",
    promise: "Dùng tiếng Anh trong công việc, du lịch, dịch vụ, gia đình và xã hội.",
    stages: ["Giao tiếp sinh tồn", "Hội thoại thực tế", "Trình bày ý", "Thảo luận linh hoạt"],
  },
] as const;

const roadmap = [
  {
    id: "foundation",
    level: "A0 - Pre A1",
    title: "Nghe âm trước, nói theo ngay",
    goal: "Xây phản xạ âm thanh: nghe được từ khóa và nói câu rất ngắn.",
    output: "Tự chào hỏi, gọi tên đồ vật, trả lời câu hỏi đơn giản.",
  },
  {
    id: "daily",
    level: "A1",
    title: "Sinh hoạt hằng ngày",
    goal: "Nói được những nhu cầu thật: ăn uống, lớp học, gia đình, thời gian, địa điểm.",
    output: "Tạo hội thoại 4-6 lượt trong tình huống quen thuộc.",
  },
  {
    id: "story",
    level: "A2",
    title: "Mô tả, kể chuyện, hỏi lại",
    goal: "Nói theo tranh, kể việc đã xảy ra, hỏi lại khi chưa rõ.",
    output: "Nói liên tục 45-60 giây về một chủ đề đời sống.",
  },
  {
    id: "conversation",
    level: "B1",
    title: "Hội thoại đời sống thật",
    goal: "Phản xạ trong nhiều bối cảnh: trường học, du lịch, dịch vụ, sức khỏe an toàn, công nghệ.",
    output: "Duy trì hội thoại 2-3 phút, có lý do và ví dụ.",
  },
  {
    id: "discussion",
    level: "B2",
    title: "Nêu quan điểm và tương tác",
    goal: "Nghe ý kiến khác nhau, phản hồi, đồng ý, không đồng ý lịch sự.",
    output: "Thảo luận vấn đề quen thuộc với lập luận rõ.",
  },
  {
    id: "second-language",
    level: "C1 - C2",
    title: "Tiếng Anh như ngôn ngữ thứ hai",
    goal: "Dùng tiếng Anh để học, làm việc, trình bày, thương lượng và suy nghĩ.",
    output: "Nói tự nhiên, chính xác, linh hoạt theo người nghe và mục đích.",
  },
] as const;

const topics = [
  {
    id: "family",
    en: "Family and daily life",
    vi: "Gia đình và sinh hoạt hằng ngày",
    level: "A0-A1",
    track: "kids",
    lines: [
      ["Who is in your family?", "Gia đình bạn có những ai?"],
      ["I live with my parents and my younger sister.", "Tôi sống cùng bố mẹ và em gái."],
      ["What do you usually do after school?", "Bạn thường làm gì sau giờ học?"],
      ["I have a snack, do homework, and play for a while.", "Tôi ăn nhẹ, làm bài tập và chơi một lúc."],
    ],
    listenTask: "Nghe và chọn đúng người, hoạt động, thời gian.",
    speakTask: "Nói 5 câu về gia đình và một thói quen mỗi ngày.",
  },
  {
    id: "school",
    en: "School, friends and learning",
    vi: "Trường học, bạn bè và việc học",
    level: "A1-A2",
    track: "kids",
    lines: [
      ["Which subject do you like most?", "Bạn thích môn học nào nhất?"],
      ["I like science because we do experiments.", "Tôi thích khoa học vì chúng tôi làm thí nghiệm."],
      ["Can you help me with this exercise?", "Bạn có thể giúp tôi bài này không?"],
      ["Sure. Let's read the example first.", "Được. Hãy đọc ví dụ trước."],
    ],
    listenTask: "Nghe để xác định môn học, lý do và lời đề nghị giúp đỡ.",
    speakTask: "Đóng vai hỏi bạn về môn học yêu thích và cách học tốt hơn.",
  },
  {
    id: "food",
    en: "Food, drinks and ordering",
    vi: "Đồ ăn, thức uống và gọi món",
    level: "A1-A2",
    track: "kids",
    lines: [
      ["Could I have a bowl of noodles, please?", "Cho tôi một bát mì được không?"],
      ["Would you like anything to drink?", "Bạn muốn uống gì không?"],
      ["A glass of orange juice, please.", "Cho tôi một ly nước cam."],
      ["That's all, thank you.", "Vậy là đủ rồi, cảm ơn."],
    ],
    listenTask: "Nghe và ghi món ăn, đồ uống, số lượng.",
    speakTask: "Thực hành gọi món lịch sự bằng 4 lượt thoại.",
  },
  {
    id: "travel",
    en: "Travel and directions",
    vi: "Du lịch và hỏi đường",
    level: "A2-B1",
    track: "teens",
    lines: [
      ["Excuse me, how can I get to the museum?", "Xin lỗi, tôi đến bảo tàng bằng cách nào?"],
      ["Go straight and turn left at the traffic lights.", "Đi thẳng và rẽ trái ở đèn giao thông."],
      ["How long does it take on foot?", "Đi bộ mất bao lâu?"],
      ["About ten minutes if the street is not busy.", "Khoảng mười phút nếu đường không đông."],
    ],
    listenTask: "Nghe chỉ đường và sắp xếp các bước theo đúng thứ tự.",
    speakTask: "Hỏi đường, xác nhận lại và cảm ơn.",
  },
  {
    id: "feelings",
    en: "Feelings and communication",
    vi: "Cảm xúc và giao tiếp",
    level: "A2-B1",
    track: "teens",
    lines: [
      ["You look worried. What's wrong?", "Bạn trông có vẻ lo. Có chuyện gì vậy?"],
      ["I have to speak in front of the class tomorrow.", "Ngày mai tôi phải nói trước lớp."],
      ["Let's practise together for ten minutes.", "Chúng ta luyện cùng nhau mười phút nhé."],
      ["Thanks. That makes me feel better.", "Cảm ơn. Điều đó làm tôi thấy khá hơn."],
    ],
    listenTask: "Nghe để nhận ra cảm xúc, vấn đề và lời hỗ trợ.",
    speakTask: "Đóng vai động viên bạn bằng tiếng Anh an toàn, tích cực.",
  },
  {
    id: "technology",
    en: "Technology and media",
    vi: "Công nghệ và truyền thông",
    level: "B1-B2",
    track: "teens",
    lines: [
      ["Do you use apps to learn English?", "Bạn có dùng ứng dụng để học tiếng Anh không?"],
      ["Yes, but I learn better when I speak with someone.", "Có, nhưng tôi học tốt hơn khi nói với ai đó."],
      ["What should we do after watching a video?", "Sau khi xem video, chúng ta nên làm gì?"],
      ["We should retell the main idea in our own words.", "Chúng ta nên kể lại ý chính bằng lời của mình."],
    ],
    listenTask: "Nghe quan điểm và chọn phương pháp học hiệu quả hơn.",
    speakTask: "Nêu ý kiến về cách dùng công nghệ để luyện nói.",
  },
  {
    id: "work",
    en: "Work, teamwork and meetings",
    vi: "Công việc, làm việc nhóm và họp",
    level: "B1-B2",
    track: "adults",
    lines: [
      ["Could we start with the main problem?", "Chúng ta bắt đầu với vấn đề chính được không?"],
      ["The team needs a clearer schedule.", "Nhóm cần một lịch trình rõ ràng hơn."],
      ["I agree. We should divide the task into smaller steps.", "Tôi đồng ý. Chúng ta nên chia việc thành các bước nhỏ hơn."],
      ["Great. I'll write the action points.", "Tốt. Tôi sẽ ghi lại các đầu việc cần làm."],
    ],
    listenTask: "Nghe để lấy vấn đề chính, giải pháp và người phụ trách.",
    speakTask: "Mô phỏng họp ngắn: nêu vấn đề, đề xuất, thống nhất bước tiếp theo.",
  },
  {
    id: "community",
    en: "Community and real-life problems",
    vi: "Cộng đồng và vấn đề đời sống",
    level: "B2-C1",
    track: "adults",
    lines: [
      ["What can local people do to make the area cleaner?", "Người dân địa phương có thể làm gì để khu vực sạch hơn?"],
      ["Small habits matter, but the plan must be easy to follow.", "Thói quen nhỏ rất quan trọng, nhưng kế hoạch phải dễ thực hiện."],
      ["How can we encourage more people to join?", "Làm sao để khuyến khích nhiều người tham gia hơn?"],
      ["We can explain the benefits and invite schools and families.", "Chúng ta có thể giải thích lợi ích và mời trường học, gia đình tham gia."],
    ],
    listenTask: "Nghe để nhận ra vấn đề, đề xuất và lý do.",
    speakTask: "Trình bày giải pháp 60-90 giây cho một vấn đề cộng đồng.",
  },
] as const;

type Topic = (typeof topics)[number];

function Wave({ active = false }: { active?: boolean }) {
  return <div className={`wave ${active ? "active" : ""}`}>{[16,28,18,42,52,24,48,33,20,44,58,31,18,46,34,24,52,29,40,16].map((h, i) => <span key={i} style={{ height: h }} />)}</div>;
}

function buildTranscript(topic: Topic) {
  return topic.lines.map(([en]) => en).join(" ");
}

export default function Home() {
  const [program, setProgram] = useState<(typeof programs)[number]["id"]>("kids");
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
    <main id="top">
      <header className="header">
        <a className="brand" href="#top" aria-label="SpeakUp Second Language"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></a>
        <nav>
          <a href="#roadmap">Lộ trình</a>
          <a href="#programs">Chương trình</a>
          <a href="#topics">Chủ đề</a>
          <a href="#practice">Phản xạ</a>
        </nav>
        <a className="hello" href="/login">Đăng nhập</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">NGHE - NÓI PHẢN XẠ</div>
          <h1>Biến tiếng Anh<br/><em>thành ngôn ngữ thứ hai.</em></h1>
          <p>Không học theo kho hội thoại lặp lại. Chương trình mới đi từ nghe âm, nói theo, phản xạ hỏi đáp, đến dùng tiếng Anh trong học tập, công việc và đời sống.</p>
          <div className="hero-actions">
            <a className="button primary" href="#programs">Chọn chương trình</a>
            <a className="button secondary" href="#topics">Xem chủ đề song ngữ</a>
          </div>
          <div className="trust-row"><span>Tiếng Việt có dấu đầy đủ</span><span>Hội thoại Anh - Việt</span><span>Trẻ em đến người lớn</span></div>
        </div>
        <div className="audio-lab" id="practice">
          <div className="audio-card">
            <div className="card-top"><div><span className="pill yellow">{selectedProgram.label} · {selectedProgram.age}</span><h2>{selectedProgram.promise}</h2></div><span className="big-emoji">{selectedProgram.icon}</span></div>
            <Wave active={playing}/>
            <div className="player"><button onClick={() => filteredTopics[0] && playTopic(filteredTopics[0])}>{playing ? "Ⅱ" : "▶"}</button><div><b>Nghe mẫu hội thoại thật</b><small>Nghe tiếng Anh trước, mở dịch Việt sau để hiểu sâu.</small></div><span>slow · repeat · speak</span></div>
            <div className="sentence">Mục tiêu: nghe hiểu nhanh hơn, trả lời tự nhiên hơn, dùng được trong đời sống.</div>
          </div>
          <div className={`speak-card ${recording ? "recording" : ""}`}>
            <div className="speak-head"><span className="pill mint">Luyện phản xạ</span><b>Ghi âm<strong>{recording ? "Đang nói" : "Sẵn sàng"}</strong></b></div>
            <button className="mic" onClick={recordSpeech}>Mic</button>
            <Wave active={recording}/>
            <p>Nói lại, đổi thông tin cá nhân, rồi tự nghe để sửa phát âm và độ trôi chảy.</p>
            {recordingUrl && <audio controls src={recordingUrl}/>}
          </div>
        </div>
      </section>

      <section className="level-rail" id="roadmap">
        <div className="section-heading"><div><span className="kicker">LỘ TRÌNH TỔNG THỂ</span><h2>Từ người mới bắt đầu đến dùng tiếng Anh tự nhiên</h2></div><p>Mỗi chặng đều có đầu ra nghe - nói rõ ràng, không chỉ học từ vựng rời rạc.</p></div>
        <div className="lesson-grid">{roadmap.map((stage) => <article key={stage.id}><div className="lesson-visual"><span>{stage.level}</span></div><div className="lesson-body"><h3>{stage.title}</h3><p>{stage.goal}</p><div className="format">Đầu ra: {stage.output}</div></div></article>)}</div>
      </section>

      <section className="tracks-section" id="programs">
        <div className="section-heading"><div><span className="kicker">CHƯƠNG TRÌNH THEO ĐỘ TUỔI</span><h2>Cùng một mục tiêu, khác cách học</h2></div><p>Trẻ em cần tranh và âm; thiếu niên cần phản xạ trường lớp; người lớn cần tình huống đời sống và công việc.</p></div>
        <div className="track-grid">{programs.map((item) => <article key={item.id} className={program === item.id ? "selected-card" : ""} onClick={() => setProgram(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{item.age}</small><p>{item.promise}</p><ul>{item.stages.map((stage) => <li key={stage}>{stage}</li>)}</ul></article>)}</div>
      </section>

      <section className="method">
        <span className="kicker">CÔNG THỨC PHẢN XẠ</span><h2>Nghe trước, hiểu nhanh, nói ngay</h2><p className="section-sub">Một bài học không chỉ có câu hỏi. Mỗi bài có đoạn nghe, dịch Việt, cụm nói, phản xạ thay thông tin và nhiệm vụ nói tự do.</p>
        <div className="method-grid">
          <article><span>1</span><b>Nghe không nhìn chữ</b><p>Nghe để bắt bối cảnh, người nói, ý chính.</p></article>
          <article><span>2</span><b>Mở song ngữ</b><p>Đọc câu tiếng Anh kèm dịch Việt để hiểu cách dùng.</p></article>
          <article><span>3</span><b>Shadowing</b><p>Nói đuổi theo từng cụm, giữ nhịp và âm cuối.</p></article>
          <article><span>4</span><b>Đổi thành câu của mình</b><p>Thay người, nơi chốn, lý do rồi nói lại ngay.</p></article>
        </div>
      </section>

      <section className="lesson-section" id="topics">
        <div className="section-heading"><div><span className="kicker">CHỦ ĐỀ SONG NGỮ</span><h2>{selectedProgram.label}: bài nghe - nói theo đời sống</h2><p className="catalog-summary">Mỗi chủ đề có hội thoại tiếng Anh, dịch tiếng Việt, bài nghe và nhiệm vụ nói phản xạ.</p></div><div className="filters">{programs.map((item) => <button key={item.id} className={program === item.id ? "active" : ""} onClick={() => setProgram(item.id)}>{item.label}</button>)}</div></div>
        <div className="catalog-tools"><label className="search-box">Tìm <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="chủ đề, bản dịch, cấp độ..." /></label><span><b>{filteredTopics.length}</b> chủ đề phù hợp</span></div>
        <div className="lesson-grid">{filteredTopics.map((topic) => <article key={topic.id} onClick={() => setOpenTopic(topic)}><div className="lesson-visual"><span>{topic.level}</span><button aria-label={`Mở ${topic.vi}`}>▶</button><i>{selectedProgram.label}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{topic.en}</span></div><h3>{topic.vi}</h3><p>{topic.listenTask}</p><div className="format">Nói: {topic.speakTask}</div><footer><span>Song ngữ Anh - Việt</span><span>12-18 phút</span></footer></div></article>)}</div>
      </section>

      {openTopic && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={() => setOpenTopic(null)}/><div className="lesson-panel"><button className="close" onClick={() => setOpenTopic(null)}>×</button><header><span className="lesson-icon">{openTopic.level}</span><div><span className="pill blue">{openTopic.en}</span><h2>{openTopic.vi}</h2><p>Bài học phản xạ nghe - nói có dịch tiếng Việt.</p></div></header><section className="listen-block"><h3>Bài nghe</h3><div className="audio-player"><button onClick={() => playTopic(openTopic)}>{playing ? "Ⅱ" : "▶"}</button><Wave active={playing}/><span>Nghe tiếng Anh bằng giọng đọc trình duyệt</span></div><button className="transcript-toggle" onClick={() => setShowVietnamese(!showVietnamese)}>{showVietnamese ? "Ẩn dịch tiếng Việt" : "Hiện dịch tiếng Việt"}</button><div className="transcript bilingual-lines">{openTopic.lines.map(([en, vi]) => <p key={en}><b>{en}</b>{showVietnamese && <span>{vi}</span>}</p>)}</div></section><section><h3>Cụm phản xạ</h3><div className="chunk-list">{openTopic.lines.map(([en]) => en.split(" ").slice(0, 5).join(" ")).map((chunk) => <span key={chunk}>{chunk}...</span>)}</div><p><b>Bài nghe:</b> {openTopic.listenTask}</p><p><b>Bài nói:</b> {openTopic.speakTask}</p></section><section className="speaking-practice"><h3>Ghi âm luyện nói</h3><p>Nói lại hội thoại, sau đó đổi thông tin thành câu của bạn. Ví dụ: đổi người, nơi chốn, lý do, thời gian.</p><button className={`record-button ${recording ? "active" : ""}`} onClick={recordSpeech}><b>{recording ? "Dừng và lưu bản ghi" : "Bắt đầu nói"}</b><small>{recording ? "Đang ghi âm" : "Cho phép micro để luyện nói"}</small></button>{recordingUrl && <div className="recording-result"><audio controls src={recordingUrl}/></div>}</section></div></div>}

      <a className="back-to-top" href="#top" aria-label="Về đầu trang">↑</a>
      <footer className="footer"><div className="brand"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></div><p>Chương trình luyện nghe - nói phản xạ, hướng tới dùng tiếng Anh như ngôn ngữ thứ hai.</p><span>Nội dung tự biên soạn, có dịch tiếng Việt để hỗ trợ hiểu và luyện nói.</span></footer>
    </main>
  );
}
