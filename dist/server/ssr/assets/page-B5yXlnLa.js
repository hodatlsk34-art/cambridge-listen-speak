import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var levels = [
	{
		id: "pre-a1",
		short: "Pre A1",
		name: "Starters",
		icon: "🦁",
		color: "yellow",
		age: "6–8 tuổi",
		listen: "Nghe từ, số và mô tả ngắn",
		speak: "Chào hỏi, gọi tên và trả lời đơn"
	},
	{
		id: "a1",
		short: "A1",
		name: "Movers",
		icon: "🐢",
		color: "green",
		age: "7–10 tuổi",
		listen: "Hiểu hội thoại và chỉ dẫn đơn giản",
		speak: "Mô tả tranh, kể chuyện rất ngắn"
	},
	{
		id: "a2y",
		short: "A2",
		name: "Flyers",
		icon: "🐬",
		color: "blue",
		age: "9–12 tuổi",
		listen: "Nghe chi tiết trong hội thoại quen thuộc",
		speak: "So sánh tranh, kể chuyện và trao đổi"
	},
	{
		id: "a2",
		short: "A2",
		name: "Key",
		icon: "🚀",
		color: "cyan",
		age: "Thiếu niên · người lớn",
		listen: "Thông tin chính trong tình huống hằng ngày",
		speak: "Hỏi đáp và thảo luận chủ đề quen thuộc"
	},
	{
		id: "b1",
		short: "B1",
		name: "Preliminary",
		icon: "🐼",
		color: "purple",
		age: "Thiếu niên · người lớn",
		listen: "Nắm ý chính, thái độ và chi tiết",
		speak: "Phỏng vấn, mô tả và thảo luận"
	},
	{
		id: "b2",
		short: "B2",
		name: "First",
		icon: "🦊",
		color: "coral",
		age: "Thiếu niên · người lớn",
		listen: "Hiểu nhiều người nói và quan điểm",
		speak: "So sánh, lập luận và tương tác tự nhiên"
	},
	{
		id: "c1",
		short: "C1",
		name: "Advanced",
		icon: "🦉",
		color: "mint",
		age: "Người lớn · học thuật",
		listen: "Theo dõi bài nói dài và hàm ý",
		speak: "Trình bày, thương lượng và phát triển ý"
	},
	{
		id: "c2",
		short: "C2",
		name: "Proficiency",
		icon: "🦅",
		color: "indigo",
		age: "Người lớn · chuyên sâu",
		listen: "Hiểu sắc thái, tốc độ tự nhiên",
		speak: "Diễn đạt chính xác, linh hoạt và tinh tế"
	}
];
var cambridgeExamFormats = [
	{
		id: "pre-a1",
		level: "Pre A1",
		exam: "Starters",
		age: "6–8 tuổi",
		description: "Làm quen tiếng Anh qua tranh, từ vựng quen thuộc, câu trả lời ngắn và tương tác đơn giản.",
		papers: [
			{
				name: "Listening",
				time: "khoảng 20 phút",
				parts: 4,
				tasks: [
					"Nối tên với tranh",
					"Viết từ hoặc số",
					"Chọn tranh đúng",
					"Tô màu hoặc vẽ theo hướng dẫn"
				]
			},
			{
				name: "Reading & Writing",
				time: "khoảng 20 phút",
				parts: 5,
				tasks: [
					"Đúng/sai theo tranh",
					"Viết từ đơn giản",
					"Chọn từ phù hợp",
					"Hoàn thành đoạn ngắn",
					"Trả lời câu hỏi theo tranh"
				]
			},
			{
				name: "Speaking",
				time: "3–5 phút",
				parts: 4,
				tasks: [
					"Tìm đồ vật trong tranh",
					"Trả lời câu hỏi cá nhân",
					"Nói từ/câu ngắn",
					"Gọi tên đồ vật quen thuộc"
				]
			}
		],
		practice: [
			{
				title: "Picture Choice",
				skill: "Listening",
				sample: "Nghe câu mô tả và chọn đúng con vật/đồ vật trong tranh."
			},
			{
				title: "One-word Answer",
				skill: "Reading & Writing",
				sample: "Nhìn tranh và viết một từ: apple, chair, school, blue..."
			},
			{
				title: "Point and Say",
				skill: "Speaking",
				sample: "Chỉ vào đồ vật trong tranh và trả lời: What is this? What colour is it?"
			}
		]
	},
	{
		id: "a1",
		level: "A1",
		exam: "Movers",
		age: "7–10 tuổi",
		description: "Tăng khả năng hiểu hội thoại ngắn, mô tả tranh và kể câu chuyện đơn giản.",
		papers: [
			{
				name: "Listening",
				time: "khoảng 25 phút",
				parts: 5,
				tasks: [
					"Nối người với tên",
					"Điền từ/số",
					"Chọn tranh",
					"Hoàn thành ghi chú",
					"Tô màu và viết"
				]
			},
			{
				name: "Reading & Writing",
				time: "khoảng 30 phút",
				parts: 6,
				tasks: [
					"Nối định nghĩa",
					"Hoàn thành hội thoại",
					"Chọn từ cho truyện",
					"Hoàn thành văn bản ngắn",
					"Viết câu theo tranh"
				]
			},
			{
				name: "Speaking",
				time: "5–7 phút",
				parts: 4,
				tasks: [
					"Tìm điểm khác nhau",
					"Kể chuyện theo tranh",
					"Chọn vật khác nhóm",
					"Trả lời câu hỏi cá nhân"
				]
			}
		],
		practice: [
			{
				title: "Names and People",
				skill: "Listening",
				sample: "Nghe mô tả và nối từng bạn nhỏ với đúng tên."
			},
			{
				title: "Story Gap Fill",
				skill: "Reading & Writing",
				sample: "Đọc câu chuyện ngắn và chọn từ còn thiếu."
			},
			{
				title: "Four-picture Story",
				skill: "Speaking",
				sample: "Kể lại câu chuyện từ 4 tranh theo thứ tự."
			}
		]
	},
	{
		id: "a2y",
		level: "A2",
		exam: "Flyers",
		age: "9–12 tuổi",
		description: "Luyện nghe chi tiết, đọc hiểu văn bản ngắn và nói thành đoạn rõ ý.",
		papers: [
			{
				name: "Listening",
				time: "khoảng 25 phút",
				parts: 5,
				tasks: [
					"Nối tên",
					"Hoàn thành ghi chú",
					"Chọn tranh",
					"Hoàn thành đoạn văn",
					"Tô màu và viết"
				]
			},
			{
				name: "Reading & Writing",
				time: "khoảng 40 phút",
				parts: 7,
				tasks: [
					"Nối định nghĩa",
					"Hoàn thành hội thoại",
					"Điền từ cho truyện",
					"Ngữ pháp trong đoạn văn",
					"Viết câu trả lời ngắn",
					"Viết đoạn theo gợi ý"
				]
			},
			{
				name: "Speaking",
				time: "7–9 phút",
				parts: 4,
				tasks: [
					"Tìm điểm khác nhau",
					"Hỏi đáp thông tin",
					"Kể chuyện theo tranh",
					"Câu hỏi cá nhân mở rộng"
				]
			}
		],
		practice: [
			{
				title: "Information Exchange",
				skill: "Speaking",
				sample: "Hỏi và trả lời để hoàn thành bảng thông tin."
			},
			{
				title: "Short Text Questions",
				skill: "Reading",
				sample: "Đọc thông báo, email hoặc truyện ngắn rồi trả lời."
			},
			{
				title: "Note Completion",
				skill: "Listening",
				sample: "Nghe thông tin về lớp học/chuyến đi và điền chi tiết còn thiếu."
			}
		]
	},
	{
		id: "a2",
		level: "A2",
		exam: "Key",
		age: "Thiếu niên · người lớn",
		description: "Dành cho người học giao tiếp cơ bản trong tình huống đời sống, học tập và du lịch.",
		papers: [
			{
				name: "Reading & Writing",
				time: "60 phút",
				parts: 7,
				tasks: [
					"Trắc nghiệm đọc hiểu",
					"Nối thông tin",
					"Điền từ",
					"Viết email ngắn",
					"Viết truyện hoặc bài ngắn"
				]
			},
			{
				name: "Listening",
				time: "khoảng 30 phút",
				parts: 5,
				tasks: [
					"Chọn đáp án",
					"Điền thông tin",
					"Nối người/chủ đề"
				]
			},
			{
				name: "Speaking",
				time: "8–10 phút",
				parts: 2,
				tasks: ["Hỏi đáp cá nhân", "Trao đổi theo chủ đề với bạn thi"]
			}
		],
		practice: [
			{
				title: "Short Email",
				skill: "Writing",
				sample: "Viết email 25+ từ trả lời lời mời hoặc kế hoạch."
			},
			{
				title: "Daily Situations",
				skill: "Listening",
				sample: "Nghe hội thoại ở nhà ga, lớp học, cửa hàng, trung tâm thể thao."
			},
			{
				title: "Collaborative Talk",
				skill: "Speaking",
				sample: "Trao đổi lựa chọn hoạt động cuối tuần và giải thích lý do."
			}
		]
	},
	{
		id: "b1",
		level: "B1",
		exam: "Preliminary",
		age: "Thiếu niên · người lớn",
		description: "Tập trung đọc hiểu nhiều dạng văn bản, viết email/bài ngắn và nói có phát triển ý.",
		papers: [
			{
				name: "Reading",
				time: "45 phút",
				parts: 6,
				tasks: [
					"Trắc nghiệm",
					"Nối thông tin",
					"Điền câu vào đoạn",
					"Điền từ theo ngữ cảnh",
					"Điền từ mở"
				]
			},
			{
				name: "Writing",
				time: "45 phút",
				parts: 2,
				tasks: ["Viết email", "Viết bài báo hoặc câu chuyện"]
			},
			{
				name: "Listening",
				time: "khoảng 30 phút",
				parts: 4,
				tasks: [
					"Chọn đáp án",
					"Điền ghi chú",
					"Hiểu ý chính và thái độ"
				]
			},
			{
				name: "Speaking",
				time: "10–12 phút",
				parts: 4,
				tasks: [
					"Phỏng vấn",
					"Mô tả ảnh",
					"Thảo luận",
					"Trả lời câu hỏi mở rộng"
				]
			}
		],
		practice: [
			{
				title: "Photo Description",
				skill: "Speaking",
				sample: "Mô tả ảnh trong 45 giây: nơi chốn, người, hoạt động, cảm xúc."
			},
			{
				title: "Opinion Email",
				skill: "Writing",
				sample: "Viết email 100 từ nêu ý kiến và đề xuất."
			},
			{
				title: "Gapped Text",
				skill: "Reading",
				sample: "Chọn câu phù hợp để hoàn thành đoạn văn."
			}
		]
	},
	{
		id: "b2",
		level: "B2",
		exam: "First",
		age: "Thiếu niên · người lớn",
		description: "Củng cố năng lực học thuật và giao tiếp độc lập: lập luận, so sánh, viết có cấu trúc.",
		papers: [
			{
				name: "Reading & Use of English",
				time: "75 phút",
				parts: 7,
				tasks: [
					"Multiple-choice cloze",
					"Open cloze",
					"Word formation",
					"Key word transformation",
					"Reading multiple choice",
					"Gapped text",
					"Multiple matching"
				]
			},
			{
				name: "Writing",
				time: "80 phút",
				parts: 2,
				tasks: ["Essay bắt buộc", "Article, email, report hoặc review"]
			},
			{
				name: "Listening",
				time: "khoảng 40 phút",
				parts: 4,
				tasks: [
					"Trắc nghiệm",
					"Hoàn thành câu",
					"Nối người với ý kiến"
				]
			},
			{
				name: "Speaking",
				time: "12–14 phút",
				parts: 4,
				tasks: [
					"Interview",
					"Long turn",
					"Collaborative task",
					"Discussion"
				]
			}
		],
		practice: [
			{
				title: "Key Word Transformation",
				skill: "Use of English",
				sample: "Viết lại câu giữ nguyên nghĩa bằng từ khóa cho sẵn."
			},
			{
				title: "Balanced Essay",
				skill: "Writing",
				sample: "Viết essay có mở bài, hai luận điểm, ví dụ và kết luận."
			},
			{
				title: "Compare and Speculate",
				skill: "Speaking",
				sample: "So sánh hai ảnh, suy đoán tình huống và nêu lựa chọn."
			}
		]
	}
];
var lessonTopics = [
	[
		"Family & Friends",
		"Gia đình và bạn bè",
		"👨‍👩‍👧"
	],
	[
		"At School",
		"Trường học và lớp học",
		"🏫"
	],
	[
		"Food & Drinks",
		"Đồ ăn và thức uống",
		"🍎"
	],
	[
		"Animals Around Us",
		"Động vật quanh em",
		"🦁"
	],
	[
		"My Home",
		"Nhà cửa và đồ vật",
		"🏠"
	],
	[
		"Daily Routines",
		"Sinh hoạt hằng ngày",
		"⏰"
	],
	[
		"Fun & Games",
		"Trò chơi và sở thích",
		"⚽"
	],
	[
		"Weather & Clothes",
		"Thời tiết và trang phục",
		"🌦️"
	],
	[
		"Around Town",
		"Địa điểm trong thành phố",
		"🏙️"
	],
	[
		"Travel & Transport",
		"Du lịch và phương tiện",
		"🚌"
	],
	[
		"Health & Wellbeing",
		"Sức khỏe và thói quen tốt",
		"🌿"
	],
	[
		"Shopping Smart",
		"Mua sắm và lựa chọn",
		"🛍️"
	],
	[
		"Nature & Environment",
		"Thiên nhiên và môi trường",
		"🌳"
	],
	[
		"Study & Work",
		"Học tập và công việc",
		"💼"
	],
	[
		"Technology Today",
		"Công nghệ trong cuộc sống",
		"💻"
	],
	[
		"Culture & Media",
		"Văn hóa và truyền thông",
		"🎬"
	],
	[
		"Ideas & Opinions",
		"Ý kiến và thảo luận",
		"💡"
	],
	[
		"The Future",
		"Dự đoán và kế hoạch",
		"🚀"
	]
];
var lessonFormats = [
	"Nghe chọn tranh",
	"Nghe điền thông tin",
	"Nghe xác định ý chính",
	"Nghe nhận biết thái độ",
	"Nói theo mẫu",
	"Mô tả tranh",
	"Đóng vai hội thoại",
	"Thảo luận và phản biện"
];
var levelCatalog = [
	[
		"Pre A1",
		"Starters",
		"Trẻ em",
		10
	],
	[
		"A1",
		"Movers",
		"Trẻ em",
		12
	],
	[
		"A2 Flyers",
		"Flyers",
		"Trẻ em",
		14
	],
	[
		"A2 Key",
		"Key",
		"Thiếu niên",
		16
	],
	[
		"B1",
		"Preliminary",
		"Thiếu niên",
		18
	],
	[
		"B2",
		"First",
		"Người lớn",
		22
	],
	[
		"C1",
		"Advanced",
		"Người lớn",
		25
	],
	[
		"C2",
		"Proficiency",
		"Người lớn",
		28
	]
];
var lessons = levelCatalog.flatMap(([level, exam, type, base], levelIndex) => Array.from({ length: 35 }, (_, index) => {
	const topic = lessonTopics[(index + levelIndex * 2) % lessonTopics.length];
	return {
		id: `${levelIndex + 1}-${index + 1}`,
		level,
		exam,
		title: `${topic[0]} ${Math.floor(index / lessonTopics.length) + 1}`,
		topic: topic[1],
		time: `${base + index % 6} phút`,
		type,
		icon: topic[2],
		format: lessonFormats[(index + levelIndex) % lessonFormats.length],
		skill: index % 3 === 0 ? "Nghe" : index % 3 === 1 ? "Nói" : "Nghe + Nói"
	};
}));
function Wave({ active = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `wave ${active ? "active" : ""}`,
		children: [
			12,
			25,
			18,
			36,
			48,
			26,
			55,
			38,
			22,
			42,
			58,
			31,
			17,
			49,
			34,
			24,
			52,
			29,
			40,
			16,
			33,
			45,
			21,
			37,
			27
		].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { height: h } }, i))
	});
}
function lessonContent(lesson) {
	const advanced = [
		"B2",
		"C1",
		"C2"
	].some((x) => lesson.level.startsWith(x));
	const mid = lesson.level.startsWith("B1") || lesson.level.startsWith("A2 Key");
	return {
		transcript: advanced ? `Host: Today we are exploring ${lesson.topic.toLowerCase()} and the way it influences everyday decisions. Speaker: In my experience, small choices can have a surprisingly significant effect. Although people may disagree about the best approach, listening carefully helps us understand the reasons behind each opinion. Host: What would you recommend? Speaker: I would begin with a practical goal, review the results, and then adapt the plan rather than expecting an immediate perfect solution.` : mid ? `Anna: Hi Ben. Our topic today is ${lesson.topic.toLowerCase()}. What do you think? Ben: I think it is useful because it is part of everyday life. Anna: Can you give me an example? Ben: Yes. Yesterday I made a simple plan, asked two friends for advice, and then chose the best option. Anna: That sounds sensible. I will try the same idea next time.` : `Lucy: Hello, Tom! Today we are learning about ${lesson.topic.toLowerCase()}. Tom: Great! I can see three things in the picture. Lucy: What is your favourite one? Tom: I like the blue one. It is small and friendly. Lucy: Let us listen, point, and say the words together.`,
		questions: [
			{
				q: "What is the main topic of the conversation?",
				options: [
					lesson.topic,
					"A difficult examination",
					"A sports result"
				],
				answer: 0,
				explain: `The speakers introduce ${lesson.topic.toLowerCase()} as their main topic.`
			},
			{
				q: advanced ? "What does the speaker recommend?" : "How many things can Tom see?",
				options: advanced ? [
					"Set a goal, review and adapt",
					"Avoid making a plan",
					"Expect a perfect result immediately"
				] : [
					"Two",
					"Three",
					"Five"
				],
				answer: advanced ? 0 : 1,
				explain: advanced ? "The speaker recommends a gradual, reflective approach." : "Tom says that he can see three things."
			},
			{
				q: mid ? "Who did Ben ask for advice?" : advanced ? "Why is careful listening useful?" : "Which one does Tom like?",
				options: mid ? [
					"Two friends",
					"His teacher",
					"Nobody"
				] : advanced ? [
					"It reveals reasons behind opinions",
					"It ends every disagreement",
					"It makes decisions immediate"
				] : [
					"The blue one",
					"The red one",
					"The big one"
				],
				answer: 0,
				explain: mid ? "Ben says he asked two friends for advice." : advanced ? "The speaker says listening helps people understand the reasons behind different opinions." : "Tom says he likes the blue one."
			}
		],
		prompt: advanced ? `Give a 60–90 second response about ${lesson.topic.toLowerCase()}. State your view, give an example, acknowledge another perspective and conclude.` : mid ? `Talk for 45 seconds about ${lesson.topic.toLowerCase()}. Give your opinion and two supporting details.` : `Look at the picture and say 4–6 simple sentences about ${lesson.topic.toLowerCase()}.`,
		target: advanced ? "Fluency · range · coherence · pronunciation" : mid ? "Clear ideas · linking words · pronunciation" : "Key words · complete sentences · clear sounds"
	};
}
function Home() {
	const [selected, setSelected] = (0, import_react.useState)("pre-a1");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)("Tất cả");
	const [levelFilter, setLevelFilter] = (0, import_react.useState)("Tất cả cấp độ");
	const [query, setQuery] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [openLesson, setOpenLesson] = (0, import_react.useState)(null);
	const [showTranscript, setShowTranscript] = (0, import_react.useState)(false);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [lessonAudio, setLessonAudio] = (0, import_react.useState)(false);
	const [speaking, setSpeaking] = (0, import_react.useState)(false);
	const [accent, setAccent] = (0, import_react.useState)("en-GB");
	const [examLevelId, setExamLevelId] = (0, import_react.useState)("pre-a1");
	const [recordingUrl, setRecordingUrl] = (0, import_react.useState)(null);
	const [recognisedText, setRecognisedText] = (0, import_react.useState)("");
	const [pronunciationScore, setPronunciationScore] = (0, import_react.useState)(null);
	const recorderRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const current = levels.find((l) => l.id === selected) ?? levels[0];
	const currentExam = cambridgeExamFormats.find((exam) => exam.id === examLevelId) ?? cambridgeExamFormats[0];
	const filteredLessons = (0, import_react.useMemo)(() => lessons.filter((l) => (filter === "Tất cả" || l.type === filter) && (levelFilter === "Tất cả cấp độ" || l.level === levelFilter) && (!query || `${l.title} ${l.topic} ${l.format}`.toLowerCase().includes(query.toLowerCase()))), [
		filter,
		levelFilter,
		query
	]);
	const pageSize = 12;
	const totalPages = Math.max(1, Math.ceil(filteredLessons.length / pageSize));
	const visibleLessons = filteredLessons.slice((page - 1) * pageSize, page * pageSize);
	const changeFilter = (value, kind) => {
		if (kind === "type") setFilter(value);
		else setLevelFilter(value);
		setPage(1);
	};
	const detail = openLesson ? lessonContent(openLesson) : null;
	const openDetail = (lesson) => {
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
		if (!detail) return;
		window.speechSynthesis.cancel();
		if (lessonAudio) {
			setLessonAudio(false);
			return;
		}
		const voice = new SpeechSynthesisUtterance(detail.transcript);
		voice.lang = accent;
		voice.rate = openLesson?.level.startsWith("Pre") ? .78 : openLesson?.level.startsWith("A1") ? .85 : 1;
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
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const recorder = new MediaRecorder(stream);
			recorderRef.current = recorder;
			chunksRef.current = [];
			setRecognisedText("");
			setPronunciationScore(null);
			recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
			recorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
				if (recordingUrl) URL.revokeObjectURL(recordingUrl);
				setRecordingUrl(URL.createObjectURL(blob));
				stream.getTracks().forEach((t) => t.stop());
				setSpeaking(false);
			};
			recorder.start();
			setSpeaking(true);
			const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			if (Recognition && detail) {
				const recognition = new Recognition();
				recognition.lang = accent;
				recognition.interimResults = false;
				recognition.onresult = (e) => {
					const said = e.results[0][0].transcript;
					setRecognisedText(said);
					const target = detail.transcript.toLowerCase().split(/\s+/);
					const matched = said.toLowerCase().split(/\s+/).filter((w) => target.includes(w)).length;
					setPronunciationScore(Math.min(98, Math.max(45, Math.round(45 + matched / Math.max(1, said.split(/\s+/).length) * 53))));
				};
				recognition.onerror = () => {};
				recognition.start();
			}
		} catch {
			alert("Bạn cần cho phép micro để ghi âm. Hãy kiểm tra quyền truy cập micro của trình duyệt.");
		}
	};
	const downloadRecording = () => {
		if (!recordingUrl || !openLesson) return;
		const link = document.createElement("a");
		link.href = recordingUrl;
		link.download = `speakup-${openLesson.id}.webm`;
		link.click();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "brand",
					href: "#top",
					"aria-label": "SpeakUp Cambridge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						children: "▥"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SpeakUp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Cambridge" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "menu-button",
					onClick: () => setMenu(!menu),
					"aria-label": "Mở menu",
					children: "☰"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: menu ? "open" : "",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#roadmap",
							children: "🗺️ Lộ trình"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#exam-formats",
							children: "📝 Dạng đề"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#lessons",
							children: "📚 Kho bài học"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#practice",
							children: "🎧 Luyện nghe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#practice",
							children: "🎙️ Luyện nói"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#progress",
							children: "📈 Tiến độ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "hello",
					href: "/login",
					children: ["👤 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Đăng nhập" })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			id: "top",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "▥ CAMBRIDGE LISTENING & SPEAKING"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Nghe chuẩn.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Nói tự tin." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Chinh phục Cambridge."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lộ trình từ Pre A1 đến C2, tập trung luyện nghe chủ động và phản xạ nói qua bài học ngắn, hội thoại thực tế và phản hồi phát âm." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "button primary",
							href: "#roadmap",
							children: "✨ Kiểm tra trình độ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "button secondary",
							href: "#roadmap",
							children: "Khám phá lộ trình →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "trust-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Nội dung theo CEFR" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Trẻ em & người lớn" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Học 15 phút/ngày" })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "audio-lab",
				id: "practice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "audio-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "pill yellow",
								children: [
									"★ ",
									current.short,
									" ",
									current.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected === "pre-a1" ? "At the Zoo" : current.name + " Practice" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "big-emoji",
								children: current.icon
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wave, { active: playing }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "player",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setPlaying(!playing),
									children: playing ? "Ⅱ" : "▶"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: playing ? "Đang phát bài nghe..." : "Nhấn để bắt đầu nghe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"00:",
									playing ? "18" : "00",
									" / 01:05"
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"0.75× \xA0 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1×" }),
									" \xA0 1.25×"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sentence",
							children: ["🔊 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Could I have an orange juice, please?" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `speak-card ${recording ? "recording" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "speak-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pill mint",
								children: "✦ Nói lại câu này"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Phát âm ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: recording ? "..." : "86%" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mic",
							onClick: () => setRecording(!recording),
							children: "🎙️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wave, { active: recording }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: recording ? "Đang lắng nghe... Nhấn để kết thúc" : "Nhấn micro và nói lại câu mẫu" })
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "level-rail",
			id: "roadmap",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: "LỘ TRÌNH CAMBRIDGE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Chọn đúng cấp độ, tiến bộ từng ngày" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "8 chặng học từ làm quen tiếng Anh đến giao tiếp thành thạo." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "levels",
					children: levels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `level ${l.color} ${selected === l.id ? "selected" : ""}`,
						onClick: () => setSelected(l.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.icon }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: l.short }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: l.name })
						]
					}, l.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "level-detail",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "detail-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: current.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "CẤP ĐỘ ĐANG CHỌN" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
									current.short,
									" ",
									current.name
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.age })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "🎧 Mục tiêu Nghe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.listen })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "🎙️ Mục tiêu Nói" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current.speak })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button primary",
							children: "Bắt đầu học →"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "method",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "kicker",
					children: "PHƯƠNG PHÁP TRỌNG TÂM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Nghe chủ động – Nói phản xạ" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-sub",
					children: "Mỗi bài học đi theo vòng luyện tập ngắn, rõ ràng và có thể lặp lại."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "method-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎧" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1. Nghe lấy ý" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nghe tình huống tự nhiên để xác định người nói, bối cảnh và ý chính." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔍" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "2. Nghe chi tiết" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Phát lại theo tốc độ phù hợp, hoàn thành câu hỏi và mở transcript." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🗣️" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "3. Nói có hướng dẫn" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Shadowing từng câu, luyện trọng âm, nhịp điệu và âm cuối." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🏆" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "4. Nói tự do" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Trả lời mở, đóng vai và nhận tiêu chí tự đánh giá theo cấp độ." })
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "exam-section",
			id: "exam-formats",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "DẠNG ĐỀ THI CAMBRIDGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Luyện đúng cấu trúc từng chứng chỉ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "catalog-summary",
							children: "Bổ sung khung đề Listening, Reading, Writing, Speaking và gói luyện tập theo từng cấp độ."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "exam-note",
						children: "Nội dung luyện tập tự biên soạn theo dạng bài Cambridge English, không phải đề thi chính thức."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "exam-tabs",
					role: "tablist",
					"aria-label": "Chọn cấp độ đề thi Cambridge",
					children: cambridgeExamFormats.map((exam) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: examLevelId === exam.id ? "active" : "",
						onClick: () => setExamLevelId(exam.id),
						type: "button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: exam.exam }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: exam.level })]
					}, exam.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "exam-overview",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "exam-intro",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentExam.level }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: currentExam.exam }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: currentExam.description }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Nhóm học phù hợp: ", currentExam.age] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "paper-grid",
						children: currentExam.papers.map((paper) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "paper-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: paper.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: paper.time })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [paper.parts, " phần"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: paper.tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: task }, task)) })
							]
						}, paper.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "practice-pack",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Gói bài tập mẫu nên thêm vào kho" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: currentExam.practice.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.skill }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.sample })
					] }, item.title)) })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "lesson-section",
			id: "lessons",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: "KHO 280 BÀI HỌC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Học theo tình huống thực tế" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "catalog-summary",
							children: "35 bài cho mỗi chặng · Tập trung Nghe và Nói · Từ Pre A1 đến C2"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "filters",
						children: [
							"Tất cả",
							"Trẻ em",
							"Thiếu niên",
							"Người lớn"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: filter === f ? "active" : "",
							onClick: () => changeFilter(f, "type"),
							children: f
						}, f))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "catalog-tools",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "search-box",
							children: ["⌕ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => {
									setQuery(e.target.value);
									setPage(1);
								},
								placeholder: "Tìm chủ đề, dạng bài..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: levelFilter,
							onChange: (e) => changeFilter(e.target.value, "level"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Tất cả cấp độ" }), levelCatalog.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l[0] }, l[0]))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: filteredLessons.length }), " bài phù hợp"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lesson-grid",
					children: visibleLessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						onClick: () => openDetail(l),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lesson-visual",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.icon }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": `Mở ${l.title}`,
									children: "▶"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: l.skill })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lesson-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lesson-tags",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pill blue",
										children: l.level
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.exam })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: l.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: l.topic }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "format",
									children: ["🎯 ", l.format]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎧 + 🎙️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["⏱ ", l.time] })] })
							]
						})]
					}, l.id))
				}),
				visibleLessons.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "empty-state",
					children: "Không tìm thấy bài phù hợp. Hãy thử từ khóa hoặc bộ lọc khác."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pagination",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: page === 1,
							onClick: () => setPage((p) => p - 1),
							children: "← Trước"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Trang ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: page }),
							" / ",
							totalPages
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: page === totalPages,
							onClick: () => setPage((p) => p + 1),
							children: "Sau →"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "progress-section",
			id: "progress",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "kicker light",
					children: "TIẾN BỘ MỖI NGÀY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Biết mình đang ở đâu",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"và cần luyện gì tiếp theo."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Theo dõi số phút nghe, lượt nói, từ vựng đã học và mức độ hoàn thành từng kỹ năng." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "button white",
					href: "#top",
					children: "Bắt đầu lộ trình miễn phí →"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dashboard",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "streak",
						children: [
							"🔥 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "7 ngày" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Chuỗi học liên tục" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stats",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "84" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "phút nghe" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "36" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "lượt nói" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "bài hoàn thành" })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bars",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Nghe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "72%" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { width: "72%" } }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Nói ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "58%" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { width: "58%" } }) })
						]
					})
				]
			})]
		}),
		openLesson && detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lesson-modal",
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "modal-backdrop",
				onClick: closeDetail
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lesson-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "close",
						onClick: closeDetail,
						children: "×"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lesson-icon",
						children: openLesson.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pill blue",
							children: [
								openLesson.level,
								" · ",
								openLesson.exam
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: openLesson.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							openLesson.topic,
							" · ",
							openLesson.time
						] })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lesson-tabs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1. Nghe hiểu" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2. Kiểm tra" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3. Luyện nói" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "listen-block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🎧 Bài nghe" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "accent-picker",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Chọn giọng đọc:" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: accent === "en-GB" ? "selected" : "",
										onClick: () => setAccent("en-GB"),
										children: "🇬🇧 Anh–Anh"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: accent === "en-US" ? "selected" : "",
										onClick: () => setAccent("en-US"),
										children: "🇺🇸 Anh–Mỹ"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "audio-player",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: playLesson,
										children: lessonAudio ? "Ⅱ" : "▶"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wave, { active: lessonAudio }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lessonAudio ? "Đang phát..." : accent === "en-GB" ? "Giọng Anh–Anh · 1×" : "Giọng Anh–Mỹ · 1×" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "transcript-toggle",
								onClick: () => setShowTranscript(!showTranscript),
								children: showTranscript ? "Ẩn transcript" : "Hiện transcript sau khi nghe"
							}),
							showTranscript && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "transcript",
								children: detail.transcript
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "✅ Câu hỏi nghe hiểu" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "quiz",
							children: detail.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
									i + 1,
									". ",
									q.q
								] }),
								q.options.map((o, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: checked ? j === q.answer ? "correct" : answers[i] === j ? "wrong" : "" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: `q${i}`,
										checked: answers[i] === j,
										onChange: () => setAnswers((a) => ({
											...a,
											[i]: j
										}))
									}), o]
								}, o)),
								checked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["💡 ", q.explain] })
							] }, q.q))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button primary",
							onClick: () => setChecked(true),
							children: [
								"Chấm bài (",
								Object.keys(answers).length,
								"/3)"
							]
						}),
						checked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "score",
							children: [
								"Kết quả: ",
								detail.questions.filter((q, i) => answers[i] === q.answer).length,
								"/3 câu đúng"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "speaking-practice",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "🎙️ Luyện nói & tự chấm" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail.prompt }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "target",
								children: ["Tiêu chí: ", detail.target]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `record-button ${speaking ? "active" : ""}`,
								onClick: recordSpeech,
								children: [
									"🎙️ ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: speaking ? "Dừng và lưu bản ghi" : "Bắt đầu nói" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: speaking ? "Đang ghi âm – nhấn để hoàn thành" : "Cho phép micro để ghi âm" })
								]
							}),
							speaking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wave, { active: true }),
							recordingUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "recording-result",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
									controls: true,
									src: recordingUrl
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: downloadRecording,
									children: "⇩ Tải tệp ghi âm"
								})]
							}),
							recognisedText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ai-feedback",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
										"Nhận diện giọng nói: ",
										pronunciationScore,
										"%"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"Hệ thống nghe được: “",
										recognisedText,
										"”"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Điểm dựa trên mức độ nhận diện câu nói; hãy nghe lại bản ghi để tự điều chỉnh âm, nhịp và trọng âm." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "privacy-note",
								children: "Tệp ghi âm chỉ được giữ trong trình duyệt và có thể tải về máy; không tự động tải lên máy chủ."
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "footer",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-mark",
						children: "▥"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SpeakUp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Cambridge" })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nền tảng luyện Nghe – Nói theo lộ trình Cambridge và CEFR." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nội dung tham khảo cấu trúc Cambridge English; không phải website chính thức của Cambridge." })
			]
		})
	] });
}
//#endregion
export { Home as default };
