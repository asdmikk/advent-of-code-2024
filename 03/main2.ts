const rawData = await Deno.readTextFile(
  // import.meta.dirname + "/data/input2.test.txt",
  import.meta.dirname + "/data/input.txt",
);

const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
const mulMatches = [...rawData.matchAll(mulPattern)];

const muls = mulMatches.map((match) => ({
  index: match.index,
  a: +match[1],
  b: +match[2],
}));

const dontPattern = /don't\(\)/g;
const dontMatches = [...rawData.matchAll(dontPattern)];
const dontStarts = dontMatches.map((match) => match.index);

const doPattern = /do\(\)/g;
const doMatches = [...rawData.matchAll(doPattern)];
const doStarts = doMatches.map((match) => match.index);

let result = 0;

let enabled = true;
for (let i = 0; i < rawData.length; i++) {
  if (dontStarts.includes(i)) {
    enabled = false;
  } else if (doStarts.includes(i)) {
    enabled = true;
  }

  if (enabled) {
    const mul = muls.find(({ index }) => index === i);
    if (mul) {
      result += mul.a * mul.b;
    }
  }
}

console.log(result);
