"use client";

import { useMemo, useRef, useState } from "react";

const fluencyStages = [
  { id: "beginner", label: "Beginner", vi: "Bắt đầu", level: "A0-Pre A1", icon: "A0", promise: "Chào hỏi, gọi tên, lựa chọn và trả lời thật ngắn.", goals: ["Chào hỏi", "Gọi tên", "Lựa chọn", "Trả lời ngắn"] },
  { id: "elementary", label: "Elementary", vi: "Sơ cấp", level: "A1", icon: "A1", promise: "Làm quen, hỏi câu đơn giản và kiểm tra lại xem đã hiểu chưa.", goals: ["Làm quen", "Hỏi đơn giản", "Kiểm tra hiểu", "Hội thoại ngắn"] },
  { id: "pre-intermediate", label: "Pre-Intermediate", vi: "Tiền trung cấp", level: "A2", icon: "A2", promise: "Thể hiện sự quan tâm, đưa gợi ý và nói về thói quen/công việc.", goals: ["Quan tâm", "Gợi ý", "Thói quen", "Công việc"] },
  { id: "intermediate", label: "Intermediate", vi: "Trung cấp", level: "B1", icon: "B1", promise: "Kể trải nghiệm, giải thích lý do và xử lý tình huống.", goals: ["Kể trải nghiệm", "Lý do", "Xử lý tình huống", "Hỏi tiếp"] },
  { id: "upper-intermediate", label: "Upper-Intermediate", vi: "Trên trung cấp", level: "B2", icon: "B2", promise: "Đưa lời khuyên, so sánh lựa chọn và bảo vệ quan điểm.", goals: ["Lời khuyên", "So sánh", "Quan điểm", "Bảo vệ ý"] },
  { id: "advanced", label: "Advanced", vi: "Nâng cao", level: "C1", icon: "C1", promise: "Trình bày ý, phản hồi linh hoạt và tóm tắt.", goals: ["Trình bày", "Phản hồi linh hoạt", "Tóm tắt", "Mạch lạc"] },
  { id: "proficient", label: "Proficient", vi: "Thông hiểu - thành thạo", level: "C2", icon: "C2", promise: "Diễn đạt sắc thái, điều chỉnh giọng điệu và thảo luận tự nhiên.", goals: ["Sắc thái", "Giọng điệu", "Tự nhiên", "Thành thạo"] },
] as const;

type FluencyStageId = (typeof fluencyStages)[number]["id"];

const roadmap = [
  { id: "beginner", level: "A0-Pre A1", title: "Beginner - Chào hỏi và trả lời ngắn", goal: "Chào hỏi, gọi tên người/vật, chọn giữa hai phương án và trả lời bằng câu rất ngắn.", daily: "1 bài/ngày: nghe 3 lần, nói theo 5 câu, ghi âm 1 lần.", output: "Tự chào hỏi, gọi tên chủ đề, chọn A/B và trả lời câu ngắn." },
  { id: "elementary", level: "A1", title: "Elementary - Làm quen và hỏi đơn giản", goal: "Làm quen, hỏi câu đơn giản về bản thân/đời sống và kiểm tra lại xem đã hiểu chưa.", daily: "1 bài/ngày: nghe hội thoại, đọc song ngữ, đổi 2 thông tin cá nhân.", output: "Tạo hội thoại 5 lượt có câu hỏi và câu kiểm tra hiểu." },
  { id: "pre-intermediate", level: "A2", title: "Pre-Intermediate - Quan tâm và gợi ý", goal: "Thể hiện sự quan tâm, đưa gợi ý, nói về thói quen, lịch học, việc nhà hoặc công việc.", daily: "1-2 bài/ngày: shadowing, nói lại, hỏi lại khi chưa rõ.", output: "Nói 45-60 giây có gợi ý, thói quen và lý do đơn giản." },
  { id: "intermediate", level: "B1", title: "Intermediate - Trải nghiệm và tình huống", goal: "Kể trải nghiệm, giải thích lý do và xử lý tình huống đời sống bằng hội thoại tự nhiên.", daily: "2 bài/ngày: một bài phản xạ, một bài ứng dụng đời sống.", output: "Nói 2 phút có diễn biến, lý do và cách xử lý." },
  { id: "upper-intermediate", level: "B2", title: "Upper-Intermediate - Lời khuyên và quan điểm", goal: "Đưa lời khuyên, so sánh lựa chọn và bảo vệ quan điểm bằng lý do rõ.", daily: "2 bài/ngày: nghe ý kiến, luyện nói mở rộng, tự tổng kết.", output: "Thảo luận 2-3 phút, biết phản hồi và bảo vệ ý kiến." },
  { id: "advanced", level: "C1", title: "Advanced - Trình bày và phản hồi", goal: "Trình bày ý, phản hồi linh hoạt, tóm tắt và nối ý mạch lạc.", daily: "2-3 bài/ngày: nói dài, ghi âm, tự sửa độ rõ và độ mạch lạc.", output: "Trình bày 3 phút có ví dụ, phản hồi và phần tóm tắt." },
  { id: "proficient", level: "C2", title: "Proficient - Sắc thái và tự nhiên", goal: "Diễn đạt sắc thái, điều chỉnh giọng điệu và thảo luận tự nhiên như ngôn ngữ thứ hai.", daily: "3 bài/ngày: phản xạ nhanh, thảo luận sâu, ứng dụng vào việc thật.", output: "Diễn đạt 3-4 phút tự nhiên, đúng sắc thái, biết điều chỉnh giọng điệu." },
] as const;

const studyCycle = [
  "Nghe không nhìn chữ để bắt ý chính.",
  "Mở song ngữ để hiểu nghĩa và cách dùng câu.",
  "Shadowing từng câu, chú ý nhịp và âm cuối.",
  "Đổi thông tin thành câu của mình.",
  "Ghi âm, nghe lại, rồi trả lời câu hỏi.",
] as const;

const levelUpChecks = [
  "Hoàn thành ít nhất 40 bài ở cấp hiện tại.",
  "Nghe lại hội thoại và hiểu được ý chính không cần nhìn dịch.",
  "Nói được bài phản xạ đúng độ dài yêu cầu của cấp.",
  "Tự tạo được câu mới, không chỉ đọc lại câu mẫu.",
] as const;

const levelBands = [
  { stageId: "beginner", level: "A0-Pre A1", turns: 4, speak: "Nói 4-5 câu ngắn, rõ âm và đúng nhịp.", function: "greeting, naming, choosing, answering yes/no", viFunction: "chào hỏi, gọi tên, lựa chọn, trả lời có/không" },
  { stageId: "elementary", level: "A1", turns: 5, speak: "Tạo hội thoại 5 lượt, có chào hỏi và trả lời ngắn.", function: "meeting people, asking simple questions, checking understanding", viFunction: "làm quen, hỏi câu đơn giản, kiểm tra lại xem đã hiểu chưa" },
  { stageId: "pre-intermediate", level: "A2", turns: 6, speak: "Đóng vai 6 lượt, thêm lý do hoặc thời gian.", function: "showing interest, making suggestions, talking about routines and jobs", viFunction: "thể hiện sự quan tâm, đưa ra gợi ý, nói về thói quen và công việc" },
  { stageId: "intermediate", level: "B1", turns: 7, speak: "Duy trì hội thoại 2 phút, hỏi lại và giải thích rõ.", function: "describing experiences, explaining reasons, handling everyday problems", viFunction: "kể trải nghiệm, giải thích lý do, xử lý vấn đề đời sống" },
  { stageId: "upper-intermediate", level: "B2", turns: 8, speak: "Thảo luận 2-3 phút, so sánh hai lựa chọn và nêu quan điểm.", function: "giving advice, comparing options, supporting an opinion", viFunction: "đưa lời khuyên, so sánh lựa chọn, bảo vệ quan điểm" },
  { stageId: "advanced", level: "C1", turns: 9, speak: "Trình bày linh hoạt 3 phút, có ví dụ, phản hồi và kết luận.", function: "presenting ideas, responding flexibly, summarising and negotiating meaning", viFunction: "trình bày ý, phản hồi linh hoạt, tóm tắt và làm rõ nghĩa" },
  { stageId: "proficient", level: "C2", turns: 10, speak: "Diễn đạt tự nhiên 3-4 phút, có sắc thái, phản hồi và tổng kết.", function: "expressing nuance, adapting tone, sustaining natural discussion", viFunction: "diễn đạt sắc thái, điều chỉnh giọng điệu, duy trì thảo luận tự nhiên" },
] as const;

const sourceGuides = [
  "CEFR: dùng mô tả năng lực A1-C2 để tăng dần độ dài, độ tự nhiên và mức độc lập khi nói.",
  "British Council LearnEnglish Speaking: dùng nhóm chức năng như meeting people, checking understanding, making suggestions, showing interest, talking about work và giving advice.",
  "Cambridge English: dùng định hướng CEFR để giữ lộ trình từ basic user đến proficient user.",
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
  const band = levelBands[bandIndex];
  const stageScripts: Record<FluencyStageId, Record<(typeof lessonVariants)[number]["id"], [string, string][]>> = {
    beginner: {
      core: [
        [`A: Hello. My name is Anna.`, `A: Xin chào. Tên tôi là Anna.`],
        [`B: Hello, Anna. What is this topic?`, `B: Xin chào Anna. Đây là chủ đề gì?`],
        [`A: It is ${phraseEn}.`, `A: Đó là ${phraseVi}.`],
        [`B: Good. Say it again, please.`, `B: Tốt. Hãy nói lại lần nữa.`],
      ],
      reflex: [
        [`A: Hi. Is it ${phraseEn} or homework?`, `A: Chào. Đây là ${phraseVi} hay bài tập về nhà?`],
        [`B: It is ${phraseEn}.`, `B: Đây là ${phraseVi}.`],
        [`A: Do you like it?`, `A: Bạn có thích việc đó không?`],
        [`B: Yes, I do.`, `B: Có, tôi thích.`],
      ],
      "real-life": [
        [`A: Hello. I need ${phraseEn}.`, `A: Xin chào. Tôi cần ${phraseVi}.`],
        [`B: Okay. This one or that one?`, `B: Được. Cái này hay cái kia?`],
        [`A: This one, please.`, `A: Cái này, làm ơn.`],
        [`B: Sure. Here you are.`, `B: Chắc chắn rồi. Của bạn đây.`],
      ],
    },
    elementary: {
      core: [
        [`A: Hi, I'm Anna. What's your name?`, `A: Chào, tôi là Anna. Bạn tên là gì?`],
        [`B: I'm Ben. Nice to meet you.`, `B: Tôi là Ben. Rất vui được gặp bạn.`],
        [`A: Nice to meet you too. Do you know about ${phraseEn}?`, `A: Tôi cũng rất vui được gặp bạn. Bạn có biết về ${phraseVi} không?`],
        [`B: A little. Can you say it again?`, `B: Một chút. Bạn có thể nói lại không?`],
        [`A: Sure. I said ${phraseEn}.`, `A: Được. Tôi đã nói ${phraseVi}.`],
      ],
      reflex: [
        [`A: Can I ask you a question about ${phraseEn}?`, `A: Tôi có thể hỏi bạn một câu về ${phraseVi} không?`],
        [`B: Yes, go ahead.`, `B: Được, bạn hỏi đi.`],
        [`A: When do you usually do it?`, `A: Bạn thường làm việc đó khi nào?`],
        [`B: Usually in the morning. Did you understand?`, `B: Thường là vào buổi sáng. Bạn đã hiểu chưa?`],
        [`A: Yes. You usually do it in the morning.`, `A: Có. Bạn thường làm việc đó vào buổi sáng.`],
      ],
      "real-life": [
        [`A: I'm new here. Can you help me with ${phraseEn}?`, `A: Tôi mới ở đây. Bạn có thể giúp tôi về ${phraseVi} không?`],
        [`B: Of course. What do you need?`, `B: Tất nhiên. Bạn cần gì?`],
        [`A: I need one simple example.`, `A: Tôi cần một ví dụ đơn giản.`],
        [`B: For example, you can use it after class. Is that clear?`, `B: Ví dụ, bạn có thể dùng việc đó sau giờ học. Như vậy rõ chưa?`],
        [`A: Yes, that's clear. Thank you.`, `A: Có, rõ rồi. Cảm ơn bạn.`],
      ],
    },
    "pre-intermediate": {
      core: [
        [`A: How is your ${phraseEn} going this week?`, `A: Tuần này việc ${phraseVi} của bạn thế nào?`],
        [`B: It's going well, but I want to improve it.`, `B: Việc đó ổn, nhưng tôi muốn cải thiện.`],
        [`A: That's interesting. What do you usually do?`, `A: Thú vị đấy. Bạn thường làm gì?`],
        [`B: I usually practise after school or in the evening.`, `B: Tôi thường luyện sau giờ học hoặc vào buổi tối.`],
        [`A: Maybe you can make a small plan.`, `A: Có lẽ bạn có thể lập một kế hoạch nhỏ.`],
        [`B: Good idea. I can try it today.`, `B: Ý hay đấy. Tôi có thể thử hôm nay.`],
      ],
      reflex: [
        [`A: You mentioned ${phraseEn}. That sounds useful.`, `A: Bạn nhắc đến ${phraseVi}. Nghe có vẻ hữu ích.`],
        [`B: Yes, it helps me in my routine.`, `B: Đúng, nó giúp tôi trong thói quen hằng ngày.`],
        [`A: What do you do first?`, `A: Bạn làm gì trước tiên?`],
        [`B: First, I choose a simple task.`, `B: Trước tiên, tôi chọn một việc đơn giản.`],
        [`A: Why don't we practise together for ten minutes?`, `A: Sao chúng ta không luyện cùng nhau trong mười phút?`],
        [`B: Sure. That would make it easier.`, `B: Được. Như vậy sẽ dễ hơn.`],
      ],
      "real-life": [
        [`A: I have a busy day, but I still need time for ${phraseEn}.`, `A: Tôi có một ngày bận rộn, nhưng vẫn cần thời gian cho ${phraseVi}.`],
        [`B: What is your usual routine?`, `B: Thói quen thường ngày của bạn là gì?`],
        [`A: I finish school, do homework, and then practise a little.`, `A: Tôi học xong, làm bài tập rồi luyện một chút.`],
        [`B: That sounds reasonable. Do you want a suggestion?`, `B: Nghe hợp lý đấy. Bạn muốn một gợi ý không?`],
        [`A: Yes, please. I want to make it simple.`, `A: Có. Tôi muốn làm việc đó đơn giản.`],
        [`B: Try one short dialogue every day.`, `B: Hãy thử một đoạn hội thoại ngắn mỗi ngày.`],
      ],
    },
    intermediate: {
      core: [
        [`A: Yesterday I had an experience with ${phraseEn}.`, `A: Hôm qua tôi có một trải nghiệm với ${phraseVi}.`],
        [`B: What happened?`, `B: Chuyện gì đã xảy ra?`],
        [`A: I needed to explain what I wanted, but I paused a lot.`, `A: Tôi cần giải thích điều mình muốn, nhưng tôi ngập ngừng khá nhiều.`],
        [`B: Why was it difficult?`, `B: Vì sao việc đó khó?`],
        [`A: Because I knew the idea, but I didn't know the best words.`, `A: Vì tôi hiểu ý, nhưng không biết những từ phù hợp nhất.`],
        [`B: What did you do then?`, `B: Sau đó bạn đã làm gì?`],
        [`A: I used simpler words and checked if the listener understood.`, `A: Tôi dùng từ đơn giản hơn và kiểm tra xem người nghe đã hiểu chưa.`],
      ],
      reflex: [
        [`A: I had a small problem with ${phraseEn}.`, `A: Tôi gặp một vấn đề nhỏ với ${phraseVi}.`],
        [`B: Tell me what happened first.`, `B: Trước tiên hãy kể chuyện gì đã xảy ra.`],
        [`A: I was not sure what to say, so I asked for a moment.`, `A: Tôi không chắc nên nói gì, nên đã xin một chút thời gian.`],
        [`B: That was a good strategy. Why did it help?`, `B: Đó là một cách tốt. Vì sao nó hữu ích?`],
        [`A: It helped because I could organise my answer.`, `A: Nó hữu ích vì tôi có thể sắp xếp câu trả lời.`],
        [`B: What would you say next time?`, `B: Lần sau bạn sẽ nói gì?`],
        [`A: I would explain the situation, give a reason, and ask one follow-up question.`, `A: Tôi sẽ giải thích tình huống, đưa lý do và hỏi thêm một câu.`],
      ],
      "real-life": [
        [`A: We need to solve a situation about ${phraseEn}.`, `A: Chúng ta cần xử lý một tình huống về ${phraseVi}.`],
        [`B: What options do we have?`, `B: Chúng ta có những lựa chọn nào?`],
        [`A: We can do it now, ask for help, or make a short plan.`, `A: Chúng ta có thể làm ngay, nhờ giúp đỡ hoặc lập một kế hoạch ngắn.`],
        [`B: Which option is best?`, `B: Lựa chọn nào tốt nhất?`],
        [`A: I think making a short plan is best because it reduces mistakes.`, `A: Tôi nghĩ lập kế hoạch ngắn là tốt nhất vì nó giảm lỗi.`],
        [`B: That makes sense. What is the first step?`, `B: Hợp lý đấy. Bước đầu tiên là gì?`],
        [`A: The first step is to say the goal clearly.`, `A: Bước đầu tiên là nói rõ mục tiêu.`],
      ],
    },
    "upper-intermediate": {
      core: [
        [`A: I need advice about ${phraseEn}.`, `A: Tôi cần lời khuyên về ${phraseVi}.`],
        [`B: What are your two options?`, `B: Hai lựa chọn của bạn là gì?`],
        [`A: I can practise alone, or I can practise with a partner.`, `A: Tôi có thể luyện một mình hoặc luyện với bạn.`],
        [`B: Practising with a partner may be better because you get real responses.`, `B: Luyện với bạn có thể tốt hơn vì bạn nhận được phản hồi thật.`],
        [`A: I agree, but practising alone is easier to schedule.`, `A: Tôi đồng ý, nhưng luyện một mình dễ sắp xếp thời gian hơn.`],
        [`B: True. Which choice supports your main goal?`, `B: Đúng. Lựa chọn nào hỗ trợ mục tiêu chính của bạn?`],
        [`A: A partner supports speaking confidence, so I would choose that twice a week.`, `A: Luyện với bạn giúp tăng tự tin khi nói, nên tôi sẽ chọn cách đó hai lần một tuần.`],
        [`B: That's a balanced decision.`, `B: Đó là một quyết định cân bằng.`],
      ],
      reflex: [
        [`A: If someone asks me about ${phraseEn}, what advice can I give?`, `A: Nếu ai đó hỏi tôi về ${phraseVi}, tôi có thể đưa lời khuyên gì?`],
        [`B: Start with the listener's situation before giving advice.`, `B: Hãy bắt đầu từ tình huống của người nghe trước khi khuyên.`],
        [`A: So I can say, "If your goal is clear, choose the simpler option."`, `A: Vậy tôi có thể nói: "Nếu mục tiêu của bạn rõ, hãy chọn phương án đơn giản hơn."`],
        [`B: Good. Now compare the two options.`, `B: Tốt. Bây giờ hãy so sánh hai lựa chọn.`],
        [`A: The first option is faster, but the second option is more reliable.`, `A: Phương án đầu nhanh hơn, nhưng phương án thứ hai đáng tin cậy hơn.`],
        [`B: Which one do you support?`, `B: Bạn ủng hộ phương án nào?`],
        [`A: I support the second option because it works better in the long term.`, `A: Tôi ủng hộ phương án thứ hai vì nó hiệu quả hơn về lâu dài.`],
        [`B: Strong answer. Add one example next time.`, `B: Câu trả lời tốt. Lần sau hãy thêm một ví dụ.`],
      ],
      "real-life": [
        [`A: We must choose the best way to handle ${phraseEn}.`, `A: Chúng ta phải chọn cách tốt nhất để xử lý ${phraseVi}.`],
        [`B: Let's compare speed, effort, and result.`, `B: Hãy so sánh tốc độ, công sức và kết quả.`],
        [`A: The quick way saves time, but it may miss important details.`, `A: Cách nhanh tiết kiệm thời gian, nhưng có thể bỏ sót chi tiết quan trọng.`],
        [`B: The careful way takes longer, but it gives a better result.`, `B: Cách cẩn thận mất nhiều thời gian hơn, nhưng cho kết quả tốt hơn.`],
        [`A: My view is that quality matters more here.`, `A: Quan điểm của tôi là chất lượng quan trọng hơn trong tình huống này.`],
        [`B: How would you defend that view?`, `B: Bạn sẽ bảo vệ quan điểm đó như thế nào?`],
        [`A: If we explain clearly now, we avoid confusion later.`, `A: Nếu bây giờ chúng ta giải thích rõ, sau này sẽ tránh nhầm lẫn.`],
        [`B: I can accept that argument.`, `B: Tôi có thể chấp nhận lập luận đó.`],
      ],
    },
    advanced: {
      core: [
        [`A: I'd like to present an idea about ${phraseEn}.`, `A: Tôi muốn trình bày một ý về ${phraseVi}.`],
        [`B: Go ahead. Start with the main point.`, `B: Bạn nói đi. Hãy bắt đầu với ý chính.`],
        [`A: The main point is that small daily practice creates real progress.`, `A: Ý chính là luyện tập nhỏ mỗi ngày tạo ra tiến bộ thật.`],
        [`B: Can you support that with an example?`, `B: Bạn có thể củng cố ý đó bằng một ví dụ không?`],
        [`A: For example, a short dialogue can build vocabulary, pronunciation, and confidence.`, `A: Ví dụ, một đoạn hội thoại ngắn có thể xây dựng từ vựng, phát âm và sự tự tin.`],
        [`B: That's clear. How would you respond to a different view?`, `B: Rõ rồi. Bạn sẽ phản hồi một quan điểm khác như thế nào?`],
        [`A: I would acknowledge it, then explain why my approach still works.`, `A: Tôi sẽ ghi nhận quan điểm đó, rồi giải thích vì sao cách của tôi vẫn hiệu quả.`],
        [`B: Please summarise your point in one sentence.`, `B: Hãy tóm tắt ý của bạn trong một câu.`],
        [`A: Regular, focused speaking practice makes ${phraseEn} easier to use in real life.`, `A: Luyện nói đều đặn và có trọng tâm giúp dùng ${phraseVi} dễ hơn trong đời sống thật.`],
      ],
      reflex: [
        [`A: I need to respond flexibly in a discussion about ${phraseEn}.`, `A: Tôi cần phản hồi linh hoạt trong một cuộc thảo luận về ${phraseVi}.`],
        [`B: Then listen for the speaker's purpose first.`, `B: Vậy trước hết hãy nghe mục đích của người nói.`],
        [`A: If they want advice, I give a practical option.`, `A: Nếu họ muốn lời khuyên, tôi đưa ra một lựa chọn thực tế.`],
        [`B: And if they disagree?`, `B: Còn nếu họ không đồng ý thì sao?`],
        [`A: I can say, "I see your point, but I would add one thing."`, `A: Tôi có thể nói: "Tôi hiểu ý của bạn, nhưng tôi muốn bổ sung một điều."`],
        [`B: That keeps the tone respectful.`, `B: Cách đó giữ giọng điệu tôn trọng.`],
        [`A: Then I connect my answer to a real example.`, `A: Sau đó tôi liên hệ câu trả lời với một ví dụ thật.`],
        [`B: Finish by summarising both sides.`, `B: Hãy kết thúc bằng cách tóm tắt cả hai phía.`],
        [`A: So the answer is balanced, clear, and easy to follow.`, `A: Vì vậy câu trả lời cân bằng, rõ ràng và dễ theo dõi.`],
      ],
      "real-life": [
        [`A: In a real conversation, ${phraseEn} may require a clear structure.`, `A: Trong hội thoại thật, ${phraseVi} có thể cần một cấu trúc rõ ràng.`],
        [`B: What structure would you use?`, `B: Bạn sẽ dùng cấu trúc nào?`],
        [`A: I would state the issue, give context, explain my view, and summarise.`, `A: Tôi sẽ nêu vấn đề, đưa ngữ cảnh, giải thích quan điểm và tóm tắt.`],
        [`B: Can you make it sound natural?`, `B: Bạn có thể làm cho câu nói tự nhiên không?`],
        [`A: Yes. I would use linking phrases instead of separate sentences only.`, `A: Có. Tôi sẽ dùng cụm nối ý thay vì chỉ nói các câu rời rạc.`],
        [`B: Give one linking phrase.`, `B: Hãy đưa một cụm nối ý.`],
        [`A: "At the same time" helps me add a balanced point.`, `A: "At the same time" giúp tôi thêm một ý cân bằng.`],
        [`B: Good. Now close the conversation.`, `B: Tốt. Bây giờ hãy kết thúc cuộc hội thoại.`],
        [`A: Overall, clear structure makes my English easier to understand.`, `A: Nhìn chung, cấu trúc rõ giúp tiếng Anh của tôi dễ hiểu hơn.`],
      ],
    },
    proficient: {
      core: [
        [`A: I'd like to discuss ${phraseEn}, but with a careful tone.`, `A: Tôi muốn thảo luận về ${phraseVi}, nhưng với giọng điệu cẩn trọng.`],
        [`B: What tone fits the situation?`, `B: Giọng điệu nào phù hợp với tình huống?`],
        [`A: A friendly tone works for classmates, while a more formal tone works for teachers or colleagues.`, `A: Giọng thân thiện phù hợp với bạn học, còn giọng trang trọng hơn phù hợp với giáo viên hoặc đồng nghiệp.`],
        [`B: Can you express the same idea more softly?`, `B: Bạn có thể diễn đạt cùng ý đó nhẹ nhàng hơn không?`],
        [`A: I might say, "It could be helpful to consider another option."`, `A: Tôi có thể nói: "Có thể sẽ hữu ích nếu cân nhắc một lựa chọn khác."`],
        [`B: That sounds natural and polite.`, `B: Câu đó nghe tự nhiên và lịch sự.`],
        [`A: The nuance changes the listener's reaction.`, `A: Sắc thái làm thay đổi phản ứng của người nghe.`],
        [`B: Exactly. Keep the meaning clear, but adjust the style.`, `B: Chính xác. Hãy giữ nghĩa rõ, nhưng điều chỉnh cách diễn đạt.`],
        [`A: So fluency is not only speed; it is control.`, `A: Vậy sự thành thạo không chỉ là tốc độ; đó còn là khả năng kiểm soát ngôn ngữ.`],
        [`B: That's a mature summary.`, `B: Đó là một phần tóm tắt chín chắn.`],
      ],
      reflex: [
        [`A: In a natural discussion about ${phraseEn}, I need to adapt quickly.`, `A: Trong một cuộc thảo luận tự nhiên về ${phraseVi}, tôi cần điều chỉnh nhanh.`],
        [`B: What might change during the conversation?`, `B: Điều gì có thể thay đổi trong cuộc hội thoại?`],
        [`A: The listener's mood, the purpose, or the level of detail they need.`, `A: Tâm trạng của người nghe, mục đích nói chuyện hoặc mức độ chi tiết họ cần.`],
        [`B: How would you respond if they seem unsure?`, `B: Bạn sẽ phản hồi thế nào nếu họ có vẻ chưa chắc chắn?`],
        [`A: I would slow down, rephrase the key point, and check understanding.`, `A: Tôi sẽ nói chậm lại, diễn đạt lại ý chính và kiểm tra xem họ hiểu chưa.`],
        [`B: And if they want a deeper answer?`, `B: Còn nếu họ muốn câu trả lời sâu hơn?`],
        [`A: I would add context, a contrast, and a short example.`, `A: Tôi sẽ thêm ngữ cảnh, một điểm đối chiếu và một ví dụ ngắn.`],
        [`B: That shows flexible control.`, `B: Điều đó cho thấy khả năng kiểm soát linh hoạt.`],
        [`A: The goal is to sound clear, natural, and appropriate.`, `A: Mục tiêu là nói rõ ràng, tự nhiên và phù hợp.`],
        [`B: Yes. That is second-language confidence.`, `B: Đúng. Đó là sự tự tin khi dùng tiếng Anh như ngôn ngữ thứ hai.`],
      ],
      "real-life": [
        [`A: Let's have a natural discussion about ${phraseEn}.`, `A: Hãy thảo luận tự nhiên về ${phraseVi}.`],
        [`B: Sure. What angle do you want to take?`, `B: Được. Bạn muốn tiếp cận theo góc độ nào?`],
        [`A: I want to focus on how it affects daily choices and communication.`, `A: Tôi muốn tập trung vào việc nó ảnh hưởng đến lựa chọn hằng ngày và giao tiếp như thế nào.`],
        [`B: That's broad. Can you make it more specific?`, `B: Chủ đề đó khá rộng. Bạn có thể nói cụ thể hơn không?`],
        [`A: Specifically, it helps people explain needs, preferences, and small problems more smoothly.`, `A: Cụ thể, nó giúp mọi người giải thích nhu cầu, sở thích và vấn đề nhỏ trôi chảy hơn.`],
        [`B: I like that. How would you soften a strong opinion?`, `B: Tôi thích ý đó. Bạn sẽ làm mềm một quan điểm mạnh như thế nào?`],
        [`A: I would say, "From my perspective, this seems more practical, although other views are possible."`, `A: Tôi sẽ nói: "Theo góc nhìn của tôi, điều này có vẻ thực tế hơn, dù vẫn có thể có quan điểm khác."`],
        [`B: That sounds balanced.`, `B: Cách nói đó nghe cân bằng.`],
        [`A: In short, good speaking means choosing the right meaning and the right tone.`, `A: Tóm lại, nói tốt nghĩa là chọn đúng ý và đúng giọng điệu.`],
        [`B: Exactly. That is natural communication.`, `B: Chính xác. Đó là giao tiếp tự nhiên.`],
      ],
    },
  };
  const lines = stageScripts[band.stageId][variant.id];
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
      listenTask: `Nghe hội thoại về ${seed[3]} để xác định chủ đề, ví dụ, chức năng giao tiếp và phần ${variant.viFocus}.`,
      speakTask: `${band.speak} Trọng tâm: ${band.viFunction}. Chủ đề: ${seed[1]}. Bài ${variantIndex + 1}: ${variant.label}.`,
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

        {activeView === "roadmap" && <div className="level-rail app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH HỌC ĐƠN GIẢN - HIỆU QUẢ</span><h2>Đi từ Beginner đến thông hiểu - thành thạo</h2></div><p>Dữ liệu hiện dùng 60 chủ đề đời sống, 7 cấp năng lực và 3 biến thể luyện tập cho mỗi chủ đề.</p></div><div className="roadmap-stats"><span><b>1.260</b><small>bài nghe - nói</small></span><span><b>60</b><small>chủ đề đời sống</small></span><span><b>7</b><small>cấp năng lực</small></span><span><b>3</b><small>biến thể mỗi chủ đề</small></span></div><div className="lesson-grid">{roadmap.map((stage) => <article key={stage.id}><div className="lesson-visual"><span>{stage.level}</span></div><div className="lesson-body"><h3>{stage.title}</h3><p>{stage.goal}</p><div className="format">Học mỗi ngày: {stage.daily}</div><footer><span>Đầu ra</span><span>{stage.output}</span></footer></div></article>)}</div><div className="roadmap-support"><article><h3>Chu trình 1 bài học</h3><ol>{studyCycle.map((item) => <li key={item}>{item}</li>)}</ol></article><article><h3>Khi nào lên cấp?</h3><ol>{levelUpChecks.map((item) => <li key={item}>{item}</li>)}</ol></article><article className="source-guide"><h3>Nguồn chuẩn dùng để thiết kế lại</h3><ol>{sourceGuides.map((item) => <li key={item}>{item}</li>)}</ol></article></div></div>}

        {activeView === "programs" && <div className="tracks-section app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH THEO NĂNG LỰC</span><h2>Từ Beginner đến thông hiểu - thành thạo</h2></div><p>Chọn cấp độ hiện tại để lọc chủ đề, độ dài hội thoại và bài luyện nói phù hợp.</p></div><div className="track-grid">{fluencyStages.map((item) => <article key={item.id} className={stage === item.id ? "selected-card" : ""} onClick={() => setStage(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{`${item.vi} · ${item.level}`}</small><p>{item.promise}</p><ul>{item.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul><button className="button secondary" onClick={(event) => { event.stopPropagation(); setStage(item.id); openView("topics"); }}>Xem chủ đề</button></article>)}</div></div>}

        {activeView === "method" && <div className="method app-panel"><span className="kicker">CÔNG THỨC PHẢN XẠ</span><h2>Nghe trước, luyện nói song ngữ, rồi mới trả lời câu hỏi</h2><p className="section-sub">Cấu trúc mỗi bài: bài nghe song ngữ, bài luyện nói song ngữ, ghi âm, sau đó mới đến câu hỏi kiểm tra.</p><div className="method-grid"><article><span>1</span><b>Nghe không nhìn chữ</b><p>Bắt bối cảnh, người nói, ý chính.</p></article><article><span>2</span><b>Mở song ngữ</b><p>Đọc câu tiếng Anh kèm dịch Việt.</p></article><article><span>3</span><b>Luyện nói song ngữ</b><p>Nói câu mẫu, hiểu nghĩa, rồi đổi thành câu của mình.</p></article><article><span>4</span><b>Câu hỏi sau cùng</b><p>Trả lời để kiểm tra nghe hiểu và khả năng dùng câu.</p></article></div></div>}

        {activeView === "topics" && <div className="lesson-section app-panel"><div className="section-heading"><div><span className="kicker">CHỦ ĐỀ SONG NGỮ</span><h2>{selectedStage.label}: bài nghe - nói theo đời sống</h2><p className="catalog-summary">Mỗi chủ đề đều có bài luyện nói song ngữ trước phần câu hỏi.</p></div><div className="filters">{fluencyStages.map((item) => <button key={item.id} className={stage === item.id ? "active" : ""} onClick={() => setStage(item.id)}>{item.label}</button>)}</div></div><div className="catalog-tools"><label className="search-box">Tìm <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="chủ đề, bản dịch, cấp độ..." /></label><span><b>{filteredTopics.length}</b> chủ đề phù hợp</span></div><div className="lesson-grid">{filteredTopics.map((topic) => <article key={topic.id} onClick={() => setOpenTopic(topic)}><div className="lesson-visual"><span>{topic.level}</span><button aria-label={`Mở ${topic.vi}`}>▶</button><i>{selectedStage.label}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{topic.en}</span></div><h3>{topic.vi}</h3><p>{topic.listenTask}</p><div className="format">Luyện nói: {topic.speakTask}</div><footer><span>{topic.variant}</span><span>12-18 phút</span></footer></div></article>)}</div></div>}
      </section>

      {openTopic && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={() => setOpenTopic(null)}/><div className="lesson-panel"><button className="close" onClick={() => setOpenTopic(null)}>×</button><header><span className="lesson-icon">{openTopic.level}</span><div><span className="pill blue">{openTopic.en}</span><h2>{openTopic.vi}</h2><p>Dạng bài: {openTopic.variant}. Thứ tự: nghe song ngữ → luyện nói song ngữ → ghi âm → câu hỏi.</p></div></header><section className="listen-block"><h3>1. Bài nghe song ngữ</h3><div className="audio-player"><button onClick={() => playTopic(openTopic)}>{playing ? "Ⅱ" : "▶"}</button><Wave active={playing}/><span>Nghe tiếng Anh bằng giọng đọc trình duyệt</span></div><button className="transcript-toggle" onClick={() => setShowVietnamese(!showVietnamese)}>{showVietnamese ? "Ẩn dịch tiếng Việt" : "Hiện dịch tiếng Việt"}</button><div className="transcript bilingual-lines">{openTopic.lines.map(([en, vi]) => <p key={en}><b>{en}</b>{showVietnamese && <span>{vi}</span>}</p>)}</div></section><section><h3>2. Bài luyện nói song ngữ</h3><div className="speaking-drill-list">{speakingDrills(openTopic).map((drill) => <article key={drill.en}><b>{drill.en}</b><span>{drill.vi}</span><small>{drill.action}</small></article>)}</div><p><b>Nhiệm vụ nói:</b> {openTopic.speakTask}</p></section><section className="speaking-practice"><h3>3. Ghi âm luyện nói</h3><p>Nói lại câu mẫu, sau đó đổi thông tin thành câu của bạn: người, nơi chốn, lý do, thời gian.</p><button className={`record-button ${recording ? "active" : ""}`} onClick={recordSpeech}><b>{recording ? "Dừng và lưu bản ghi" : "Bắt đầu nói"}</b><small>{recording ? "Đang ghi âm" : "Cho phép micro để luyện nói"}</small></button>{recordingUrl && <div className="recording-result"><audio controls src={recordingUrl}/></div>}</section><section><h3>4. Câu hỏi sau luyện nói</h3><div className="question-list">{topicQuestions(openTopic).map((item) => <article key={item.q}><b>{item.q}</b><span>{item.vi}</span><small>Gợi ý: {item.answer}</small></article>)}</div></section></div></div>}
      <footer className="footer"><div className="brand"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></div><p>Chương trình luyện nghe - nói phản xạ, hướng tới dùng tiếng Anh như ngôn ngữ thứ hai.</p><span>Nội dung tự biên soạn, có dịch tiếng Việt để hỗ trợ hiểu và luyện nói.</span></footer>
    </main>
  );
}
