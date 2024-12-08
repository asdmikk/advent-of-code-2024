const rawData = await Deno.readTextFile(
  // import.meta.dirname + "/data/input.test.txt",
  import.meta.dirname + "/data/input.txt",
);

// console.log(rawData);

const map = rawData.split("\n").map((line) => line.split(""));

const UP = "^";
const DOWN = "v";
const LEFT = "<";
const RIGHT = ">";
const SOLID = "#";
const EMPTY = ".";

type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT;

const startY = map.findIndex((line) =>
  line.includes(UP) || line.includes(DOWN)
);
const startX = map[startY].findIndex((char) => char === UP || char === DOWN);

function moveToNextSolid(
  map: string[][],
  y: number,
  x: number,
  direction: Direction,
  visited: Set<`${number},${number}`>,
): { y: number; x: number; steps: number; exited: boolean } {
  let steps = 0;
  const pos = { y, x };
  let exited = false;

  if (direction === UP) {
    while ((pos.y - 1 >= 0) && (map[pos.y - 1][pos.x] !== SOLID)) {
      pos.y--;
      steps++;
      visited.add(`${pos.y},${pos.x}`);
    }
    if (pos.y === 0) {
      exited = true;
    }
  }

  if (direction === DOWN) {
    while ((pos.y + 1 < map.length) && (map[pos.y + 1][pos.x] !== SOLID)) {
      pos.y++;
      steps++;
      visited.add(`${pos.y},${pos.x}`);
    }
    if (pos.y === map.length - 1) {
      exited = true;
    }
  }

  if (direction === LEFT) {
    while ((pos.x - 1 >= 0) && (map[pos.y][pos.x - 1] !== SOLID)) {
      pos.x--;
      steps++;
      visited.add(`${pos.y},${pos.x}`);
    }
    if (pos.x === 0) {
      exited = true;
    }
  }

  if (direction === RIGHT) {
    while (
      (pos.x + 1 < map[pos.y].length) && (map[pos.y][pos.x + 1] !== SOLID)
    ) {
      pos.x++;
      steps++;
      visited.add(`${pos.y},${pos.x}`);
    }
    if (pos.x === map[pos.y].length - 1) {
      exited = true;
    }
  }

  return { ...pos, steps, exited };
}

function getNextDirection(direction: Direction): Direction {
  if (direction === UP) return RIGHT;
  if (direction === DOWN) return LEFT;
  if (direction === LEFT) return UP;
  if (direction === RIGHT) return DOWN;
  throw new Error("Invalid direction");
}

let y = startY;
let x = startX;
let direction = map[y][x] as Direction;
const visited = new Set<`${number},${number}`>([`${y},${x}`]);

while (true) {
  const result = moveToNextSolid(map, y, x, direction, visited);

  if (result.exited) {
    break;
  }

  y = result.y;
  x = result.x;

  direction = getNextDirection(direction);
}

console.log(visited.size);
