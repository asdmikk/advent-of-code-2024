const rawData = await Deno.readTextFile(
  // import.meta.dirname + "/data/input.test.txt",
  import.meta.dirname + "/data/input.txt",
);

const puzzle = rawData.split("\n").map((line) => line.split(""));

type Position = {
  x: number;
  y: number;
};

function checkX(pos: Position, puzzle: string[][]) {
  const toMatch = "MAS";
  const centerOffset = Math.floor(toMatch.length / 2);

  const diagonal1 = puzzle.slice(
    pos.y - centerOffset,
    pos.y + centerOffset + 1,
  )
    .map((line, index) => line[(pos.x - centerOffset) + index]);
  const diagonal2 = puzzle.slice(
    pos.y - centerOffset,
    pos.y + centerOffset + 1,
  ).reverse()
    .map((line, index) => line[(pos.x - centerOffset) + index]);

  return (
    (diagonal1.join("") === toMatch ||
      diagonal1.toReversed().join("") === toMatch) &&
    (diagonal2.join("") === toMatch ||
      diagonal2.toReversed().join("") === toMatch)
  );
}

let count = 0;

for (let y = 0; y < puzzle.length; y++) {
  for (let x = 0; x < puzzle[y].length; x++) {
    if (puzzle[y][x] !== "A") continue;

    if (checkX({ x, y }, puzzle)) {
      count++;
    }
  }
}

console.log(count);
