import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "One star: your species drives like it's fleeing something, your weather changes its mind hourly, and your hotels lost my luggage — but the street noodles alone were worth the nine-light-year trip.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (Buffer.byteLength(ENTRY, "utf8") > 200) {
  throw new Error(`entry must be at most 200 bytes, got ${Buffer.byteLength(ENTRY, "utf8")}`);
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}
if (!/one star/i.test(ENTRY) || !/noodle/i.test(ENTRY)) {
  throw new Error("entry must carry both the one-star complaint and the food compliment");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
