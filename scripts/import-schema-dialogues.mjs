import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.argv[2];
if (!root) throw new Error("Pass the Schema-Guided Dialogue train directory");

const domains = {
  Banks: ["finance", "Banking and Money", "Ngân hàng và tiền bạc"],
  Buses: ["transport", "Travelling by Bus", "Di chuyển bằng xe buýt"],
  Calendar: ["services", "Managing a Calendar", "Quản lý lịch cá nhân"],
  Events: ["media", "Booking an Event", "Đặt vé sự kiện"],
  Flights: ["tourism", "Booking a Flight", "Đặt chuyến bay"],
  Homes: ["housing", "Finding a Home", "Tìm nhà ở"],
  Hotels: ["hotel", "Booking Accommodation", "Đặt nơi lưu trú"],
  Media: ["media", "Choosing Entertainment", "Lựa chọn giải trí"],
  Movies: ["movie", "Going to the Movies", "Đi xem phim"],
  Music: ["music", "Finding Music", "Tìm kiếm âm nhạc"],
  RentalCars: ["transport", "Renting a Car", "Thuê ô tô"],
  Restaurants: ["restaurant", "Choosing a Restaurant", "Chọn nhà hàng"],
  RideSharing: ["transport", "Booking a Ride", "Đặt xe di chuyển"],
  Services: ["health", "Making a Personal Appointment", "Đặt lịch dịch vụ cá nhân"],
  Travel: ["tourism", "Planning a Visit", "Lên kế hoạch tham quan"],
  Weather: ["weather", "Checking the Weather", "Kiểm tra thời tiết"],
};
const limitPerFamily = 80;
const counts = Object.fromEntries(Object.keys(domains).map((key) => [key, 0]));
const words = (text) => text.match(/[A-Za-z']+/g)?.length ?? 0;
function band(lines) {
  const total = lines.reduce((sum, line) => sum + words(line.en), 0);
  const average = total / lines.length;
  if (average < 8 && total < 100) return ["pre-intermediate", "A2"];
  if (average < 12 && total < 170) return ["intermediate", "B1"];
  if (average < 16 && total < 240) return ["upper-intermediate", "B2"];
  if (average < 21) return ["advanced", "C1"];
  return ["proficient", "C2"];
}
function family(service) { return service.split("_")[0]; }

const files = (await readdir(root)).filter((name) => /^dialogues_\d+\.json$/.test(name)).sort();
const lessons = [], seen = new Set();
for (const file of files) {
  const dialogues = JSON.parse(await readFile(join(root, file), "utf8"));
  for (const dialogue of dialogues) {
    const families = [...new Set(dialogue.services.map(family))];
    if (families.length !== 1 || !domains[families[0]] || counts[families[0]] >= limitPerFamily) continue;
    if (!Array.isArray(dialogue.turns) || dialogue.turns.length < 6 || dialogue.turns.length > 22) continue;
    const lines = dialogue.turns.map((turn) => ({ speaker: turn.speaker === "USER" ? "female" : "male", en: String(turn.utterance).trim(), vi: "" }));
    if (lines.some((line) => !line.en || words(line.en) > 40)) continue;
    const fingerprint = lines.map((line) => line.en.toLowerCase().replace(/[^a-z]+/g, " ").trim()).join("|");
    if (seen.has(fingerprint) || /\b(password|credit card number|social security|ssn)\b/i.test(fingerprint)) continue;
    seen.add(fingerprint);
    const key = families[0], [baseTopic, enTitle, viTitle] = domains[key];
    counts[key] += 1;
    const [stageId, level] = band(lines);
    lessons.push({ id: `sgd-${dialogue.dialogue_id}`, en: `${enTitle} ${counts[key]}`, vi: `${viTitle} ${counts[key]}`, baseTopic, level, stageId, variant: "Hội thoại đa lượt theo nhiệm vụ", lines, listenTask: "Nghe để xác định yêu cầu, các điều kiện được làm rõ và lựa chọn được xác nhận.", speakTask: "Đóng vai trọn cuộc hội thoại, sau đó thay địa điểm, thời gian và một điều kiện bằng thông tin của bạn.", sourceBasis: "Schema-Guided Dialogue" });
  }
}
const header = `import type { DialogueLesson } from "./dialogues";\n\n// Schema-Guided Dialogue (CC BY-SA 4.0); complete single-domain dialogues.\nexport const schemaTopics: DialogueLesson[] = `;
await writeFile("app/dialogues-schema.ts", `${header}${JSON.stringify(lessons, null, 2)};\n`, "utf8");
console.log(JSON.stringify({ total: lessons.length, counts }, null, 2));
