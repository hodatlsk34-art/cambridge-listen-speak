"use client";

import { useMemo, useRef, useState } from "react";

const roadmap = [
  {
    id: "sound",
    short: "Stage 1",
    name: "Sound First",
    audience: "Tre em moi bat dau",
    level: "Pre A1",
    icon: "Aa",
    color: "yellow",
    goal: "Nghe va bat chuoc am, tu don, mau cau rat ngan.",
    listen: "Nhan biet am, tu khoa, so, mau sac, do vat quen thuoc.",
    speak: "Noi cau 2-5 tu, chao hoi, tra loi Yes/No va cau don.",
    output: "Co the nghe, chi tranh va noi cau ngan ro am.",
  },
  {
    id: "survival",
    short: "Stage 2",
    name: "Daily Survival English",
    audience: "Tre em lon va nguoi moi",
    level: "A1",
    icon: "Hi",
    color: "green",
    goal: "Dung tieng Anh cho cac nhu cau hang ngay.",
    listen: "Hieu cau hoi don gian ve ban than, lop hoc, gia dinh, mua sam.",
    speak: "Tu gioi thieu, hoi duong, goi mon, noi nhu cau co ban.",
    output: "Co the giao tiep ngan trong tinh huong quen thuoc.",
  },
  {
    id: "story",
    short: "Stage 3",
    name: "Picture & Story Speaking",
    audience: "Tre em, thieu nien",
    level: "A2",
    icon: "Pic",
    color: "blue",
    goal: "Noi bang tranh, chuoi hanh dong va cau chuyen ngan.",
    listen: "Nghe thong tin chi tiet trong hoi thoai doi song.",
    speak: "Mo ta tranh, ke lai viec da xay ra, noi ke hoach gan.",
    output: "Co the noi lien tuc 30-60 giay ve chu de quen.",
  },
  {
    id: "conversation",
    short: "Stage 4",
    name: "Real Conversation",
    audience: "Thieu nien va nguoi lon",
    level: "A2+",
    icon: "Talk",
    color: "cyan",
    goal: "Phan xa hoi-dap tu nhien, khong hoc vet tung cau.",
    listen: "Hieu hoi thoai o truong, nha, cong viec, du lich, dich vu.",
    speak: "Hoi lai, xac nhan thong tin, dua ly do va de nghi.",
    output: "Co the duy tri hoi thoai 2-3 phut voi nguoi khac.",
  },
  {
    id: "life",
    short: "Stage 5",
    name: "Life Topics",
    audience: "Thieu nien va nguoi lon",
    level: "B1",
    icon: "Life",
    color: "purple",
    goal: "Dung tieng Anh trong hau het chu de doi song.",
    listen: "Nam y chinh, thai do, ly do va ket qua trong bai noi ngan.",
    speak: "Ke trai nghiem, so sanh lua chon, giai thich quan diem.",
    output: "Co the noi 3-5 phut ve gia dinh, hoc tap, cong viec, xa hoi.",
  },
  {
    id: "discussion",
    short: "Stage 6",
    name: "Opinion & Discussion",
    audience: "Hoc sinh lon, sinh vien, nguoi di lam",
    level: "B2",
    icon: "View",
    color: "coral",
    goal: "Noi co lap luan, tuong tac va phan hoi linh hoat.",
    listen: "Hieu quan diem khac nhau, vi du, bang chung, su dong y/bat dong.",
    speak: "Tranh luan lich su, phat trien y, noi uu/nhuoc diem.",
    output: "Co the tham gia thao luan va bao ve quan diem ro rang.",
  },
  {
    id: "academic",
    short: "Stage 7",
    name: "Academic & Work English",
    audience: "Nguoi hoc nang cao",
    level: "C1",
    icon: "Pro",
    color: "mint",
    goal: "Dung tieng Anh cho hoc thuat, thuyet trinh va cong viec.",
    listen: "Theo doi bai noi dai, cau truc phuc tap, ham y va sac thai.",
    speak: "Trinh bay, tom tat, thuong luong, dat cau hoi sau.",
    output: "Co the lam viec va hoc tap bang tieng Anh.",
  },
  {
    id: "fluent",
    short: "Stage 8",
    name: "Fluent Second-Language Mode",
    audience: "Nguoi hoc thanh thao",
    level: "C2",
    icon: "C2",
    color: "indigo",
    goal: "Bien tieng Anh thanh ngon ngu thu hai trong suy nghi va giao tiep.",
    listen: "Hieu toc do tu nhien, an y, van phong va ngu canh phuc tap.",
    speak: "Dien dat chinh xac, tu nhien, linh hoat theo doi tuong va muc dich.",
    output: "Co the giao tiep gan nhu tu dong trong moi boi canh phu hop.",
  },
] as const;

const lifeDomains = [
  "Family & relationships",
  "School & learning",
  "Food & daily routines",
  "Home & neighborhood",
  "Travel & transport",
  "Shopping & services",
  "Health & safe habits",
  "Hobbies & entertainment",
  "Nature & environment",
  "Technology & media",
  "Feelings & communication",
  "Plans & future goals",
  "Work & teamwork",
  "Culture & community",
  "Problems & solutions",
  "Ideas & opinions",
] as const;

const ageTracks = [
  { id: "kids", label: "Tre em", range: "6-11", focus: "Am thanh, tranh anh, tro choi noi theo mau", icon: "Play" },
  { id: "teens", label: "Thieu nien", range: "12-17", focus: "Truong hoc, ban be, thuyet trinh ngan, phan xa hoi thoai", icon: "Chat" },
  { id: "adults", label: "Nguoi lon", range: "18+", focus: "Doi song, cong viec, du lich, thao luan va thuyet trinh", icon: "Work" },
] as const;

const lessonCycle = [
  { title: "1. Listen for meaning", detail: "Nghe lan 1 de nam boi canh, nguoi noi va y chinh." },
  { title: "2. Listen for details", detail: "Nghe lan 2 de bat tu khoa, so lieu, ly do va ket qua." },
  { title: "3. Chunk & shadow", detail: "Tach 5-8 cum tu, nghe va noi duoi theo dung nhịp." },
  { title: "4. Guided speaking", detail: "Dung khung cau de noi co chu dich, khong chi lap lai." },
  { title: "5. Free speaking", detail: "Noi ve ban than, doi vai hoac giai quyet mot tinh huong that." },
] as const;

const lessonBank = roadmap.flatMap((stage, stageIndex) =>
  lifeDomains.map((domain, domainIndex) => {
    const episode = domainIndex + 1;
    return {
      id: `${stage.id}-${episode}`,
      stageId: stage.id,
      stage: stage.short,
      level: stage.level,
      audience: stage.audience,
      title: `${domain}`,
      unit: `Unit ${episode}`,
      time: `${12 + stageIndex * 2 + (domainIndex % 4)} min`,
      icon: stage.icon,
      situation: [
        "asking and answering naturally",
        "describing a real-life scene",
        "solving a simple problem",
        "sharing an opinion with reasons",
      ][(stageIndex + domainIndex) % 4],
    };
  })
);

type Lesson = (typeof lessonBank)[number];

function lessonContent(lesson: Lesson) {
  const stageIndex = roadmap.findIndex((stage) => stage.id === lesson.stageId);
  const beginner = stageIndex <= 1;
  const developing = stageIndex >= 2 && stageIndex <= 4;
  const people = beginner ? ["Mia", "Sam"] : developing ? ["Anna", "Ben"] : ["Host", "Guest"];
  const setting = beginner ? "after class" : developing ? "during a short break" : "in a community discussion";
  const task = beginner
    ? "point to three things, say their names, and answer one simple question"
    : developing
      ? "explain what happened, give one reason, and ask a follow-up question"
      : "summarise the issue, compare two options, and give a balanced recommendation";
  const transcript = beginner
    ? `${people[0]}: Hi, ${people[1]}. Today we are talking about ${lesson.title.toLowerCase()}. ${people[1]}: I can hear the key words. ${people[0]}: Good. Say one sentence about it. ${people[1]}: I like this topic because it is part of my day.`
    : developing
      ? `${people[0]}: We need to talk about ${lesson.title.toLowerCase()} ${setting}. What is the first thing you notice? ${people[1]}: I notice the people are making a choice. They need clear information before they decide. ${people[0]}: What would you ask them? ${people[1]}: I would ask what they need, what they already tried, and what they plan to do next.`
      : `${people[0]}: Our focus today is ${lesson.title.toLowerCase()}. Why does this topic matter in real life? ${people[1]}: It matters because people often need to understand different perspectives before making a decision. A strong speaker does not only give an answer; they organise ideas, refer to evidence from the situation, and adjust their language for the listener.`;
  const chunks = beginner
    ? ["Today we are talking about...", "I can hear...", "Say one sentence", "I like this topic", "part of my day"]
    : developing
      ? ["the first thing I notice", "making a choice", "clear information", "what they already tried", "what they plan to do next"]
      : ["different perspectives", "making a decision", "organise ideas", "refer to evidence", "adjust their language"];
  const questions = [
    {
      q: "What is the lesson mainly about?",
      options: [lesson.title, "A sports score", "A spelling test"],
      answer: 0,
      explain: `The speakers focus on ${lesson.title.toLowerCase()}.`,
    },
    {
      q: beginner ? "What should the learner say?" : developing ? "What do the people need before they decide?" : "What does a strong speaker organise?",
      options: beginner ? ["One sentence", "A long essay", "Nothing"] : developing ? ["Clear information", "A louder voice", "A new phone"] : ["Ideas", "Shoes", "Colours"],
      answer: 0,
      explain: beginner ? "The task is to say one clear sentence." : developing ? "The dialogue says people need clear information." : "The speaker says strong speakers organise ideas.",
    },
    {
      q: "What is the speaking task?",
      options: [task, "copy a paragraph silently", "translate every word into Vietnamese"],
      answer: 0,
      explain: "The lesson moves from listening to active speaking.",
    },
  ];
  return {
    transcript,
    chunks,
    questions,
    task,
    criteria: beginner
      ? "Clear sounds, complete short sentences, confident repetition"
      : developing
        ? "Main idea, useful details, follow-up question, natural rhythm"
        : "Structure, precision, interaction, range of vocabulary, listener awareness",
  };
}

function Wave({ active = false }: { active?: boolean }) {
  return <div className={`wave ${active ? "active" : ""}`}>{[12,25,18,36,48,26,55,38,22,42,58,31,17,49,34,24,52,29,40,16,33,45,21,37,27].map((h,i)=><span key={i} style={{height:h}} />)}</div>;
}

export default function Home() {
  const [selected, setSelected] = useState("sound");
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [filter, setFilter] = useState("Tat ca");
  const [stageFilter, setStageFilter] = useState("Tat ca chang");
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
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const current = roadmap.find((stage) => stage.id === selected) ?? roadmap[0];
  const detail = openLesson ? lessonContent(openLesson) : null;
  const filteredLessons = useMemo(() => lessonBank.filter((lesson) =>
    (filter === "Tat ca" || lesson.audience.includes(filter)) &&
    (stageFilter === "Tat ca chang" || lesson.stage === stageFilter) &&
    (!query || `${lesson.title} ${lesson.level} ${lesson.situation}`.toLowerCase().includes(query.toLowerCase()))
  ), [filter, stageFilter, query]);
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filteredLessons.length / pageSize));
  const visibleLessons = filteredLessons.slice((page - 1) * pageSize, page * pageSize);

  const openDetail = (lesson:Lesson) => {
    setOpenLesson(lesson);
    setShowTranscript(false);
    setAnswers({});
    setChecked(false);
    setLessonAudio(false);
    setSpeaking(false);
  };
  const closeDetail = () => {
    window.speechSynthesis?.cancel();
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setOpenLesson(null);
  };
  const playLesson = () => {
    if (!detail || !openLesson) return;
    window.speechSynthesis.cancel();
    if (lessonAudio) {
      setLessonAudio(false);
      return;
    }
    const voice = new SpeechSynthesisUtterance(detail.transcript);
    voice.lang = accent;
    voice.rate = openLesson.level === "Pre A1" ? 0.78 : openLesson.level === "A1" ? 0.85 : 0.95;
    voice.onend = () => setLessonAudio(false);
    setLessonAudio(true);
    window.speechSynthesis.speak(voice);
  };
  const recordSpeech = async () => {
    if (speaking && recorderRef.current) {
      recorderRef.current.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (recordingUrl) URL.revokeObjectURL(recordingUrl);
        setRecordingUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        setSpeaking(false);
      };
      recorder.start();
      setSpeaking(true);
    } catch {
      alert("Ban can cho phep micro de ghi am phan noi.");
    }
  };
  const downloadRecording = () => {
    if (!recordingUrl || !openLesson) return;
    const link = document.createElement("a");
    link.href = recordingUrl;
    link.download = `speakup-${openLesson.id}.webm`;
    link.click();
  };

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="SpeakUp Life English"><span className="brand-mark">SE</span><span>SpeakUp <b>Life</b></span></a>
        <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Mo menu">☰</button>
        <nav className={menu ? "open" : ""}>
          <a href="#roadmap">Lo trinh</a><a href="#tracks">Nhom tuoi</a><a href="#lessons">Chu de doi song</a><a href="#method">Cach hoc</a><a href="#progress">Tien do</a>
        </nav>
        <a className="hello" href="/login"><span>Dang nhap</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">ENGLISH AS A SECOND LANGUAGE</div>
          <h1>Nghe duoc.<br/><em>Noi duoc.</em><br/>Dung duoc moi ngay.</h1>
          <p>Lo trinh moi dua nguoi hoc tu con so 0 den giao tiep thanh thao, ap dung cho tre em, thieu nien va nguoi lon qua cac chu de that trong cuoc song.</p>
          <div className="hero-actions"><a className="button primary" href="#roadmap">Bat dau theo lo trinh</a><a className="button secondary" href="#lessons">Mo chu de hoc</a></div>
          <div className="trust-row"><span>CEFR A0-C2</span><span>Tre em den nguoi lon</span><span>Nghe + noi trong moi bai</span></div>
        </div>
        <div className="audio-lab" id="practice">
          <div className="audio-card">
            <div className="card-top"><div><span className="pill yellow">{current.short} · {current.level}</span><h2>{current.name}</h2></div><span className="big-emoji">{current.icon}</span></div>
            <Wave active={playing}/>
            <div className="player"><button onClick={()=>setPlaying(!playing)}>{playing ? "Ⅱ" : "▶"}</button><div><b>{playing ? "Dang mo phong bai nghe..." : "Nghe mau theo giai doan"}</b><small>{current.listen}</small></div><span>slow · clear · natural</span></div>
            <div className="sentence"><span>{current.output}</span></div>
          </div>
          <div className={`speak-card ${recording ? "recording" : ""}`}>
            <div className="speak-head"><span className="pill mint">Speaking target</span><b>{current.level}<strong>{recording ? "..." : "Ready"}</strong></b></div>
            <button className="mic" onClick={()=>setRecording(!recording)}>Mic</button>
            <Wave active={recording}/>
            <p>{recording ? "Dang luyen noi..." : current.speak}</p>
          </div>
        </div>
      </section>

      <section className="level-rail" id="roadmap">
        <div className="section-heading"><div><span className="kicker">LO TRINH 8 CHANG</span><h2>Tu nguoi moi bat dau den thanh thao</h2></div><p>Moi chang co muc tieu nghe, noi va san pham dau ra ro rang, khong con hoc lan man theo kho bai cu.</p></div>
        <div className="levels">{roadmap.map((stage)=><button key={stage.id} className={`level ${stage.color} ${selected===stage.id?"selected":""}`} onClick={()=>setSelected(stage.id)}><span>{stage.icon}</span><b>{stage.short}</b><small>{stage.level}</small></button>)}</div>
        <div className="level-detail"><div className="detail-title"><span>{current.icon}</span><div><small>{current.audience}</small><h3>{current.name}</h3><p>{current.goal}</p></div></div><div><b>Listening</b><p>{current.listen}</p></div><div><b>Speaking</b><p>{current.speak}</p></div><a className="button primary" href="#lessons">Hoc chang nay</a></div>
      </section>

      <section className="tracks-section" id="tracks">
        <div className="section-heading"><div><span className="kicker">NHOM NGUOI HOC</span><h2>Mỗi độ tuổi học cùng mục tiêu, khác cách tiếp cận</h2></div><p>Tre em can tranh va am; thieu nien can tinh huong truong lop; nguoi lon can ung dung vao cong viec va doi song.</p></div>
        <div className="track-grid">{ageTracks.map((track)=><article key={track.id}><span>{track.icon}</span><b>{track.label}</b><small>{track.range} tuoi</small><p>{track.focus}</p></article>)}</div>
      </section>

      <section className="method" id="method">
        <span className="kicker">CAU TRUC MOI CHO MOI BAI</span><h2>Mot bai hoc = nghe hieu + noi duoc</h2><p className="section-sub">Moi bai khong chi co cau hoi. Bai hoc co ngu lieu nghe, cum tu noi, bai tap kiem tra va nhiem vu noi that.</p>
        <div className="method-grid">{lessonCycle.map((step)=><article key={step.title}><span>{step.title.slice(0,1)}</span><b>{step.title}</b><p>{step.detail}</p></article>)}</div>
      </section>

      <section className="lesson-section" id="lessons">
        <div className="section-heading"><div><span className="kicker">CHU DE DOI SONG</span><h2>128 bai nghe-noi moi thay cho kho bai hoc cu</h2><p className="catalog-summary">16 chu de x 8 chang. Moi bai co bai nghe, cau hoi, chunks va nhiem vu noi rieng.</p></div><div className="filters">{["Tat ca","Tre em","Thieu nien","Nguoi lon"].map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>{setFilter(item);setPage(1)}}>{item}</button>)}</div></div>
        <div className="catalog-tools"><label className="search-box">⌕ <input value={query} onChange={event=>{setQuery(event.target.value);setPage(1)}} placeholder="Tim chu de, tinh huong..." /></label><select value={stageFilter} onChange={event=>{setStageFilter(event.target.value);setPage(1)}}><option>Tat ca chang</option>{roadmap.map((stage)=><option key={stage.short}>{stage.short}</option>)}</select><span><b>{filteredLessons.length}</b> bai phu hop</span></div>
        <div className="lesson-grid">{visibleLessons.map((lesson)=><article key={lesson.id} onClick={()=>openDetail(lesson)}><div className="lesson-visual"><span>{lesson.icon}</span><button aria-label={`Mo ${lesson.title}`}>▶</button><i>{lesson.stage}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{lesson.level}</span><span>{lesson.unit}</span></div><h3>{lesson.title}</h3><p>{lesson.situation}</p><div className="format">Muc tieu: nghe hieu, shadowing, hoi dap</div><footer><span>{lesson.audience}</span><span>{lesson.time}</span></footer></div></article>)}</div>
        {visibleLessons.length === 0 && <div className="empty-state">Khong tim thay bai phu hop. Hay doi bo loc hoac tu khoa.</div>}
        <div className="pagination"><button disabled={page===1} onClick={()=>setPage((value)=>value-1)}>Truoc</button><span>Trang <b>{page}</b> / {totalPages}</span><button disabled={page===totalPages} onClick={()=>setPage((value)=>value+1)}>Sau</button></div>
      </section>

      <section className="progress-section" id="progress"><div><span className="kicker light">TIEN BO TUNG BUOC</span><h2>Hoc de bien tieng Anh thanh ngon ngu thu hai.</h2><p>Theo doi so bai nghe, thoi gian noi, do dai cau tra loi va muc do tu tin theo tung chang.</p><a className="button white" href="#roadmap">Quay lai lo trinh</a></div><div className="dashboard"><div className="streak">Step <b>{current.short}</b><small>{current.output}</small></div><div className="stats"><span><b>16</b><small>chu de/chang</small></span><span><b>5</b><small>buoc/bai</small></span><span><b>8</b><small>chang</small></span></div><div className="bars"><p>Listening <span>70%</span></p><i><b style={{width:"70%"}}/></i><p>Speaking <span>65%</span></p><i><b style={{width:"65%"}}/></i></div></div></section>

      <button className="back-top" onClick={()=>window.scrollTo({top:0, behavior:"smooth"})} aria-label="Ve dau trang">↑</button>

      {openLesson && detail && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={closeDetail}/><div className="lesson-panel"><button className="close" onClick={closeDetail}>×</button><header><span className="lesson-icon">{openLesson.icon}</span><div><span className="pill blue">{openLesson.stage} · {openLesson.level}</span><h2>{openLesson.title}</h2><p>{openLesson.audience} · {openLesson.time}</p></div></header><div className="lesson-tabs"><span>1. Listening</span><span>2. Chunks</span><span>3. Speaking</span></div><section className="listen-block"><h3>Bai nghe</h3><div className="accent-picker"><b>Giong doc:</b><button className={accent==="en-GB"?"selected":""} onClick={()=>setAccent("en-GB")}>Anh-Anh</button><button className={accent==="en-US"?"selected":""} onClick={()=>setAccent("en-US")}>Anh-My</button></div><div className="audio-player"><button onClick={playLesson}>{lessonAudio?"Ⅱ":"▶"}</button><Wave active={lessonAudio}/><span>{lessonAudio?"Dang phat...":"Bam de nghe noi dung de"}</span></div><button className="transcript-toggle" onClick={()=>setShowTranscript(!showTranscript)}>{showTranscript?"An transcript":"Hien transcript sau khi nghe"}</button>{showTranscript&&<div className="transcript">{detail.transcript}</div>}</section><section><h3>Cau hoi nghe hieu</h3><div className="quiz">{detail.questions.map((question,index)=><article key={question.q}><b>{index+1}. {question.q}</b>{question.options.map((option,optionIndex)=><label key={option} className={checked?(optionIndex===question.answer?"correct":answers[index]===optionIndex?"wrong":""):""}><input type="radio" name={`q${index}`} checked={answers[index]===optionIndex} onChange={()=>setAnswers((value)=>({...value,[index]:optionIndex}))}/>{option}</label>)}{checked&&<p>{question.explain}</p>}</article>)}</div><button className="button primary" onClick={()=>setChecked(true)}>Cham bai ({Object.keys(answers).length}/3)</button>{checked&&<strong className="score">Ket qua: {detail.questions.filter((question,index)=>answers[index]===question.answer).length}/3 cau dung</strong>}</section><section className="speaking-practice"><h3>Chunks & speaking task</h3><div className="chunk-list">{detail.chunks.map((chunk)=><span key={chunk}>{chunk}</span>)}</div><p>{detail.task}</p><div className="target">Tieu chi: {detail.criteria}</div><button className={`record-button ${speaking?"active":""}`} onClick={recordSpeech}><b>{speaking?"Dung va luu ban ghi":"Bat dau noi"}</b><small>{speaking?"Dang ghi am":"Cho phep micro de ghi am"}</small></button>{speaking&&<Wave active/>}{recordingUrl&&<div className="recording-result"><audio controls src={recordingUrl}/><button onClick={downloadRecording}>Tai tep ghi am</button></div>}<p className="privacy-note">Tep ghi am chi giu trong trinh duyet cua ban, khong tu dong tai len may chu.</p></section></div></div>}
      <footer className="footer"><div className="brand"><span className="brand-mark">SE</span><span>SpeakUp <b>Life</b></span></div><p>Lo trinh luyen nghe-noi tieng Anh theo CEFR, tu nguoi moi bat dau den thanh thao.</p><span>Noi dung tu bien soan, khong sao chep de thi hoac tai lieu co ban quyen.</span></footer>
    </main>
  );
}
