import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/data/cambridgePracticeBank.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var youngThemes = [
	"Một ngày ở trường",
	"Tham quan sở thú",
	"Cuối tuần cùng gia đình",
	"Đồ ăn và bữa tiệc",
	"Kỳ nghỉ ngày mưa",
	"Ngày hội thể thao"
];
var teenThemes = [
	"Câu lạc bộ mới",
	"Kế hoạch du lịch",
	"Thói quen lành mạnh",
	"Công nghệ ở trường",
	"Lựa chọn khi mua sắm",
	"Cuối tuần trong thành phố"
];
var advancedThemes = [
	"Học tập trong tương lai",
	"Dự án cộng đồng",
	"Thói quen truyền thông",
	"Học tập và công việc",
	"Lựa chọn vì môi trường",
	"Văn hóa và bản sắc"
];
function item(part, taskType, instruction, sampleQuestion, answerKey, skillFocus) {
	return {
		part,
		taskType,
		instruction,
		sampleQuestion,
		answerKey,
		skillFocus
	};
}
function startersTest(index) {
	const theme = youngThemes[index % youngThemes.length];
	return {
		id: `starters-practice-${index + 1}`,
		title: `Đề luyện Starters ${index + 1}`,
		levelId: "pre-a1",
		level: "Pre A1",
		exam: "Starters",
		theme,
		papers: [
			{
				paper: "Nghe",
				time: "khoảng 20 phút",
				items: [
					item("Part 1", "Nghe và nối", "Nghe mô tả ngắn và nối tên với người trong tranh.", `Which child is Ben in the ${theme.toLowerCase()} picture?`, "Ben is the boy next to the blue bag.", "tên riêng, màu sắc, vị trí"),
					item("Part 2", "Nghe và viết", "Nghe hội thoại đơn giản rồi viết tên hoặc số.", "How many books are on the desk?", "5", "số đếm, từ vựng lớp học"),
					item("Part 3", "Nghe và chọn tranh", "Chọn tranh đúng trong ba lựa chọn.", "What does the girl want for lunch?", "sandwich", "từ vựng đồ ăn"),
					item("Part 4", "Nghe và tô màu", "Tô màu hoặc vẽ đồ vật đơn giản theo hướng dẫn.", "Colour the small kite next to the tree.", "small kite = green", "giới từ, màu sắc")
				]
			},
			{
				paper: "Đọc và Viết",
				time: "20 phút",
				items: [
					item("Part 1", "Đúng/sai với từ vựng", "Đọc từ đơn giản và xác định có khớp với tranh hay không.", "This is a banana.", "yes", "nhận diện từ"),
					item("Part 2", "Câu đúng/sai theo tranh", "Đọc câu về tranh và viết yes hoặc no.", "The cat is under the chair.", "yes", "giới từ"),
					item("Part 3", "Đánh vần từ", "Sắp xếp chữ cái để viết một từ quen thuộc.", "o / d / g", "dog", "đánh vần"),
					item("Part 4", "Chọn từ", "Hoàn thành đoạn văn ngắn bằng từ cho sẵn.", "I can see a ___ in the garden.", "bird", "danh từ đơn giản"),
					item("Part 5", "Câu hỏi theo tranh", "Trả lời câu hỏi theo tranh bằng một từ.", "What colour is the ball?", "red", "trả lời ngắn")
				]
			},
			{
				paper: "Nói",
				time: "3-5 phút",
				items: [
					item("Part 1", "Tìm đồ vật", "Chỉ vào đồ vật trong tranh lớn.", "Where is the pencil?", "on the desk", "nghe và chỉ tranh"),
					item("Part 2", "Câu hỏi theo tranh", "Trả lời câu hỏi đơn giản về tranh.", "What is the boy doing?", "reading", "thì hiện tại tiếp diễn"),
					item("Part 3", "Thẻ đồ vật", "Gọi tên đồ vật quen thuộc.", "What is this?", "a bike", "gợi nhớ từ vựng"),
					item("Part 4", "Câu hỏi cá nhân", "Trả lời câu hỏi đơn giản về bản thân.", "What do you like eating?", "I like rice.", "trả lời cá nhân")
				]
			}
		]
	};
}
function moversTest(index) {
	const theme = youngThemes[(index + 1) % youngThemes.length];
	return {
		id: `movers-practice-${index + 1}`,
		title: `Đề luyện Movers ${index + 1}`,
		levelId: "a1",
		level: "A1",
		exam: "Movers",
		theme,
		papers: [
			{
				paper: "Nghe",
				time: "khoảng 25 phút",
				items: [
					item("Part 1", "Nối tên", "Nghe và nối tên với người trong tranh.", "Which girl is Daisy?", "Daisy is carrying a yellow towel.", "mô tả người"),
					item("Part 2", "Viết từ hoặc số", "Hoàn thành ghi chú bằng thông tin đơn giản.", "What time does the party start?", "3:30", "giờ và số"),
					item("Part 3", "Nối tranh", "Nối từng người với hoạt động hoặc đồ vật phù hợp.", "What did Jack buy?", "a comic book", "sự kiện quá khứ"),
					item("Part 4", "Chọn 1 trong 3 tranh", "Nghe và chọn tranh đúng.", "Where did they go after school?", "library", "địa điểm"),
					item("Part 5", "Tô màu và viết", "Làm theo hướng dẫn để tô màu và viết một từ.", "Write 'sun' next to the big cloud.", "sun", "từ vựng thời tiết")
				]
			},
			{
				paper: "Đọc và Viết",
				time: "30 phút",
				items: [
					item("Part 1", "Nối định nghĩa", "Nối định nghĩa với từ phù hợp.", "You wear this on your head.", "hat", "nối định nghĩa"),
					item("Part 2", "Hoàn thành hội thoại", "Chọn câu trả lời phù hợp nhất trong hội thoại.", "Do you want to play football?", "Yes, after lunch.", "ngôn ngữ giao tiếp chức năng"),
					item("Part 3", "Điền từ vào truyện", "Chọn từ để hoàn thành câu chuyện.", "They ___ to the park yesterday.", "went", "thì quá khứ đơn"),
					item("Part 4", "Điền từ vào đoạn văn", "Hoàn thành đoạn thông tin bằng một từ.", "Elephants are very ___ animals.", "big", "tính từ"),
					item("Part 5", "Câu hỏi về truyện", "Trả lời câu hỏi về một câu chuyện ngắn.", "Why was Tom happy?", "He found his kite.", "đọc chi tiết"),
					item("Part 6", "Viết câu", "Viết câu miêu tả tranh.", "Write one sentence about the children.", "The children are playing tennis.", "viết câu")
				]
			},
			{
				paper: "Nói",
				time: "5-7 phút",
				items: [
					item("Part 1", "Tìm điểm khác nhau", "Nói điểm khác nhau giữa hai bức tranh.", "In picture A the door is open. In picture B it is closed.", "so sánh"),
					item("Part 2", "Kể chuyện theo tranh", "Kể một câu chuyện ngắn theo tranh.", "First, the children are making a cake.", "sắp xếp trình tự"),
					item("Part 3", "Chọn tranh khác nhóm", "Giải thích tranh nào khác nhóm.", "The bike is different because it has wheels.", "nêu lý do"),
					item("Part 4", "Câu hỏi cá nhân", "Trả lời câu hỏi về trường học, sở thích và gia đình.", "What games do you play with friends?", "I play badminton.", "độ trôi chảy khi nói về bản thân")
				]
			}
		]
	};
}
function flyersTest(index) {
	const theme = teenThemes[index % teenThemes.length];
	return {
		id: `flyers-practice-${index + 1}`,
		title: `Đề luyện Flyers ${index + 1}`,
		levelId: "a2y",
		level: "A2",
		exam: "Flyers",
		theme,
		papers: [
			{
				paper: "Nghe",
				time: "khoảng 25 phút",
				items: [
					item("Part 1", "Nối tên", "Nghe và nối tên với người phù hợp.", "Who is the girl describing the poster?", "Emma", "mô tả chi tiết"),
					item("Part 2", "Hoàn thành ghi chú", "Hoàn thành ghi chú bằng từ hoặc số.", "The trip costs ___ pounds.", "12", "giá tiền và chi tiết"),
					item("Part 3", "Nối người với hoạt động", "Nối từng người với một hoạt động.", "What activity did Sophia choose?", "making a video", "hoạt động"),
					item("Part 4", "Chọn 1 trong 3 tranh", "Chọn tranh đúng.", "What did the boy forget?", "his ticket", "nghe chi tiết"),
					item("Part 5", "Tô màu và viết", "Làm theo hướng dẫn để tô màu, vẽ và viết.", "Write 'winner' below the table.", "winner", "hướng dẫn")
				]
			},
			{
				paper: "Đọc và Viết",
				time: "40 phút",
				items: [
					item("Part 1", "Nối định nghĩa", "Nối định nghĩa dài hơn với từ phù hợp.", "A place where you can watch actors perform.", "theatre", "từ vựng theo chủ đề"),
					item("Part 2", "Hoàn thành hội thoại", "Chọn câu đáp để hoàn thành hội thoại.", "How was your weekend?", "It was great, thanks.", "logic hội thoại"),
					item("Part 3", "Điền từ vào truyện", "Chọn từ để hoàn thành câu chuyện.", "Mia was excited because she had never visited the city before.", "excited", "ngữ cảnh"),
					item("Part 4", "Điền từ trắc nghiệm", "Chọn từ phù hợp nhất cho mỗi chỗ trống.", "I decided ___ join the club.", "to", "ngữ pháp"),
					item("Part 5", "Điền từ mở", "Viết một từ vào mỗi chỗ trống.", "We arrived ___ half past nine.", "at", "giới từ"),
					item("Part 6", "Câu hỏi đọc hiểu", "Đọc bài và trả lời câu hỏi.", "What was the writer's favourite part?", "the science room", "thông tin cụ thể"),
					item("Part 7", "Viết theo gợi ý", "Viết câu chuyện ngắn theo tranh.", "A surprising day at school.", "học viên tự trả lời", "viết truyện")
				]
			},
			{
				paper: "Nói",
				time: "7-9 phút",
				items: [
					item("Part 1", "Tìm điểm khác nhau", "So sánh chi tiết hai bức tranh.", "In one picture the woman is buying flowers, but in the other she is buying fruit.", "so sánh"),
					item("Part 2", "Trao đổi thông tin", "Hỏi và trả lời bằng thẻ gợi ý.", "What time does the club start?", "It starts at 4:15.", "mẫu câu hỏi"),
					item("Part 3", "Kể chuyện theo tranh", "Kể chuyện theo chuỗi tranh.", "The children planned a picnic, but the weather changed.", "kể chuyện"),
					item("Part 4", "Câu hỏi cá nhân", "Trả lời câu hỏi kèm lý do và ví dụ.", "Do you prefer learning alone or with friends?", "I prefer learning with friends because...", "trả lời mở rộng")
				]
			}
		]
	};
}
function a2KeyTest(index) {
	const theme = teenThemes[(index + 2) % teenThemes.length];
	return {
		id: `a2-key-practice-${index + 1}`,
		title: `Đề luyện A2 Key ${index + 1}`,
		levelId: "a2",
		level: "A2",
		exam: "Key",
		theme,
		papers: [
			{
				paper: "Đọc và Viết",
				time: "60 phút",
				items: [
					item("Part 1", "Trắc nghiệm 3 lựa chọn", "Đọc thông báo, tin nhắn hoặc biển báo ngắn và chọn nghĩa đúng.", "The club is closed until Friday. What does this mean?", "You can go there again on Friday.", "thông báo, biển báo"),
					item("Part 2", "Nối thông tin", "Nối người với đoạn văn ngắn phù hợp.", "Which course is best for a student who wants speaking practice?", "Conversation Club", "nối theo nhu cầu"),
					item("Part 3", "Trắc nghiệm bài đọc dài", "Đọc bài và trả lời câu hỏi.", "Why did Leo start cycling to school?", "It was quicker than the bus.", "lý do chính"),
					item("Part 4", "Điền từ trắc nghiệm", "Chọn từ phù hợp nhất cho mỗi chỗ trống.", "She is interested ___ photography.", "in", "ngữ pháp và từ vựng"),
					item("Part 5", "Điền từ mở", "Viết một từ vào mỗi chỗ trống.", "I have lived here ___ 2024.", "since", "cụm chỉ thời gian"),
					item("Part 6", "Viết email ngắn", "Viết email ngắn từ 25 từ trở lên.", "Invite a friend to a school event and say what to bring.", "học viên tự trả lời", "viết email"),
					item("Part 7", "Viết truyện hoặc bài ngắn", "Viết đoạn ngắn theo gợi ý.", "Write a story beginning: It was my first day at the club.", "học viên tự trả lời", "viết đoạn ngắn")
				]
			},
			{
				paper: "Nghe",
				time: "khoảng 30 phút",
				items: [
					item("Part 1", "Chọn tranh trắc nghiệm", "Nghe và chọn tranh đúng.", "What will they buy for lunch?", "salad", "tình huống hằng ngày"),
					item("Part 2", "Nối thông tin", "Nối người với hoạt động hoặc ý kiến.", "What does each student want to improve?", "pronunciation", "ý chính và chi tiết"),
					item("Part 3", "Trắc nghiệm", "Nghe hội thoại dài hơn và trả lời câu hỏi.", "Where will the class meet?", "outside the library", "chi tiết cụ thể"),
					item("Part 4", "Trắc nghiệm", "Nghe năm đoạn ngắn.", "Why is the speaker calling?", "to change a time", "mục đích giao tiếp"),
					item("Part 5", "Điền thông tin còn thiếu", "Hoàn thành ghi chú bằng thông tin còn thiếu.", "The teacher's room number is ___.", "204", "số và tên riêng")
				]
			},
			{
				paper: "Nói",
				time: "8-10 phút",
				items: [item("Part 1", "Phỏng vấn", "Trả lời câu hỏi cá nhân.", "Tell me about a place you like visiting.", "học viên tự trả lời", "thông tin cá nhân"), item("Part 2", "Trao đổi theo cặp", "Trao đổi lựa chọn với bạn thi.", "Choose the best activity for a school open day.", "học viên tự trả lời", "tương tác")]
			}
		]
	};
}
function b1Test(index) {
	const theme = advancedThemes[index % advancedThemes.length];
	return {
		id: `b1-preliminary-practice-${index + 1}`,
		title: `Đề luyện B1 Preliminary ${index + 1}`,
		levelId: "b1",
		level: "B1",
		exam: "Preliminary",
		theme,
		papers: [
			{
				paper: "Đọc",
				time: "45 phút",
				items: [
					item("Part 1", "Trắc nghiệm văn bản ngắn", "Đọc năm tin nhắn ngắn và chọn nghĩa đúng.", "A message says the meeting room has changed. What should students do?", "Go to the new room.", "đọc hiểu mục đích giao tiếp"),
					item("Part 2", "Nối thông tin", "Nối người với mô tả khóa học, sự kiện hoặc địa điểm.", "Which project suits someone who likes working outdoors?", "Community Garden", "nối chi tiết"),
					item("Part 3", "Trắc nghiệm", "Đọc bài dài hơn và trả lời câu hỏi.", "What is the writer's main opinion?", "Small actions can create useful change.", "ý chính"),
					item("Part 4", "Điền câu vào đoạn văn", "Chọn câu để điền vào chỗ trống trong đoạn văn.", "Choose the sentence that links the problem and solution.", "However, the group found a simple answer.", "liên kết văn bản"),
					item("Part 5", "Điền từ trắc nghiệm", "Chọn từ phù hợp nhất cho mỗi chỗ trống.", "The students ___ part in a local event.", "took", "kết hợp từ"),
					item("Part 6", "Điền từ mở", "Viết một từ vào mỗi chỗ trống.", "The project was more successful ___ expected.", "than", "kiểm soát ngữ pháp")
				]
			},
			{
				paper: "Viết",
				time: "45 phút",
				items: [item("Part 1", "Viết email", "Viết email phản hồi các ghi chú.", "Write to Alex about a school club, saying when it meets and why it is useful.", "học viên tự trả lời", "đạt mục tiêu giao tiếp"), item("Part 2", "Viết bài báo hoặc câu chuyện", "Chọn một nhiệm vụ viết.", "Write an article: The best way to learn something new.", "học viên tự trả lời", "bố cục và ngôn ngữ")]
			},
			{
				paper: "Nghe",
				time: "khoảng 30 phút",
				items: [
					item("Part 1", "Trắc nghiệm", "Nghe bảy đoạn ghi âm ngắn.", "What is the speaker's problem?", "The bus was late.", "nhận diện tình huống"),
					item("Part 2", "Trắc nghiệm", "Nghe sáu đoạn độc thoại ngắn.", "What does each speaker like about the course?", "the practical tasks", "ý kiến/thái độ"),
					item("Part 3", "Điền thông tin còn thiếu", "Hoàn thành ghi chú từ bài nghe dài hơn.", "The workshop starts at ___.", "10:15", "chi tiết"),
					item("Part 4", "Trắc nghiệm", "Nghe phỏng vấn và trả lời câu hỏi.", "Why did the guest begin the project?", "to help younger students", "lý do và thái độ")
				]
			},
			{
				paper: "Nói",
				time: "10-12 phút",
				items: [
					item("Part 1", "Phỏng vấn", "Trả lời câu hỏi về chủ đề quen thuộc.", "What do you usually do after school?", "học viên tự trả lời", "độ trôi chảy"),
					item("Part 2", "Mô tả ảnh", "Mô tả một bức ảnh màu trong khoảng một phút.", "Describe students preparing for a community event.", "học viên tự trả lời", "mô tả"),
					item("Part 3", "Thảo luận theo nhiệm vụ", "Thảo luận các lựa chọn với bạn thi.", "Choose the best activity for a class project.", "học viên tự trả lời", "tương tác"),
					item("Part 4", "Thảo luận mở rộng", "Nêu ý kiến và lý do.", "Is it better to study online or in a classroom?", "học viên tự trả lời", "nói mở rộng")
				]
			}
		]
	};
}
function b2Test(index) {
	const theme = advancedThemes[(index + 1) % advancedThemes.length];
	return {
		id: `b2-first-practice-${index + 1}`,
		title: `Đề luyện B2 First ${index + 1}`,
		levelId: "b2",
		level: "B2",
		exam: "First",
		theme,
		papers: [
			{
				paper: "Đọc và Sử dụng tiếng Anh",
				time: "75 phút",
				items: [
					item("Part 1", "Điền từ trắc nghiệm", "Chọn từ phù hợp nhất cho mỗi chỗ trống trong đoạn văn.", "The project had a positive ___ on the school community.", "impact", "lựa chọn từ vựng"),
					item("Part 2", "Điền từ mở", "Viết một từ vào mỗi chỗ trống.", "The activity was designed ___ encourage teamwork.", "to", "ngữ pháp"),
					item("Part 3", "Cấu tạo từ", "Tạo từ đúng từ từ gợi ý.", "The students showed great ___ during the event. CREATE", "creativity", "họ từ"),
					item("Part 4", "Viết lại câu với từ khóa", "Hoàn thành câu thứ hai bằng từ khóa cho sẵn.", "The workshop was easier than I expected. AS", "The workshop was not as difficult as I expected.", "diễn đạt lại ý"),
					item("Part 5", "Trắc nghiệm đọc hiểu", "Đọc bài và chọn đáp án phù hợp nhất.", "What is the writer's attitude towards online learning?", "cautiously positive", "thái độ"),
					item("Part 6", "Điền câu vào đoạn văn", "Chọn câu để hoàn thành đoạn văn.", "Select the sentence that introduces a contrast.", "Nevertheless, the results were encouraging.", "liên kết ý"),
					item("Part 7", "Nối thông tin nhiều lựa chọn", "Nối gợi ý với phần phù hợp của bài đọc.", "Which person mentions changing their original plan?", "Speaker C", "đọc quét tìm thông tin")
				]
			},
			{
				paper: "Viết",
				time: "80 phút",
				items: [item("Part 1", "Viết luận", "Viết bài luận trả lời hai ý cho sẵn và thêm ý riêng.", "Some people think students should do more project work. Do you agree?", "học viên tự trả lời", "cấu trúc lập luận"), item("Part 2", "Viết bài/email/báo cáo/đánh giá", "Chọn một nhiệm vụ và viết đúng văn phong.", "Write a review of a learning app you have used.", "học viên tự trả lời", "kiểm soát thể loại bài viết")]
			},
			{
				paper: "Nghe",
				time: "khoảng 40 phút",
				items: [
					item("Part 1", "Trắc nghiệm đoạn nghe ngắn", "Nghe các đoạn ngắn và trả lời câu hỏi.", "What does the speaker feel about the new timetable?", "It is useful but demanding.", "thái độ"),
					item("Part 2", "Hoàn thành câu", "Hoàn thành câu từ một bài độc thoại.", "The speaker recommends keeping a ___ journal.", "learning", "chi tiết"),
					item("Part 3", "Nối thông tin nhiều lựa chọn", "Nối người nói với ý kiến phù hợp.", "Which speaker changed their mind after trying the activity?", "Speaker 4", "nối ý kiến/thái độ"),
					item("Part 4", "Trắc nghiệm bài phỏng vấn", "Nghe phỏng vấn và trả lời câu hỏi.", "What is the expert's main advice?", "Review progress regularly.", "ý chính")
				]
			},
			{
				paper: "Nói",
				time: "12-14 phút",
				items: [
					item("Part 1", "Phỏng vấn", "Trả lời câu hỏi về bản thân và chủ đề quen thuộc.", "How do you usually organise your study time?", "học viên tự trả lời", "phản hồi tự nhiên"),
					item("Part 2", "Nói cá nhân dài", "So sánh hai ảnh và trả lời câu hỏi tiếp theo.", "Compare photos showing two different ways of learning.", "học viên tự trả lời", "so sánh và suy đoán"),
					item("Part 3", "Trao đổi theo cặp", "Thảo luận nhiều lựa chọn và thống nhất quyết định.", "Talk about ways to make a school event successful.", "học viên tự trả lời", "lượt lời khi thảo luận"),
					item("Part 4", "Thảo luận", "Thảo luận các câu hỏi trừu tượng hơn.", "How important is creativity in education?", "học viên tự trả lời", "lập luận và độ đa dạng ngôn ngữ")
				]
			}
		]
	};
}
var cambridgePracticeBank = [
	...Array.from({ length: 6 }, (_, index) => startersTest(index)),
	...Array.from({ length: 6 }, (_, index) => moversTest(index)),
	...Array.from({ length: 6 }, (_, index) => flyersTest(index)),
	...Array.from({ length: 6 }, (_, index) => a2KeyTest(index)),
	...Array.from({ length: 6 }, (_, index) => b1Test(index)),
	...Array.from({ length: 6 }, (_, index) => b2Test(index))
];
//#endregion
//#region app/page.tsx
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
		listen: "Nghe detail trong hội thoại quen thuộc",
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
		listen: "Nắm ý chính, thái độ và detail",
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
				name: "Nghe",
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
				name: "Đọc và Viết",
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
				name: "Nói",
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
				title: "Chọn tranh đúng",
				skill: "Nghe",
				sample: "Nghe câu mô tả và chọn đúng con vật/đồ vật trong tranh."
			},
			{
				title: "Trả lời một từ",
				skill: "Đọc và Viết",
				sample: "Nhìn tranh và viết một từ: apple, chair, school, blue..."
			},
			{
				title: "Chỉ tranh và nói",
				skill: "Nói",
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
				name: "Nghe",
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
				name: "Đọc và Viết",
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
				name: "Nói",
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
				title: "Nối tên với người",
				skill: "Nghe",
				sample: "Nghe mô tả và nối từng bạn nhỏ với đúng tên."
			},
			{
				title: "Điền từ vào truyện",
				skill: "Đọc và Viết",
				sample: "Đọc câu chuyện ngắn và chọn từ còn thiếu."
			},
			{
				title: "Kể chuyện 4 tranh",
				skill: "Nói",
				sample: "Kể lại câu chuyện từ 4 tranh theo thứ tự."
			}
		]
	},
	{
		id: "a2y",
		level: "A2",
		exam: "Flyers",
		age: "9–12 tuổi",
		description: "Luyện nghe detail, đọc hiểu văn bản ngắn và nói thành đoạn rõ ý.",
		papers: [
			{
				name: "Nghe",
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
				name: "Đọc và Viết",
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
				name: "Nói",
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
				title: "Trao đổi thông tin",
				skill: "Nói",
				sample: "Hỏi và trả lời để hoàn thành bảng thông tin."
			},
			{
				title: "Câu hỏi văn bản ngắn",
				skill: "Đọc",
				sample: "Đọc thông báo, email hoặc truyện ngắn rồi trả lời."
			},
			{
				title: "Hoàn thành ghi chú",
				skill: "Nghe",
				sample: "Nghe thông tin về lớp học/chuyến đi và điền detail còn thiếu."
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
				name: "Đọc và Viết",
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
				name: "Nghe",
				time: "khoảng 30 phút",
				parts: 5,
				tasks: [
					"Chọn đáp án",
					"Điền thông tin",
					"Nối người/chủ đề"
				]
			},
			{
				name: "Nói",
				time: "8–10 phút",
				parts: 2,
				tasks: ["Hỏi đáp cá nhân", "Trao đổi theo chủ đề với bạn thi"]
			}
		],
		practice: [
			{
				title: "Viết email ngắn",
				skill: "Viết",
				sample: "Viết email 25+ từ trả lời lời mời hoặc kế hoạch."
			},
			{
				title: "Tình huống hằng ngày",
				skill: "Nghe",
				sample: "Nghe hội thoại ở nhà ga, lớp học, cửa hàng, trung tâm thể thao."
			},
			{
				title: "Trao đổi theo cặp",
				skill: "Nói",
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
				name: "Đọc",
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
				name: "Viết",
				time: "45 phút",
				parts: 2,
				tasks: ["Viết email", "Viết bài báo hoặc câu chuyện"]
			},
			{
				name: "Nghe",
				time: "khoảng 30 phút",
				parts: 4,
				tasks: [
					"Chọn đáp án",
					"Điền ghi chú",
					"Hiểu ý chính và thái độ"
				]
			},
			{
				name: "Nói",
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
				title: "Mô tả ảnh",
				skill: "Nói",
				sample: "Mô tả ảnh trong 45 giây: nơi chốn, người, hoạt động, cảm xúc."
			},
			{
				title: "Email nêu ý kiến",
				skill: "Viết",
				sample: "Viết email 100 từ nêu ý kiến và đề xuất."
			},
			{
				title: "Điền câu vào đoạn văn",
				skill: "Đọc",
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
				name: "Đọc & Sử dụng tiếng Anh",
				time: "75 phút",
				parts: 7,
				tasks: [
					"Điền từ trắc nghiệm",
					"Điền từ mở",
					"Cấu tạo từ",
					"Viết lại câu với từ khóa",
					"Trắc nghiệm đọc hiểu",
					"Điền câu vào đoạn văn",
					"Nối thông tin nhiều lựa chọn"
				]
			},
			{
				name: "Viết",
				time: "80 phút",
				parts: 2,
				tasks: ["Viết luận bắt buộc", "Viết bài/email/báo cáo/đánh giá"]
			},
			{
				name: "Nghe",
				time: "khoảng 40 phút",
				parts: 4,
				tasks: [
					"Trắc nghiệm",
					"Hoàn thành câu",
					"Nối người với ý kiến"
				]
			},
			{
				name: "Nói",
				time: "12–14 phút",
				parts: 4,
				tasks: [
					"Phỏng vấn",
					"Nói cá nhân dài",
					"Trao đổi theo cặp",
					"Thảo luận"
				]
			}
		],
		practice: [
			{
				title: "Viết lại câu với từ khóa",
				skill: "Sử dụng tiếng Anh",
				sample: "Viết lại câu giữ nguyên nghĩa bằng từ khóa cho sẵn."
			},
			{
				title: "Viết luận cân đối",
				skill: "Viết",
				sample: "Viết bài luận có mở bài, hai luận điểm, ví dụ và kết luận."
			},
			{
				title: "So sánh và suy đoán",
				skill: "Nói",
				sample: "So sánh hai ảnh, suy đoán tình huống và nêu lựa chọn."
			}
		]
	}
];
var lessonTopics = [
	[
		"Gia đình và bạn bè",
		"Gia đình và bạn bè",
		"family and friends",
		"👨‍👩‍👧"
	],
	[
		"Ở trường học",
		"Trường học và lớp học",
		"school and classroom objects",
		"🏫"
	],
	[
		"Đồ ăn và thức uống",
		"Đồ ăn và thức uống",
		"food and drinks",
		"🍎"
	],
	[
		"Động vật quanh em",
		"Động vật quanh em",
		"animals around us",
		"🦁"
	],
	[
		"Ngôi nhà của em",
		"Nhà cửa và đồ vật",
		"homes and furniture",
		"🏠"
	],
	[
		"Sinh hoạt hằng ngày",
		"Sinh hoạt hằng ngày",
		"daily routines",
		"⏰"
	],
	[
		"Trò chơi và sở thích",
		"Trò chơi và sở thích",
		"games and hobbies",
		"⚽"
	],
	[
		"Thời tiết và trang phục",
		"Thời tiết và trang phục",
		"weather and clothes",
		"🌦️"
	],
	[
		"Địa điểm trong thành phố",
		"Địa điểm trong thành phố",
		"places around town",
		"🏙️"
	],
	[
		"Du lịch và phương tiện",
		"Du lịch và phương tiện",
		"travel and transport",
		"🚌"
	],
	[
		"Sức khỏe và thói quen tốt",
		"Sức khỏe và thói quen tốt",
		"health and good habits",
		"🌿"
	],
	[
		"Mua sắm thông minh",
		"Mua sắm và lựa chọn",
		"shopping and choices",
		"🛍️"
	],
	[
		"Thiên nhiên và môi trường",
		"Thiên nhiên và môi trường",
		"nature and the environment",
		"🌳"
	],
	[
		"Học tập và công việc",
		"Học tập và công việc",
		"study and work",
		"💼"
	],
	[
		"Công nghệ hôm nay",
		"Công nghệ trong cuộc sống",
		"technology in daily life",
		"💻"
	],
	[
		"Văn hóa và truyền thông",
		"Văn hóa và truyền thông",
		"culture and media",
		"🎬"
	],
	[
		"Ý kiến và thảo luận",
		"Ý kiến và thảo luận",
		"ideas and opinions",
		"💡"
	],
	[
		"Tương lai và kế hoạch",
		"Dự đoán và kế hoạch",
		"future plans",
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
		englishTopic: topic[2],
		time: `${base + index % 6} phút`,
		type,
		icon: topic[3],
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
	const englishTopic = lesson.englishTopic;
	return {
		transcript: advanced ? `Host: Today we are exploring ${englishTopic} and the way it influences everyday decisions. Speaker: In my experience, small choices can have a surprisingly significant effect. Although people may disagree about the best approach, listening carefully helps us understand the reasons behind each opinion. Host: What would you recommend? Speaker: I would begin with a practical goal, review the results, and then adapt the plan rather than expecting an immediate perfect solution.` : mid ? `Anna: Hi Ben. Our topic today is ${englishTopic}. What do you think? Ben: I think it is useful because it is part of everyday life. Anna: Can you give me an example? Ben: Yes. Yesterday I made a simple plan, asked two friends for advice, and then chose the best option. Anna: That sounds sensible. I will try the same idea next time.` : `Lucy: Hello, Tom! Today we are learning about ${englishTopic}. Tom: Great! I can see three things in the picture. Lucy: What is your favourite one? Tom: I like the blue one. It is small and friendly. Lucy: Let us listen, point, and say the words together.`,
		questions: [
			{
				q: "What is the main topic of the conversation?",
				options: [
					englishTopic,
					"a difficult examination",
					"a sports result"
				],
				answer: 0,
				explain: `Người nói giới thiệu ${englishTopic} là chủ đề chính.`
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
				explain: advanced ? "Người nói khuyên nên đặt mục tiêu, xem lại kết quả rồi điều chỉnh dần." : "Tom nói rằng bạn ấy nhìn thấy ba đồ vật."
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
				explain: mid ? "Ben nói rằng bạn ấy đã hỏi ý kiến hai người bạn." : advanced ? "Nghe kỹ giúp hiểu lý do phía sau các ý kiến khác nhau." : "Tom nói rằng bạn ấy thích đồ vật màu xanh."
			}
		],
		prompt: advanced ? `Give a 60-90 second response about ${englishTopic}. State your view, give an example, acknowledge another perspective and conclude.` : mid ? `Talk for 45 seconds about ${englishTopic}. Give your opinion and two supporting details.` : `Look at the picture and say 4-6 simple sentences about ${englishTopic}.`,
		target: advanced ? "Độ trôi chảy · độ đa dạng từ vựng · liên kết ý · phát âm" : mid ? "Ý rõ ràng · từ nối · phát âm" : "Từ khóa đúng · câu hoàn chỉnh · âm rõ"
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
	const [practiceTestId, setPracticeTestId] = (0, import_react.useState)("starters-practice-1");
	const [recordingUrl, setRecordingUrl] = (0, import_react.useState)(null);
	const [recognisedText, setRecognisedText] = (0, import_react.useState)("");
	const [pronunciationScore, setPronunciationScore] = (0, import_react.useState)(null);
	const recorderRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const current = levels.find((l) => l.id === selected) ?? levels[0];
	const currentExam = cambridgeExamFormats.find((exam) => exam.id === examLevelId) ?? cambridgeExamFormats[0];
	const practiceTests = cambridgePracticeBank.filter((test) => test.levelId === examLevelId);
	const activePracticeTest = practiceTests.find((test) => test.id === practiceTestId) ?? practiceTests[0];
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected === "pre-a1" ? "Tham quan sở thú" : current.name + " - luyện tập" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "2. Nghe detail" }),
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
							children: "Bổ sung khung đề Nghe, Đọc, Viết, Nói và gói luyện tập theo từng cấp độ."
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
						onClick: () => {
							setExamLevelId(exam.id);
							setPracticeTestId(cambridgePracticeBank.find((test) => test.levelId === exam.id)?.id ?? practiceTestId);
						},
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
				}),
				activePracticeTest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "test-bank",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "test-bank-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kicker",
								children: "NGÂN HÀNG 36 ĐỀ LUYỆN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: activePracticeTest.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								activePracticeTest.level,
								" ",
								activePracticeTest.exam,
								" · Chủ đề: ",
								activePracticeTest.theme
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: activePracticeTest.id,
							onChange: (e) => setPracticeTestId(e.target.value),
							"aria-label": "Chọn đề luyện tập",
							children: practiceTests.map((test) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: test.id,
								children: [
									test.title,
									" · ",
									test.theme
								]
							}, test.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "test-paper-list",
						children: activePracticeTest.papers.map((paper) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "test-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: paper.paper }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: paper.time })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "test-items",
								children: paper.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.part.replace("Part", "Phần") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.taskType })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.instruction }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Câu mẫu:" }),
											" ",
											item.sampleQuestion
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Đáp án/gợi ý:" }),
											" ",
											item.answerKey
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Trọng tâm:" }),
											" ",
											item.skillFocus
										] })
									] })
								] }, `${paper.paper}-${item.part}`))
							})]
						}, paper.paper))
					})]
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
