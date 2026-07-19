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
  {
    id: "role-play",
    label: "Đóng vai tự nhiên",
    focus: "respond naturally in a role-play conversation",
    viFocus: "phản hồi tự nhiên trong hội thoại đóng vai",
  },
  {
    id: "fluency",
    label: "Nói trôi chảy",
    focus: "extend the conversation with reasons and a short summary",
    viFocus: "mở rộng hội thoại bằng lý do và tóm tắt ngắn",
  },
] as const;

type DialogueLine = {
  speaker: "female" | "male";
  en: string;
  vi: string;
};

function makeLines(seed: (typeof topicSeeds)[number], bandIndex: number, stageLabel: string, variant: (typeof lessonVariants)[number], seedIndex: number) {
  const [titleEn, titleVi, phraseEn, phraseVi] = seed;
  const band = levelBands[bandIndex];
  const scenarioGroups = [
    {
      test: /morning|breakfast|ready|bag|chores|home|cooking|snacks/i,
      place: ["at home", "ở nhà"],
      speakerA: "Mia",
      speakerB: "Dad",
      object: ["the things we need before leaving", "những việc cần làm trước khi ra ngoài"],
      problem: ["we have limited time this morning", "sáng nay chúng ta không có nhiều thời gian"],
      actionA: ["check the most important item first", "kiểm tra việc quan trọng nhất trước"],
      actionB: ["keep the plan simple", "giữ kế hoạch thật đơn giản"],
      result: ["we can leave calmly", "chúng ta có thể ra ngoài một cách bình tĩnh"],
    },
    {
      test: /classroom|help|homework|library|project|group|online|presentation/i,
      place: ["in class", "trong lớp học"],
      speakerA: "Linh",
      speakerB: "Mr. Brown",
      object: ["the task for today's lesson", "nhiệm vụ của bài học hôm nay"],
      problem: ["one instruction is still unclear", "một hướng dẫn vẫn chưa rõ"],
      actionA: ["ask one clear question", "hỏi một câu thật rõ"],
      actionB: ["repeat the key instruction", "nhắc lại hướng dẫn chính"],
      result: ["the group knows what to do next", "cả nhóm biết cần làm gì tiếp theo"],
    },
    {
      test: /friend|birthday|weekend|sports|music|art|stories|club/i,
      place: ["after school", "sau giờ học"],
      speakerA: "Ben",
      speakerB: "Sara",
      object: ["the plan with friends", "kế hoạch với bạn bè"],
      problem: ["not everyone has agreed on the time", "không phải ai cũng đã thống nhất thời gian"],
      actionA: ["suggest one easy option", "gợi ý một lựa chọn dễ thực hiện"],
      actionB: ["check if the plan works for everyone", "kiểm tra xem kế hoạch có phù hợp với mọi người không"],
      result: ["the plan feels friendly and clear", "kế hoạch trở nên thân thiện và rõ ràng"],
    },
    {
      test: /shopping|clothes|gift|ordering|food/i,
      place: ["at a small shop", "ở một cửa hàng nhỏ"],
      speakerA: "Customer",
      speakerB: "Assistant",
      object: ["the item the customer needs", "món đồ khách hàng cần"],
      problem: ["there are two possible choices", "có hai lựa chọn phù hợp"],
      actionA: ["explain the purpose", "giải thích mục đích sử dụng"],
      actionB: ["compare the choices briefly", "so sánh ngắn gọn các lựa chọn"],
      result: ["the customer can choose with confidence", "khách hàng có thể chọn một cách tự tin"],
    },
    {
      test: /weather|park|playground|bus|directions|trip|station|airport|hotel|museum|photos|lost/i,
      place: ["in a public place", "ở nơi công cộng"],
      speakerA: "Tom",
      speakerB: "Guide",
      object: ["the next step in the trip", "bước tiếp theo trong chuyến đi"],
      problem: ["the place is busy and a little confusing", "nơi này đông và hơi khó hiểu"],
      actionA: ["ask for specific information", "hỏi thông tin cụ thể"],
      actionB: ["give a short direction", "đưa ra chỉ dẫn ngắn"],
      result: ["Tom can move on without feeling lost", "Tom có thể tiếp tục mà không bị lạc hướng"],
    },
    {
      test: /appointment|safe|tired|encouraging|problem|apologising|thanks|suggestion|options|opinion|goals/i,
      place: ["during a quiet conversation", "trong một cuộc trò chuyện yên tĩnh"],
      speakerA: "Nora",
      speakerB: "Alex",
      object: ["the small problem they need to discuss", "vấn đề nhỏ họ cần trao đổi"],
      problem: ["someone may misunderstand the message", "ai đó có thể hiểu sai thông điệp"],
      actionA: ["say the idea politely", "nói ý đó một cách lịch sự"],
      actionB: ["listen and check the meaning", "lắng nghe và kiểm tra ý nghĩa"],
      result: ["both people feel clear about the next step", "cả hai người đều rõ về bước tiếp theo"],
    },
    {
      test: /community|energy|recycling|plants/i,
      place: ["at a community activity", "trong một hoạt động cộng đồng"],
      speakerA: "Eva",
      speakerB: "Leo",
      object: ["the shared task for the group", "nhiệm vụ chung của cả nhóm"],
      problem: ["the group needs a practical plan", "nhóm cần một kế hoạch thực tế"],
      actionA: ["divide the task into small steps", "chia nhiệm vụ thành các bước nhỏ"],
      actionB: ["make sure everyone has a role", "đảm bảo mỗi người có một vai trò"],
      result: ["the activity becomes easier to finish", "hoạt động trở nên dễ hoàn thành hơn"],
    },
  ] as const;
  const fallback = scenarioGroups[seedIndex % scenarioGroups.length];
  const scenario = scenarioGroups.find((item) => item.test.test(titleEn)) ?? fallback;
  const variantText = variant.id === "core"
    ? {
      aim: ["understand the basic situation", "hiểu tình huống cơ bản"],
      move: ["say the key word clearly", "nói rõ từ khóa chính"],
      close: ["Now the basic meaning is clear.", "Bây giờ ý nghĩa cơ bản đã rõ."],
    }
    : variant.id === "reflex"
      ? {
        aim: ["answer quickly and ask one follow-up question", "trả lời nhanh và hỏi thêm một câu"],
        move: ["change one detail and keep speaking", "đổi một chi tiết và tiếp tục nói"],
        close: ["That keeps the conversation moving.", "Điều đó giúp cuộc hội thoại tiếp tục tự nhiên."],
      }
      : variant.id === "real-life"
        ? {
        aim: ["use the topic in a real-life plan", "dùng chủ đề trong một kế hoạch đời sống thật"],
        move: ["choose a practical next step", "chọn một bước tiếp theo thực tế"],
        close: ["That makes the plan useful in real life.", "Điều đó làm kế hoạch hữu ích trong đời sống thật."],
        }
        : variant.id === "role-play"
          ? {
            aim: ["respond naturally in the role-play", "phản hồi tự nhiên trong tình huống đóng vai"],
            move: ["listen, respond, and keep the role-play natural", "lắng nghe, phản hồi và giữ hội thoại tự nhiên"],
            close: ["That sounds like a real conversation.", "Cách nói đó giống một cuộc trò chuyện thật."],
          }
          : {
            aim: ["speak more fluently with a reason and a short summary", "nói trôi chảy hơn với lý do và tóm tắt ngắn"],
            move: ["add a reason, a detail, and a short ending", "thêm một lý do, một chi tiết và phần kết ngắn"],
            close: ["That makes the answer fluent and complete.", "Điều đó làm câu trả lời trôi chảy và đầy đủ."],
          };
  const variantOffsets = { core: 0, reflex: 2, "real-life": 4, "role-play": 6, fluency: 8 } as const;
  const variantOffset = variantOffsets[variant.id];
  const optionA = variantOffset % 3 === 0 ? scenario.actionA : variantOffset % 3 === 1 ? scenario.actionB : scenario.object;
  const optionB = variantOffset % 2 === 0 ? scenario.actionB : scenario.result;
  const stageScripts: Record<FluencyStageId, [string, string][]> = {
    beginner: [
      [`${scenario.speakerA}: ${phraseEn}, please.`, `${scenario.speakerA}: ${phraseVi}, làm ơn.`],
      [`${scenario.speakerB}: Here?`, `${scenario.speakerB}: Ở đây phải không?`],
      [`${scenario.speakerA}: Yes, ${scenario.place[0]}.`, `${scenario.speakerA}: Đúng, ${scenario.place[1]}.`],
      [`${scenario.speakerB}: Okay. ${variantText.move[0]}.`, `${scenario.speakerB}: Được. ${variantText.move[1]}.`],
    ],
    elementary: [
      [`${scenario.speakerA}: I need help with ${phraseEn} ${scenario.place[0]}.`, `${scenario.speakerA}: Tôi cần giúp về ${phraseVi} ${scenario.place[1]}.`],
      [`${scenario.speakerB}: Sure. What is the problem?`, `${scenario.speakerB}: Được. Vấn đề là gì?`],
      [`${scenario.speakerA}: ${scenario.problem[0]}.`, `${scenario.speakerA}: ${scenario.problem[1]}.`],
      [`${scenario.speakerB}: Do you want to ${optionA[0]}?`, `${scenario.speakerB}: Bạn muốn ${optionA[1]} phải không?`],
      [`${scenario.speakerA}: Yes. I want to ${variantText.aim[0]}.`, `${scenario.speakerA}: Đúng. Tôi muốn ${variantText.aim[1]}.`],
    ],
    "pre-intermediate": [
      [`${scenario.speakerA}: ${titleEn} is part of our plan ${scenario.place[0]}.`, `${scenario.speakerA}: ${titleVi} là một phần trong kế hoạch của chúng ta ${scenario.place[1]}.`],
      [`${scenario.speakerB}: What do we need to do first?`, `${scenario.speakerB}: Trước tiên chúng ta cần làm gì?`],
      [`${scenario.speakerA}: We should ${optionA[0]} because ${scenario.problem[0]}.`, `${scenario.speakerA}: Chúng ta nên ${optionA[1]} vì ${scenario.problem[1]}.`],
      [`${scenario.speakerB}: Good point. I can ${optionB[0]} too.`, `${scenario.speakerB}: Ý hay. Tôi cũng có thể ${optionB[1]}.`],
      [`${scenario.speakerA}: Thanks. That helps us ${variantText.aim[0]}.`, `${scenario.speakerA}: Cảm ơn. Việc đó giúp chúng ta ${variantText.aim[1]}.`],
      [`${scenario.speakerB}: Then the next step will be easier.`, `${scenario.speakerB}: Vậy bước tiếp theo sẽ dễ hơn.`],
    ],
    intermediate: [
      [`${scenario.speakerA}: Yesterday, ${phraseEn} was harder than I expected ${scenario.place[0]}.`, `${scenario.speakerA}: Hôm qua, ${phraseVi} khó hơn tôi nghĩ ${scenario.place[1]}.`],
      [`${scenario.speakerB}: What made it difficult?`, `${scenario.speakerB}: Điều gì làm việc đó khó?`],
      [`${scenario.speakerA}: ${scenario.problem[0]}, so I was not sure what to say first.`, `${scenario.speakerA}: ${scenario.problem[1]}, nên tôi không chắc nên nói gì trước.`],
      [`${scenario.speakerB}: How did you solve it?`, `${scenario.speakerB}: Bạn đã giải quyết thế nào?`],
      [`${scenario.speakerA}: I decided to ${optionA[0]} and then ${optionB[0]}.`, `${scenario.speakerA}: Tôi quyết định ${optionA[1]} rồi ${optionB[1]}.`],
      [`${scenario.speakerB}: That makes sense. What did you learn?`, `${scenario.speakerB}: Hợp lý đấy. Bạn đã học được gì?`],
      [`${scenario.speakerA}: I learned to ${variantText.move[0]} before the situation becomes confusing.`, `${scenario.speakerA}: Tôi học được cách ${variantText.move[1]} trước khi tình huống trở nên khó hiểu.`],
    ],
    "upper-intermediate": [
      [`${scenario.speakerA}: We need to decide how to handle ${phraseEn} ${scenario.place[0]}.`, `${scenario.speakerA}: Chúng ta cần quyết định cách xử lý ${phraseVi} ${scenario.place[1]}.`],
      [`${scenario.speakerB}: What are the realistic choices?`, `${scenario.speakerB}: Những lựa chọn thực tế là gì?`],
      [`${scenario.speakerA}: One choice is to ${optionA[0]}; another is to ${optionB[0]}.`, `${scenario.speakerA}: Một lựa chọn là ${optionA[1]}; lựa chọn khác là ${optionB[1]}.`],
      [`${scenario.speakerB}: Which one would you recommend?`, `${scenario.speakerB}: Bạn sẽ khuyên chọn cách nào?`],
      [`${scenario.speakerA}: I would recommend the second choice because ${scenario.result[0]}.`, `${scenario.speakerA}: Tôi sẽ khuyên chọn cách thứ hai vì ${scenario.result[1]}.`],
      [`${scenario.speakerB}: Is there any weakness in that choice?`, `${scenario.speakerB}: Lựa chọn đó có điểm yếu nào không?`],
      [`${scenario.speakerA}: It may take more effort, but it helps us ${variantText.aim[0]}.`, `${scenario.speakerA}: Nó có thể cần nhiều công sức hơn, nhưng giúp chúng ta ${variantText.aim[1]}.`],
      [`${scenario.speakerB}: That is a balanced recommendation.`, `${scenario.speakerB}: Đó là một lời khuyên cân bằng.`],
    ],
    advanced: [
      [`${scenario.speakerA}: I would like to analyse ${phraseEn} in a real context.`, `${scenario.speakerA}: Tôi muốn phân tích ${phraseVi} trong một bối cảnh thật.`],
      [`${scenario.speakerB}: What context are you thinking of?`, `${scenario.speakerB}: Bạn đang nghĩ đến bối cảnh nào?`],
      [`${scenario.speakerA}: The context is ${scenario.place[0]}, where ${scenario.problem[0]}.`, `${scenario.speakerA}: Bối cảnh là ${scenario.place[1]}, nơi ${scenario.problem[1]}.`],
      [`${scenario.speakerB}: What is your main point?`, `${scenario.speakerB}: Ý chính của bạn là gì?`],
      [`${scenario.speakerA}: My main point is that people should ${optionA[0]} before they ${optionB[0]}.`, `${scenario.speakerA}: Ý chính của tôi là mọi người nên ${optionA[1]} trước khi ${optionB[1]}.`],
      [`${scenario.speakerB}: How would you respond to a different opinion?`, `${scenario.speakerB}: Bạn sẽ phản hồi một quan điểm khác như thế nào?`],
      [`${scenario.speakerA}: I would accept that it may work, but I would explain why ${scenario.result[0]}.`, `${scenario.speakerA}: Tôi sẽ thừa nhận cách đó có thể hiệu quả, nhưng sẽ giải thích vì sao ${scenario.result[1]}.`],
      [`${scenario.speakerB}: Can you summarise that?`, `${scenario.speakerB}: Bạn có thể tóm tắt điều đó không?`],
      [`${scenario.speakerA}: ${titleEn} becomes easier when the purpose, action, and result are connected.`, `${scenario.speakerA}: ${titleVi} trở nên dễ hơn khi mục đích, hành động và kết quả được liên kết.`],
    ],
    proficient: [
      [`${scenario.speakerA}: If we discuss ${phraseEn} naturally, the tone matters as much as the words.`, `${scenario.speakerA}: Nếu chúng ta thảo luận về ${phraseVi} một cách tự nhiên, giọng điệu cũng quan trọng như từ ngữ.`],
      [`${scenario.speakerB}: What tone fits ${scenario.place[0]}?`, `${scenario.speakerB}: Giọng điệu nào phù hợp ${scenario.place[1]}?`],
      [`${scenario.speakerA}: A calm, cooperative tone fits because ${scenario.problem[0]}.`, `${scenario.speakerA}: Giọng bình tĩnh, hợp tác là phù hợp vì ${scenario.problem[1]}.`],
      [`${scenario.speakerB}: How would you phrase your suggestion?`, `${scenario.speakerB}: Bạn sẽ diễn đạt gợi ý của mình thế nào?`],
      [`${scenario.speakerA}: I might say, "Perhaps we should ${optionA[0]} first, then ${optionB[0]} if needed."`, `${scenario.speakerA}: Tôi có thể nói: "Có lẽ chúng ta nên ${optionA[1]} trước, rồi ${optionB[1]} nếu cần."`],
      [`${scenario.speakerB}: That sounds careful without being too formal.`, `${scenario.speakerB}: Cách nói đó nghe cẩn trọng mà không quá trang trọng.`],
      [`${scenario.speakerA}: Exactly. It respects the listener and still moves the conversation forward.`, `${scenario.speakerA}: Chính xác. Nó tôn trọng người nghe và vẫn giúp cuộc hội thoại tiến triển.`],
      [`${scenario.speakerB}: What if the listener disagrees?`, `${scenario.speakerB}: Nếu người nghe không đồng ý thì sao?`],
      [`${scenario.speakerA}: I would ask for their reason, then connect it back to ${scenario.result[0]}.`, `${scenario.speakerA}: Tôi sẽ hỏi lý do của họ, rồi liên hệ lại với việc ${scenario.result[1]}.`],
      [`${scenario.speakerB}: That is natural, precise, and flexible communication.`, `${scenario.speakerB}: Đó là cách giao tiếp tự nhiên, chính xác và linh hoạt.`],
    ],
  };
  const lines = stageScripts[band.stageId];
  return lines.slice(0, levelBands[bandIndex].turns).map(([en, vi], index) => {
    const cleanEn = en.replace(/^[^:]+:\s*/, "");
    const cleanVi = vi.replace(/^[^:]+:\s*/, "");
    return {
      speaker: index % 2 === 0 ? "female" : "male",
      en: cleanEn,
      vi: cleanVi,
    } satisfies DialogueLine;
  });
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
  return topic.lines.map((line) => line.en).join(" ");
}

function speakingDrills(topic: Topic) {
  return [
    { en: topic.lines[0].en, vi: topic.lines[0].vi, action: "Nghe và nói lại đúng nhịp." },
    { en: topic.lines[1].en, vi: topic.lines[1].vi, action: "Đổi thông tin thành câu của bạn." },
    { en: `In my life, ${topic.en.toLowerCase()} is important because I use English to explain real situations.`, vi: `Trong cuộc sống của tôi, ${topic.vi.toLowerCase()} quan trọng vì tôi dùng tiếng Anh để giải thích tình huống thật.`, action: "Nói câu mở rộng 1-2 lần, sau đó ghi âm." },
  ];
}

function topicQuestions(topic: Topic) {
  return [
    { q: "What is the main topic?", vi: "Chủ đề chính là gì?", answer: topic.en },
    { q: "Say one useful sentence from the dialogue.", vi: "Hãy nói một câu hữu ích trong hội thoại.", answer: topic.lines[0].en },
    { q: "How can you use this topic in real life?", vi: "Bạn có thể dùng chủ đề này trong đời sống như thế nào?", answer: topic.speakTask },
  ];
}

function pickVoice(voices: SpeechSynthesisVoice[], speaker: DialogueLine["speaker"]) {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  const femaleVoice = englishVoices.find((voice) => /female|samantha|victoria|zira|susan|karen|moira|serena|tessa/i.test(voice.name));
  const maleVoice = englishVoices.find((voice) => /male|daniel|david|mark|alex|george|fred|tom/i.test(voice.name));
  if (speaker === "female") return femaleVoice ?? englishVoices[0] ?? voices[0] ?? null;
  return maleVoice ?? englishVoices.find((voice) => voice !== femaleVoice) ?? englishVoices[0] ?? voices[0] ?? null;
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
    const voices = window.speechSynthesis.getVoices();
    const rate = topic.level.startsWith("A0") || topic.level.startsWith("A1") ? 0.78 : 0.92;
    const speakLine = (index: number) => {
      if (index >= topic.lines.length) {
        setPlaying(false);
        return;
      }
      const line = topic.lines[index];
      const utterance = new SpeechSynthesisUtterance(line.en);
      utterance.lang = "en-GB";
      utterance.rate = rate;
      utterance.pitch = line.speaker === "female" ? 1.08 : 0.88;
      utterance.voice = pickVoice(voices, line.speaker);
      utterance.onend = () => window.setTimeout(() => speakLine(index + 1), 180);
      utterance.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
    };
    setPlaying(true);
    speakLine(0);
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

        {activeView === "roadmap" && <div className="level-rail app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH HỌC ĐƠN GIẢN - HIỆU QUẢ</span><h2>Đi từ Beginner đến thông hiểu - thành thạo</h2></div><p>Dữ liệu hiện dùng 60 chủ đề đời sống, 7 cấp năng lực và 5 biến thể luyện tập cho mỗi chủ đề.</p></div><div className="roadmap-stats"><span><b>2.100</b><small>bài nghe - nói</small></span><span><b>60</b><small>chủ đề đời sống</small></span><span><b>7</b><small>cấp năng lực</small></span><span><b>5</b><small>biến thể mỗi chủ đề</small></span></div><div className="lesson-grid">{roadmap.map((stage) => <article key={stage.id}><div className="lesson-visual"><span>{stage.level}</span></div><div className="lesson-body"><h3>{stage.title}</h3><p>{stage.goal}</p><div className="format">Học mỗi ngày: {stage.daily}</div><footer><span>Đầu ra</span><span>{stage.output}</span></footer></div></article>)}</div><div className="roadmap-support"><article><h3>Chu trình 1 bài học</h3><ol>{studyCycle.map((item) => <li key={item}>{item}</li>)}</ol></article><article><h3>Khi nào lên cấp?</h3><ol>{levelUpChecks.map((item) => <li key={item}>{item}</li>)}</ol></article><article className="source-guide"><h3>Nguồn chuẩn dùng để thiết kế lại</h3><ol>{sourceGuides.map((item) => <li key={item}>{item}</li>)}</ol></article></div></div>}

        {activeView === "programs" && <div className="tracks-section app-panel"><div className="section-heading"><div><span className="kicker">LỘ TRÌNH THEO NĂNG LỰC</span><h2>Từ Beginner đến thông hiểu - thành thạo</h2></div><p>Chọn cấp độ hiện tại để lọc chủ đề, độ dài hội thoại và bài luyện nói phù hợp.</p></div><div className="track-grid">{fluencyStages.map((item) => <article key={item.id} className={stage === item.id ? "selected-card" : ""} onClick={() => setStage(item.id)}><span>{item.icon}</span><b>{item.label}</b><small>{`${item.vi} · ${item.level}`}</small><p>{item.promise}</p><ul>{item.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul><button className="button secondary" onClick={(event) => { event.stopPropagation(); setStage(item.id); openView("topics"); }}>Xem chủ đề</button></article>)}</div></div>}

        {activeView === "method" && <div className="method app-panel"><span className="kicker">CÔNG THỨC PHẢN XẠ</span><h2>Nghe trước, luyện nói song ngữ, rồi mới trả lời câu hỏi</h2><p className="section-sub">Cấu trúc mỗi bài: bài nghe song ngữ, bài luyện nói song ngữ, ghi âm, sau đó mới đến câu hỏi kiểm tra.</p><div className="method-grid"><article><span>1</span><b>Nghe không nhìn chữ</b><p>Bắt bối cảnh, người nói, ý chính.</p></article><article><span>2</span><b>Mở song ngữ</b><p>Đọc câu tiếng Anh kèm dịch Việt.</p></article><article><span>3</span><b>Luyện nói song ngữ</b><p>Nói câu mẫu, hiểu nghĩa, rồi đổi thành câu của mình.</p></article><article><span>4</span><b>Câu hỏi sau cùng</b><p>Trả lời để kiểm tra nghe hiểu và khả năng dùng câu.</p></article></div></div>}

        {activeView === "topics" && <div className="lesson-section app-panel"><div className="section-heading"><div><span className="kicker">CHỦ ĐỀ SONG NGỮ</span><h2>{selectedStage.label}: bài nghe - nói theo đời sống</h2><p className="catalog-summary">Mỗi chủ đề đều có bài luyện nói song ngữ trước phần câu hỏi.</p></div><div className="filters">{fluencyStages.map((item) => <button key={item.id} className={stage === item.id ? "active" : ""} onClick={() => setStage(item.id)}>{item.label}</button>)}</div></div><div className="catalog-tools"><label className="search-box">Tìm <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="chủ đề, bản dịch, cấp độ..." /></label><span><b>{filteredTopics.length}</b> chủ đề phù hợp</span></div><div className="lesson-grid">{filteredTopics.map((topic) => <article key={topic.id} onClick={() => setOpenTopic(topic)}><div className="lesson-visual"><span>{topic.level}</span><button aria-label={`Mở ${topic.vi}`}>▶</button><i>{selectedStage.label}</i></div><div className="lesson-body"><div className="lesson-tags"><span className="pill blue">{topic.en}</span></div><h3>{topic.vi}</h3><p>{topic.listenTask}</p><div className="format">Luyện nói: {topic.speakTask}</div><footer><span>{topic.variant}</span><span>12-18 phút</span></footer></div></article>)}</div></div>}
      </section>

      {openTopic && <div className="lesson-modal" role="dialog" aria-modal="true"><div className="modal-backdrop" onClick={() => setOpenTopic(null)}/><div className="lesson-panel"><button className="close" onClick={() => setOpenTopic(null)}>×</button><header><span className="lesson-icon">{openTopic.level}</span><div><span className="pill blue">{openTopic.en}</span><h2>{openTopic.vi}</h2><p>Dạng bài: {openTopic.variant}. Thứ tự: nghe song ngữ → luyện nói song ngữ → ghi âm → câu hỏi.</p></div></header><section className="listen-block"><h3>1. Bài nghe song ngữ</h3><div className="audio-player"><button onClick={() => playTopic(openTopic)}>{playing ? "Ⅱ" : "▶"}</button><Wave active={playing}/><span>Nghe 2 giọng nam/nữ, không đọc tên người đối thoại</span></div><button className="transcript-toggle" onClick={() => setShowVietnamese(!showVietnamese)}>{showVietnamese ? "Ẩn dịch tiếng Việt" : "Hiện dịch tiếng Việt"}</button><div className="transcript bilingual-lines">{openTopic.lines.map((line, index) => <p key={`${line.speaker}-${index}-${line.en}`}><small>{line.speaker === "female" ? "Giọng nữ" : "Giọng nam"}</small><b>{line.en}</b>{showVietnamese && <span>{line.vi}</span>}</p>)}</div></section><section><h3>2. Bài luyện nói song ngữ</h3><div className="speaking-drill-list">{speakingDrills(openTopic).map((drill) => <article key={drill.en}><b>{drill.en}</b><span>{drill.vi}</span><small>{drill.action}</small></article>)}</div><p><b>Nhiệm vụ nói:</b> {openTopic.speakTask}</p></section><section className="speaking-practice"><h3>3. Ghi âm luyện nói</h3><p>Nói lại câu mẫu, sau đó đổi thông tin thành câu của bạn: người, nơi chốn, lý do, thời gian.</p><button className={`record-button ${recording ? "active" : ""}`} onClick={recordSpeech}><b>{recording ? "Dừng và lưu bản ghi" : "Bắt đầu nói"}</b><small>{recording ? "Đang ghi âm" : "Cho phép micro để luyện nói"}</small></button>{recordingUrl && <div className="recording-result"><audio controls src={recordingUrl}/></div>}</section><section><h3>4. Câu hỏi sau luyện nói</h3><div className="question-list">{topicQuestions(openTopic).map((item) => <article key={item.q}><b>{item.q}</b><span>{item.vi}</span><small>Gợi ý: {item.answer}</small></article>)}</div></section></div></div>}
      <footer className="footer"><div className="brand"><span className="brand-mark">SL</span><span>SpeakUp <b>Second Language</b></span></div><p>Chương trình luyện nghe - nói phản xạ, hướng tới dùng tiếng Anh như ngôn ngữ thứ hai.</p><span>Nội dung tự biên soạn, có dịch tiếng Việt để hỗ trợ hiểu và luyện nói.</span></footer>
    </main>
  );
}
