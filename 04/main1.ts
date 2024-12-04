const rawData = await Deno.readTextFile(
  // import.meta.dirname + "/data/input.test.txt",
  import.meta.dirname + "/data/input.txt",
);

const puzzle = rawData.split("\n").map((line) => line.split(""));

type Position = {
  x: number;
  y: number;
};

function checkHorizontal(
  pos: Position,
  direction: 1 | -1,
  puzzle: string[][],
) {
  const toMatch = "XMAS";
  const match = direction === 1
    ? puzzle[pos.y].slice(pos.x, pos.x + toMatch.length)
    : puzzle[pos.y].slice(pos.x - toMatch.length + 1, pos.x + 1).reverse();
  return match.join("") === toMatch;
}

function checkVertical(pos: Position, direction: 1 | -1, puzzle: string[][]) {
  const toMatch = "XMAS";
  const match = direction === 1
    ? puzzle.slice(pos.y, pos.y + toMatch.length).map((line) => line[pos.x])
    : puzzle.slice(pos.y - toMatch.length + 1, pos.y + 1).reverse().map((
      line,
    ) => line[pos.x]);
  return match.join("") === toMatch;
}

function checkDiagonalRight(
  pos: Position,
  direction: 1 | -1,
  puzzle: string[][],
) {
  const toMatch = "XMAS";

  const match = direction === 1
    ? puzzle.slice(pos.y - toMatch.length + 1, pos.y + 1).reverse().map((
      line,
      index,
    ) => line[pos.x + index])
    : puzzle.slice(pos.y, pos.y + toMatch.length).map((
      line,
      index,
    ) => line[pos.x + index]);
  return match.join("") === toMatch;
}

function checkDiagonalLeft(
  pos: Position,
  direction: 1 | -1,
  puzzle: string[][],
) {
  const toMatch = "XMAS";

  const match = direction === 1
    ? puzzle.slice(pos.y - toMatch.length + 1, pos.y + 1).map((
      line,
      index,
    ) => line[pos.x + index]).reverse()
    : puzzle.slice(pos.y, pos.y + toMatch.length).reverse().map((
      line,
      index,
    ) => line[pos.x + index]).reverse();
  return match.join("") === toMatch;
}

let count = 0;

for (let y = 0; y < puzzle.length; y++) {
  for (let x = 0; x < puzzle[y].length; x++) {
    if (checkHorizontal({ x, y }, 1, puzzle)) {
      count++;
    }
    if (checkHorizontal({ x, y }, -1, puzzle)) {
      count++;
    }
    if (checkVertical({ x, y }, 1, puzzle)) {
      count++;
    }
    if (checkVertical({ x, y }, -1, puzzle)) {
      count++;
    }
    if (checkDiagonalRight({ x, y }, 1, puzzle)) {
      count++;
    }
    if (checkDiagonalRight({ x, y }, -1, puzzle)) {
      count++;
    }
    if (checkDiagonalLeft({ x, y }, 1, puzzle)) {
      count++;
    }
    if (checkDiagonalLeft({ x, y }, -1, puzzle)) {
      count++;
    }
  }
}

console.log(count);
