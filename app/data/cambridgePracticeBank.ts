export type CambridgePracticeItem = {
  part: string;
  taskType: string;
  instruction: string;
  sampleQuestion: string;
  answerKey: string;
  skillFocus: string;
};

export type CambridgePracticePaper = {
  paper: string;
  time: string;
  items: CambridgePracticeItem[];
};

export type CambridgePracticeTest = {
  id: string;
  title: string;
  levelId: string;
  level: string;
  exam: string;
  theme: string;
  papers: CambridgePracticePaper[];
};

const youngThemes = ["Một ngày ở trường", "Tham quan sở thú", "Cuối tuần cùng gia đình", "Đồ ăn và bữa tiệc", "Kỳ nghỉ ngày mưa", "Ngày hội thể thao"];
const teenThemes = ["Câu lạc bộ mới", "Kế hoạch du lịch", "Thói quen lành mạnh", "Công nghệ ở trường", "Lựa chọn khi mua sắm", "Cuối tuần trong thành phố"];
const advancedThemes = ["Học tập trong tương lai", "Dự án cộng đồng", "Thói quen truyền thông", "Học tập và công việc", "Lựa chọn vì môi trường", "Văn hóa và bản sắc"];

function item(part: string, taskType: string, instruction: string, sampleQuestion: string, answerKey: string, skillFocus: string): CambridgePracticeItem {
  return { part, taskType, instruction, sampleQuestion, answerKey, skillFocus };
}

function startersTest(index: number): CambridgePracticeTest {
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
          item("Part 4", "Nghe và tô màu", "Tô màu hoặc vẽ đồ vật đơn giản theo hướng dẫn.", "Colour the small kite next to the tree.", "small kite = green", "giới từ, màu sắc"),
        ],
      },
      {
        paper: "Đọc và Viết",
        time: "20 phút",
        items: [
          item("Part 1", "Đúng/sai với từ vựng", "Đọc từ đơn giản và xác định có khớp với tranh hay không.", "This is a banana.", "yes", "nhận diện từ"),
          item("Part 2", "Câu đúng/sai theo tranh", "Đọc câu về tranh và viết yes hoặc no.", "The cat is under the chair.", "yes", "giới từ"),
          item("Part 3", "Đánh vần từ", "Sắp xếp chữ cái để viết một từ quen thuộc.", "o / d / g", "dog", "đánh vần"),
          item("Part 4", "Chọn từ", "Hoàn thành đoạn văn ngắn bằng từ cho sẵn.", "I can see a ___ in the garden.", "bird", "danh từ đơn giản"),
          item("Part 5", "Câu hỏi theo tranh", "Trả lời câu hỏi theo tranh bằng một từ.", "What colour is the ball?", "red", "trả lời ngắn"),
        ],
      },
      {
        paper: "Nói",
        time: "3-5 phút",
        items: [
          item("Part 1", "Tìm đồ vật", "Chỉ vào đồ vật trong tranh lớn.", "Where is the pencil?", "on the desk", "nghe và chỉ tranh"),
          item("Part 2", "Câu hỏi theo tranh", "Trả lời câu hỏi đơn giản về tranh.", "What is the boy doing?", "reading", "thì hiện tại tiếp diễn"),
          item("Part 3", "Thẻ đồ vật", "Gọi tên đồ vật quen thuộc.", "What is this?", "a bike", "gợi nhớ từ vựng"),
          item("Part 4", "Câu hỏi cá nhân", "Trả lời câu hỏi đơn giản về bản thân.", "What do you like eating?", "I like rice.", "trả lời cá nhân"),
        ],
      },
    ],
  };
}

function moversTest(index: number): CambridgePracticeTest {
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
          item("Part 5", "Tô màu và viết", "Làm theo hướng dẫn để tô màu và viết một từ.", "Write 'sun' next to the big cloud.", "sun", "từ vựng thời tiết"),
        ],
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
          item("Part 6", "Viết câu", "Viết câu miêu tả tranh.", "Write one sentence about the children.", "The children are playing tennis.", "viết câu"),
        ],
      },
      {
        paper: "Nói",
        time: "5-7 phút",
        items: [
          item("Part 1", "Tìm điểm khác nhau", "Nói điểm khác nhau giữa hai bức tranh.", "In picture A the door is open. In picture B it is closed.", "so sánh"),
          item("Part 2", "Kể chuyện theo tranh", "Kể một câu chuyện ngắn theo tranh.", "First, the children are making a cake.", "sắp xếp trình tự"),
          item("Part 3", "Chọn tranh khác nhóm", "Giải thích tranh nào khác nhóm.", "The bike is different because it has wheels.", "nêu lý do"),
          item("Part 4", "Câu hỏi cá nhân", "Trả lời câu hỏi về trường học, sở thích và gia đình.", "What games do you play with friends?", "I play badminton.", "độ trôi chảy khi nói về bản thân"),
        ],
      },
    ],
  };
}

function flyersTest(index: number): CambridgePracticeTest {
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
          item("Part 5", "Tô màu và viết", "Làm theo hướng dẫn để tô màu, vẽ và viết.", "Write 'winner' below the table.", "winner", "hướng dẫn"),
        ],
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
          item("Part 7", "Viết theo gợi ý", "Viết câu chuyện ngắn theo tranh.", "A surprising day at school.", "học viên tự trả lời", "viết truyện"),
        ],
      },
      {
        paper: "Nói",
        time: "7-9 phút",
        items: [
          item("Part 1", "Tìm điểm khác nhau", "So sánh chi tiết hai bức tranh.", "In one picture the woman is buying flowers, but in the other she is buying fruit.", "so sánh"),
          item("Part 2", "Trao đổi thông tin", "Hỏi và trả lời bằng thẻ gợi ý.", "What time does the club start?", "It starts at 4:15.", "mẫu câu hỏi"),
          item("Part 3", "Kể chuyện theo tranh", "Kể chuyện theo chuỗi tranh.", "The children planned a picnic, but the weather changed.", "kể chuyện"),
          item("Part 4", "Câu hỏi cá nhân", "Trả lời câu hỏi kèm lý do và ví dụ.", "Do you prefer learning alone or with friends?", "I prefer learning with friends because...", "trả lời mở rộng"),
        ],
      },
    ],
  };
}

function a2KeyTest(index: number): CambridgePracticeTest {
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
          item("Part 7", "Viết truyện hoặc bài ngắn", "Viết đoạn ngắn theo gợi ý.", "Write a story beginning: It was my first day at the club.", "học viên tự trả lời", "viết đoạn ngắn"),
        ],
      },
      {
        paper: "Nghe",
        time: "khoảng 30 phút",
        items: [
          item("Part 1", "Chọn tranh trắc nghiệm", "Nghe và chọn tranh đúng.", "What will they buy for lunch?", "salad", "tình huống hằng ngày"),
          item("Part 2", "Nối thông tin", "Nối người với hoạt động hoặc ý kiến.", "What does each student want to improve?", "pronunciation", "ý chính và chi tiết"),
          item("Part 3", "Trắc nghiệm", "Nghe hội thoại dài hơn và trả lời câu hỏi.", "Where will the class meet?", "outside the library", "chi tiết cụ thể"),
          item("Part 4", "Trắc nghiệm", "Nghe năm đoạn ngắn.", "Why is the speaker calling?", "to change a time", "mục đích giao tiếp"),
          item("Part 5", "Điền thông tin còn thiếu", "Hoàn thành ghi chú bằng thông tin còn thiếu.", "The teacher's room number is ___.", "204", "số và tên riêng"),
        ],
      },
      {
        paper: "Nói",
        time: "8-10 phút",
        items: [
          item("Part 1", "Phỏng vấn", "Trả lời câu hỏi cá nhân.", "Tell me about a place you like visiting.", "học viên tự trả lời", "thông tin cá nhân"),
          item("Part 2", "Trao đổi theo cặp", "Trao đổi lựa chọn với bạn thi.", "Choose the best activity for a school open day.", "học viên tự trả lời", "tương tác"),
        ],
      },
    ],
  };
}

function b1Test(index: number): CambridgePracticeTest {
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
          item("Part 6", "Điền từ mở", "Viết một từ vào mỗi chỗ trống.", "The project was more successful ___ expected.", "than", "kiểm soát ngữ pháp"),
        ],
      },
      {
        paper: "Viết",
        time: "45 phút",
        items: [
          item("Part 1", "Viết email", "Viết email phản hồi các ghi chú.", "Write to Alex about a school club, saying when it meets and why it is useful.", "học viên tự trả lời", "đạt mục tiêu giao tiếp"),
          item("Part 2", "Viết bài báo hoặc câu chuyện", "Chọn một nhiệm vụ viết.", "Write an article: The best way to learn something new.", "học viên tự trả lời", "bố cục và ngôn ngữ"),
        ],
      },
      {
        paper: "Nghe",
        time: "khoảng 30 phút",
        items: [
          item("Part 1", "Trắc nghiệm", "Nghe bảy đoạn ghi âm ngắn.", "What is the speaker's problem?", "The bus was late.", "nhận diện tình huống"),
          item("Part 2", "Trắc nghiệm", "Nghe sáu đoạn độc thoại ngắn.", "What does each speaker like about the course?", "the practical tasks", "ý kiến/thái độ"),
          item("Part 3", "Điền thông tin còn thiếu", "Hoàn thành ghi chú từ bài nghe dài hơn.", "The workshop starts at ___.", "10:15", "chi tiết"),
          item("Part 4", "Trắc nghiệm", "Nghe phỏng vấn và trả lời câu hỏi.", "Why did the guest begin the project?", "to help younger students", "lý do và thái độ"),
        ],
      },
      {
        paper: "Nói",
        time: "10-12 phút",
        items: [
          item("Part 1", "Phỏng vấn", "Trả lời câu hỏi về chủ đề quen thuộc.", "What do you usually do after school?", "học viên tự trả lời", "độ trôi chảy"),
          item("Part 2", "Mô tả ảnh", "Mô tả một bức ảnh màu trong khoảng một phút.", "Describe students preparing for a community event.", "học viên tự trả lời", "mô tả"),
          item("Part 3", "Thảo luận theo nhiệm vụ", "Thảo luận các lựa chọn với bạn thi.", "Choose the best activity for a class project.", "học viên tự trả lời", "tương tác"),
          item("Part 4", "Thảo luận mở rộng", "Nêu ý kiến và lý do.", "Is it better to study online or in a classroom?", "học viên tự trả lời", "nói mở rộng"),
        ],
      },
    ],
  };
}

function b2Test(index: number): CambridgePracticeTest {
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
          item("Part 7", "Nối thông tin nhiều lựa chọn", "Nối gợi ý với phần phù hợp của bài đọc.", "Which person mentions changing their original plan?", "Speaker C", "đọc quét tìm thông tin"),
        ],
      },
      {
        paper: "Viết",
        time: "80 phút",
        items: [
          item("Part 1", "Viết luận", "Viết bài luận trả lời hai ý cho sẵn và thêm ý riêng.", "Some people think students should do more project work. Do you agree?", "học viên tự trả lời", "cấu trúc lập luận"),
          item("Part 2", "Viết bài/email/báo cáo/đánh giá", "Chọn một nhiệm vụ và viết đúng văn phong.", "Write a review of a learning app you have used.", "học viên tự trả lời", "kiểm soát thể loại bài viết"),
        ],
      },
      {
        paper: "Nghe",
        time: "khoảng 40 phút",
        items: [
          item("Part 1", "Trắc nghiệm đoạn nghe ngắn", "Nghe các đoạn ngắn và trả lời câu hỏi.", "What does the speaker feel about the new timetable?", "It is useful but demanding.", "thái độ"),
          item("Part 2", "Hoàn thành câu", "Hoàn thành câu từ một bài độc thoại.", "The speaker recommends keeping a ___ journal.", "learning", "chi tiết"),
          item("Part 3", "Nối thông tin nhiều lựa chọn", "Nối người nói với ý kiến phù hợp.", "Which speaker changed their mind after trying the activity?", "Speaker 4", "nối ý kiến/thái độ"),
          item("Part 4", "Trắc nghiệm bài phỏng vấn", "Nghe phỏng vấn và trả lời câu hỏi.", "What is the expert's main advice?", "Review progress regularly.", "ý chính"),
        ],
      },
      {
        paper: "Nói",
        time: "12-14 phút",
        items: [
          item("Part 1", "Phỏng vấn", "Trả lời câu hỏi về bản thân và chủ đề quen thuộc.", "How do you usually organise your study time?", "học viên tự trả lời", "phản hồi tự nhiên"),
          item("Part 2", "Nói cá nhân dài", "So sánh hai ảnh và trả lời câu hỏi tiếp theo.", "Compare photos showing two different ways of learning.", "học viên tự trả lời", "so sánh và suy đoán"),
          item("Part 3", "Trao đổi theo cặp", "Thảo luận nhiều lựa chọn và thống nhất quyết định.", "Talk about ways to make a school event successful.", "học viên tự trả lời", "lượt lời khi thảo luận"),
          item("Part 4", "Thảo luận", "Thảo luận các câu hỏi trừu tượng hơn.", "How important is creativity in education?", "học viên tự trả lời", "lập luận và độ đa dạng ngôn ngữ"),
        ],
      },
    ],
  };
}

export const cambridgePracticeBank: CambridgePracticeTest[] = [
  ...Array.from({ length: 6 }, (_, index) => startersTest(index)),
  ...Array.from({ length: 6 }, (_, index) => moversTest(index)),
  ...Array.from({ length: 6 }, (_, index) => flyersTest(index)),
  ...Array.from({ length: 6 }, (_, index) => a2KeyTest(index)),
  ...Array.from({ length: 6 }, (_, index) => b1Test(index)),
  ...Array.from({ length: 6 }, (_, index) => b2Test(index)),
];

