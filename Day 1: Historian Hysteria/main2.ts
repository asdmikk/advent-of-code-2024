const rawData = await Deno.readTextFile(
  import.meta.dirname + "/data/data.txt",
);

const entries = rawData
  .split("\n")
  .map((line) => line.split(" ").filter(Boolean).map(Number));

const leftList = entries.map(([a, _]) => a);
const rightList = entries.map(([_, b]) => b);

const rightCounts = new Map<number, number>();

for (const left of leftList) {
  if (rightCounts.has(left)) {
    continue;
  }

  rightCounts.set(left, rightList.filter((right) => left === right).length);
}

const result = leftList.reduce((acc, left) => {
  return acc + left * (rightCounts.get(left) ?? 0);
}, 0);

console.log(result);
