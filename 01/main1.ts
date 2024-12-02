const rawData = await Deno.readTextFile(
  import.meta.dirname + "/data/data.txt",
);

const entries = rawData
  .split("\n")
  .map((line) => line.split(" ").filter(Boolean).map(Number));

const list1 = entries.map(([a, _]) => a).toSorted();
const list2 = entries.map(([_, b]) => b).toSorted();

const pairs = list1.map((a, index) => [a, list2[index]]);

const diffSum = pairs.reduce((acc, [a, b]) => acc + Math.abs(a - b), 0);

console.log(diffSum);
