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

function makeLines(seed: (typeof topicSeeds)[number], bandIndex: number, stageLabel: string, variant: (typeof lessonVariants)[number], seedIndex: number) {
  const [titleEn, titleVi, phraseEn, phraseVi] = seed;
  const band = levelBands[bandIndex];
  const places = [
    ["at the kitchen table", "ở bàn ăn trong bếp"],
    ["before class starts", "trước khi lớp học bắt đầu"],
    ["near the school gate", "gần cổng trường"],
    ["in a small group", "trong một nhóm nhỏ"],
    ["on a video call", "trong một cuộc gọi video"],
    ["at the front desk", "ở quầy hỗ trợ"],
    ["on the bus", "trên xe buýt"],
    ["after a club meeting", "sau buổi sinh hoạt câu lạc bộ"],
  ] as const;
  const goals = [
    ["choose the next step", "chọn bước tiếp theo"],
    ["make the plan clearer", "làm kế hoạch rõ hơn"],
    ["ask for the right help", "nhờ đúng sự giúp đỡ"],
    ["avoid a small misunderstanding", "tránh một hiểu nhầm nhỏ"],
    ["finish the task on time", "hoàn thành việc đúng giờ"],
    ["explain the idea politely", "giải thích ý một cách lịch sự"],
  ] as const;
  const options = [
    ["do it now", "làm ngay"],
    ["wait ten minutes", "đợi mười phút"],
    ["ask a classmate", "hỏi một bạn cùng lớp"],
    ["write a short note", "viết một ghi chú ngắn"],
    ["check the instructions", "kiểm tra hướng dẫn"],
    ["make a simple list", "lập một danh sách đơn giản"],
  ] as const;
  const details = [
    ["because we have five minutes", "vì chúng ta có năm phút"],
    ["because the instructions are not clear yet", "vì hướng dẫn vẫn chưa rõ"],
    ["because everyone needs the same information", "vì mọi người cần cùng một thông tin"],
    ["because it will save time later", "vì việc đó sẽ tiết kiệm thời gian sau này"],
    ["because the first plan is too rushed", "vì kế hoạch đầu hơi vội"],
    ["because the listener may need an example", "vì người nghe có thể cần một ví dụ"],
  ] as const;
  const variantOffset = variant.id === "core" ? 0 : variant.id === "reflex" ? 2 : 4;
  const place = places[seedIndex % places.length];
  const goal = goals[(seedIndex + bandIndex) % goals.length];
  const firstOption = options[(seedIndex + 1 + variantOffset) % options.length];
  const secondOption = options[(seedIndex + 3 + variantOffset) % options.length];
  const reason = details[(seedIndex + bandIndex + variantOffset) % details.length];
  const mode = variant.id === "core"
    ? {
      beginner: ["Say the topic one more time.", "Hãy nói lại chủ đề một lần nữa."],
      check: ["Let's name the situation first.", "Trước tiên hãy gọi tên tình huống."],
      task: ["focus on the basic situation", "tập trung vào tình huống cơ bản"],
    }
    : variant.id === "reflex"
      ? {
        beginner: ["Answer quickly: yes or no?", "Hãy trả lời nhanh: có hay không?"],
        check: ["Now ask one short follow-up question.", "Bây giờ hãy hỏi thêm một câu ngắn."],
        task: ["answer, ask again, and change one detail", "trả lời, hỏi lại và đổi một chi tiết"],
      }
      : {
        beginner: ["Choose one and use it now.", "Hãy chọn một phương án và dùng ngay."],
        check: ["Let's use this in a real situation.", "Hãy dùng việc này trong một tình huống thật."],
        task: ["connect the topic to a real plan", "liên hệ chủ đề với một kế hoạch thật"],
      };
  const sharedOpening: [string, string] = variant.id === "core"
    ? [`A: Let's talk about ${phraseEn} ${place[0]}.`, `A: Hãy nói về ${phraseVi} ${place[1]}.`]
    : variant.id === "reflex"
      ? [`A: You said "${phraseEn}". What should I say next?`, `A: Bạn vừa nói "${phraseVi}". Tiếp theo tôi nên nói gì?`]
      : [`A: We have a real situation about ${phraseEn} ${place[0]}.`, `A: Chúng ta có một tình huống thật về ${phraseVi} ${place[1]}.`];
  const stageScripts: Record<FluencyStageId, [string, string][]> = {
    beginner: [
      [`A: Hello, Ben.`, `A: Xin chào Ben.`],
      [`B: Hello, Anna. What is it?`, `B: Xin chào Anna. Đó là gì?`],
      [`A: It is ${phraseEn}.`, `A: Đó là ${phraseVi}.`],
      [`B: Good. ${mode.beginner[0]}`, `B: Tốt. ${mode.beginner[1]}`],
    ],
    elementary: [
      [`A: Hi, I'm Anna. I'm talking about ${phraseEn}.`, `A: Chào, tôi là Anna. Tôi đang nói về ${phraseVi}.`],
      [`B: Nice to meet you, Anna. Where are you now?`, `B: Rất vui được gặp bạn, Anna. Bây giờ bạn đang ở đâu?`],
      [`A: I am ${place[0]}. I need to ${goal[0]}.`, `A: Tôi đang ${place[1]}. Tôi cần ${goal[1]}.`],
      [`B: Do you mean ${firstOption[0]}? ${mode.check[0]}`, `B: Ý bạn là ${firstOption[1]} phải không? ${mode.check[1]}`],
      [`A: Yes, that's right. Thanks for checking.`, `A: Đúng rồi. Cảm ơn bạn đã kiểm tra lại.`],
    ],
    "pre-intermediate": [
      [sharedOpening[0], sharedOpening[1]],
      [`B: That sounds useful. What do you usually do first?`, `B: Nghe có vẻ hữu ích. Bạn thường làm gì trước tiên?`],
      [`A: I usually ${firstOption[0]} so I can ${goal[0]} and ${mode.task[0]}.`, `A: Tôi thường ${firstOption[1]} để có thể ${goal[1]} và ${mode.task[1]}.`],
      [`B: Why don't we ${secondOption[0]} as well?`, `B: Sao chúng ta không ${secondOption[1]} nữa?`],
      [`A: Good suggestion. It helps ${reason[0]}.`, `A: Gợi ý hay. Việc đó giúp ${reason[1]}.`],
      [`B: Great. Let's try that routine today.`, `B: Tuyệt. Hôm nay hãy thử thói quen đó.`],
    ],
    intermediate: [
      [`A: Yesterday, ${titleEn.toLowerCase()} became a real problem ${place[0]}.`, `A: Hôm qua, ${titleVi.toLowerCase()} trở thành một vấn đề thật ${place[1]}.`],
      [`B: What happened exactly?`, `B: Chính xác thì chuyện gì đã xảy ra?`],
      [`A: I wanted to ${goal[0]}, but I did not explain the situation clearly.`, `A: Tôi muốn ${goal[1]}, nhưng tôi chưa giải thích tình huống rõ ràng.`],
      [`B: Why was it confusing?`, `B: Vì sao việc đó gây khó hiểu?`],
      [`A: It was confusing ${reason[0]}.`, `A: Việc đó gây khó hiểu ${reason[1]}.`],
      [`B: How did you handle it?`, `B: Bạn đã xử lý như thế nào?`],
      [`A: I chose to ${secondOption[0]}, then I tried to ${mode.task[0]}.`, `A: Tôi chọn ${secondOption[1]}, rồi cố gắng ${mode.task[1]}.`],
    ],
    "upper-intermediate": [
      [`A: I need advice about ${phraseEn} ${place[0]}.`, `A: Tôi cần lời khuyên về ${phraseVi} ${place[1]}.`],
      [`B: What are the two realistic choices?`, `B: Hai lựa chọn thực tế là gì?`],
      [`A: We can ${firstOption[0]}, or we can ${secondOption[0]}.`, `A: Chúng ta có thể ${firstOption[1]}, hoặc có thể ${secondOption[1]}.`],
      [`B: The first choice is faster, but the second choice may be clearer.`, `B: Lựa chọn đầu nhanh hơn, nhưng lựa chọn thứ hai có thể rõ hơn.`],
      [`A: I agree. For this situation, clarity matters ${reason[0]}.`, `A: Tôi đồng ý. Trong tình huống này, sự rõ ràng quan trọng ${reason[1]}.`],
      [`B: So which choice would you defend?`, `B: Vậy bạn sẽ bảo vệ lựa chọn nào?`],
      [`A: I would defend "${secondOption[0]}" because it supports the goal and helps me ${mode.task[0]}.`, `A: Tôi sẽ bảo vệ lựa chọn "${secondOption[1]}" vì nó hỗ trợ mục tiêu và giúp tôi ${mode.task[1]}.`],
      [`B: That is a clear and practical argument.`, `B: Đó là một lập luận rõ ràng và thực tế.`],
    ],
    advanced: [
      [`A: I'd like to present a short view on ${phraseEn}.`, `A: Tôi muốn trình bày một quan điểm ngắn về ${phraseVi}.`],
      [`B: Start with the situation, then give your main idea.`, `B: Hãy bắt đầu bằng tình huống, rồi đưa ra ý chính.`],
      [`A: The situation is ${place[0]}, and the main goal is to ${goal[0]}.`, `A: Tình huống là ${place[1]}, và mục tiêu chính là ${goal[1]}.`],
      [`B: What makes this topic worth discussing?`, `B: Điều gì làm chủ đề này đáng thảo luận?`],
      [`A: It matters ${reason[0]}, especially when people need clear information.`, `A: Nó quan trọng ${reason[1]}, đặc biệt khi mọi người cần thông tin rõ ràng.`],
      [`B: How would you respond to someone who prefers to ${firstOption[0]}?`, `B: Bạn sẽ phản hồi thế nào với người thích ${firstOption[1]}?`],
      [`A: I would say that choice can work, but ${secondOption[0]} may create a better result.`, `A: Tôi sẽ nói lựa chọn đó có thể hiệu quả, nhưng ${secondOption[1]} có thể tạo kết quả tốt hơn.`],
      [`B: Please summarise your view.`, `B: Hãy tóm tắt quan điểm của bạn.`],
      [`A: In short, ${titleEn.toLowerCase()} works best when I ${mode.task[0]} with a clear next step.`, `A: Tóm lại, ${titleVi.toLowerCase()} hiệu quả nhất khi tôi ${mode.task[1]} với bước tiếp theo rõ ràng.`],
    ],
    proficient: [
      [`A: Let's discuss ${phraseEn} with a tone that fits the situation.`, `A: Hãy thảo luận về ${phraseVi} với giọng điệu phù hợp tình huống.`],
      [`B: What kind of tone would you choose ${place[0]}?`, `B: Bạn sẽ chọn giọng điệu nào ${place[1]}?`],
      [`A: I would sound calm and collaborative because the goal is to ${goal[0]} and ${mode.task[0]}.`, `A: Tôi sẽ nói bình tĩnh và hợp tác vì mục tiêu là ${goal[1]} và ${mode.task[1]}.`],
      [`B: Can you make the point more diplomatic?`, `B: Bạn có thể diễn đạt ý đó khéo léo hơn không?`],
      [`A: I might say, "Perhaps we could ${secondOption[0]} before we decide."`, `A: Tôi có thể nói: "Có lẽ chúng ta có thể ${secondOption[1]} trước khi quyết định."`],
      [`B: That sounds natural. What nuance does it add?`, `B: Câu đó nghe tự nhiên. Nó thêm sắc thái gì?`],
      [`A: It sounds less direct, but it still guides the listener toward a useful next step.`, `A: Nó nghe bớt trực diện hơn, nhưng vẫn hướng người nghe tới bước tiếp theo hữu ích.`],
      [`B: How would you respond if they choose to ${firstOption[0]} instead?`, `B: Bạn sẽ phản hồi thế nào nếu họ chọn ${firstOption[1]} thay vào đó?`],
      [`A: I would acknowledge their choice, then explain that my suggestion helps ${reason[0]}.`, `A: Tôi sẽ ghi nhận lựa chọn của họ, rồi giải thích rằng gợi ý của tôi giúp ${reason[1]}.`],
      [`B: Good. That keeps the discussion natural, respectful, and clear.`, `B: Tốt. Cách đó giữ cuộc thảo luận tự nhiên, tôn trọng và rõ ràng.`],
    ],
  };
  const lines = stageScripts[band.stageId];
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
      lines: makeLines(seed, bandIndex, band.level, variant, seedIndex),
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
