import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const RAW_DIR = "data/raw";
const OUT_DIR = "data/processed";
const OUT_FILE = join(OUT_DIR, "dialogue-corpus.json");

const cefrBands = [
  { level: "Pre A1", maxWords: 55, maxSentenceWords: 8 },
  { level: "A1", maxWords: 80, maxSentenceWords: 10 },
  { level: "A2", maxWords: 115, maxSentenceWords: 13 },
  { level: "B1", maxWords: 160, maxSentenceWords: 16 },
  { level: "B2", maxWords: 220, maxSentenceWords: 20 },
  { level: "C1", maxWords: 300, maxSentenceWords: 24 },
  { level: "C2", maxWords: 420, maxSentenceWords: 30 },
];

const domainRules = [
  ["Family & relationships", /family|friend|home|parent|brother|sister|relationship/i],
  ["School & learning", /school|class|teacher|homework|lesson|project|library/i],
  ["Food & daily routines", /food|breakfast|lunch|dinner|routine|morning|cook/i],
  ["Travel & transport", /travel|bus|train|airport|hotel|trip|direction/i],
  ["Shopping & services", /shop|buy|price|service|order|customer/i],
  ["Technology & media", /phone|app|online|video|screen|computer|media/i],
  ["Nature & environment", /nature|plant|energy|recycle|environment|community/i],
  ["Ideas & opinions", /opinion|idea|suggest|option|problem|solution|goal/i],
];

function countWords(text) {
  return (text.toLowerCase().match(/[a-z']+/g) ?? []).length;
}

function averageSentenceWords(text) {
  const sentences = text.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean);
  if (!sentences.length) return countWords(text);
  return sentences.reduce((sum, sentence) => sum + countWords(sentence), 0) / sentences.length;
}

function estimateCefr(dialogue) {
  const text = dialogue.join(" ");
  const words = countWords(text);
  const avgSentence = averageSentenceWords(text);
  return cefrBands.find((band) => words <= band.maxWords && avgSentence <= band.maxSentenceWords)?.level ?? "C2";
}

function classifyDomain(topic, dialogue) {
  const haystack = `${topic} ${dialogue.join(" ")}`;
  return domainRules.find(([, rule]) => rule.test(haystack))?.[0] ?? "Problems & solutions";
}

function isAllowed(item) {
  if (!Array.isArray(item.dialogue) || item.dialogue.length < 2) return false;
  if (item.license && !/allowed|permitted|public|owned|generated/i.test(item.license)) return false;
  const text = item.dialogue.join(" ");
  if (countWords(text) < 12 || countWords(text) > 450) return false;
  return true;
}

function normalizeDialogue(dialogue) {
  return dialogue.map((line, index) => {
    if (typeof line === "object" && line !== null) {
      return {
        speaker: line.speaker === "male" ? "male" : "female",
        text: String(line.text ?? line.en ?? "").replace(/^[^:]+:\s*/, "").trim(),
      };
    }
    return {
      speaker: index % 2 === 0 ? "female" : "male",
      text: String(line).replace(/^[^:]+:\s*/, "").trim(),
    };
  }).filter((line) => line.text);
}

async function readJsonl(path) {
  const content = await readFile(path, "utf8");
  return content.split(/\r?\n/).filter(Boolean).map((line, index) => {
    try {
      return JSON.parse(line);
    } catch {
      throw new Error(`${path}:${index + 1} is not valid JSONL`);
    }
  });
}

async function main() {
  let files = [];
  try {
    files = (await readdir(RAW_DIR)).filter((file) => file.endsWith(".jsonl"));
  } catch {
    await mkdir(RAW_DIR, { recursive: true });
  }

  const records = [];
  for (const file of files) {
    const items = await readJsonl(join(RAW_DIR, file));
    for (const item of items) {
      if (!isAllowed(item)) continue;
      const dialogue = normalizeDialogue(item.dialogue);
      const topic = String(item.topic ?? "Everyday conversation");
      records.push({
        id: `${String(item.source ?? "local")}-${records.length + 1}`,
        source: item.source ?? "local",
        topic,
        domain: classifyDomain(topic, dialogue.map((line) => line.text)),
        cefr: estimateCefr(dialogue.map((line) => line.text)),
        dialogue,
        license: item.license ?? "allowed",
      });
    }
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify({ generatedAt: new Date().toISOString(), count: records.length, records }, null, 2)}\n`);
  console.log(`Wrote ${records.length} records to ${OUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
