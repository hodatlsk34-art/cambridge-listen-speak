import { readFile, writeFile } from "node:fs/promises";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Pass the path to TM-1-2019/woz-dialogs.json");
const raw = JSON.parse(await readFile(sourcePath, "utf8"));
const rules = [
  ["movie", "Movie Tickets", "Đặt vé xem phim", /movie|film|theater|cinema|showtime|ticket/i],
  ["restaurant", "Restaurant Reservation", "Đặt bàn nhà hàng", /restaurant|reservation|table|dinner|lunch|cuisine/i],
  ["food", "Ordering Food", "Gọi món ăn", /pizza|coffee|drink|order|topping|delivery/i],
  ["transport", "Booking a Ride", "Đặt xe di chuyển", /ride|pickup|drop.?off|driver|uber|lyft|taxi/i],
  ["services", "Arranging a Service", "Sắp xếp dịch vụ", /repair|mechanic|appointment|vehicle|car|oil change/i],
  ["tourism", "Planning a Trip", "Lên kế hoạch chuyến đi", /flight|airport|hotel|travel/i],
];
const words = (text) => text.match(/[A-Za-z']+/g)?.length ?? 0;
function clean(text) {
  let value = String(text).replace(/\b(\w+)(?:\s+\1){1,2}\b/gi, "$1").replace(/\s+([,.!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
  if (!value) return value;
  value = value[0].toUpperCase() + value.slice(1);
  if (!/[.!?]$/.test(value)) value += ".";
  return value.replace(/\bi\b/g, "I").replace(/\bi'll\b/gi, "I'll").replace(/\bi'm\b/gi, "I'm");
}
function band(lines) {
  const total = lines.reduce((n, line) => n + words(line.en), 0), average = total / lines.length;
  if (average < 7 && total < 90) return ["pre-intermediate", "A2"];
  if (average < 11 && total < 150) return ["intermediate", "B1"];
  if (average < 15 && total < 220) return ["upper-intermediate", "B2"];
  if (average < 20) return ["advanced", "C1"];
  return ["proficient", "C2"];
}
const seen = new Set(), lessons = [];
for (const conversation of raw) {
  if (lessons.length >= 700) break;
  if (!Array.isArray(conversation.utterances) || conversation.utterances.length < 6 || conversation.utterances.length > 22) continue;
  const lines = conversation.utterances.map((item) => ({ speaker: item.speaker === "USER" ? "female" : "male", en: clean(item.text), vi: "" }));
  if (lines.some((line) => !line.en || words(line.en) > 38)) continue;
  const joined = lines.map((line) => line.en).join(" ");
  if (/\b(password|credit card number|social security|ssn)\b/i.test(joined)) continue;
  const fingerprint = joined.toLowerCase().replace(/[^a-z]+/g, " ").trim();
  if (seen.has(fingerprint)) continue;
  seen.add(fingerprint);
  const [domain, enTitle, viTitle] = rules.find((rule) => rule[3].test(joined)) ?? ["services", "Everyday Service", "Dịch vụ hằng ngày"];
  const [stageId, level] = band(lines), number = lessons.filter((item) => item.baseTopic === domain).length + 1;
  lessons.push({ id: `tm1-${conversation.conversation_id}`, en: `${enTitle} ${number}`, vi: `${viTitle} ${number}`, baseTopic: domain, level, stageId, variant: "Hội thoại thực theo nhiệm vụ", lines, listenTask: "Nghe để xác định nhu cầu ban đầu, thông tin được làm rõ và kết quả cuối cùng.", speakTask: "Đóng vai hai người, giữ nguyên mạch trao đổi rồi thay địa điểm, thời gian hoặc lựa chọn bằng thông tin của bạn.", sourceBasis: "Taskmaster" });
}
const header = `import type { DialogueLesson } from "./dialogues";\n\n// Taskmaster-1 WOz (CC BY 4.0). Vietnamese lines stay blank pending human review.\nexport const sourceTopics: DialogueLesson[] = `;
await writeFile("app/dialogues-source.ts", `${header}${JSON.stringify(lessons, null, 2)};\n`, "utf8");
console.log(`Imported ${lessons.length} complete, deduplicated conversations.`);
