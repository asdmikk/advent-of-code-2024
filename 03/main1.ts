const rawData = await Deno.readTextFile(
  import.meta.dirname + "/data/input.txt",
);

const pattern = /mul\((\d+),(\d+)\)/g;
const matches = [...rawData.matchAll(pattern)];

const numbers = matches.map(([_, a, b]) => [+a, +b]);

const result = numbers.reduce((acc, [a, b]) => acc + a * b, 0);

console.log(result);
