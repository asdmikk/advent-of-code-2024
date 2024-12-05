const rawData = await Deno.readTextFile(
  // import.meta.dirname + "/data/input.test.txt",
  import.meta.dirname + "/data/input.txt",
);

const rules = rawData.split("\n\n")[0].split("\n").map((line) =>
  line.split("|").map(Number)
);

const updates = rawData.split("\n\n")[1].split("\n").map((line) =>
  line.split(",").map(Number)
);

function getMiddleNumber(numbers: number[]) {
  return numbers[Math.floor(numbers.length / 2)];
}

function isUpdateRowValid(row: number[], rules: number[][]) {
  return !row.some((number, index) => {
    let isValid = true;

    const numberRules = rules.filter((rule) => rule[0] === number);
    const nextNumbers = row.slice(index + 1);

    numberRules.forEach(([_, laterNr]) => {
      if (row.includes(laterNr) && !nextNumbers.includes(laterNr)) {
        isValid = false;
      }
    });

    return !isValid;
  });
}

function fixInvalidRow(row: number[], rules: number[][]) {
  return row.toSorted((a, b) => {
    const aRules = rules.find((rule) => rule[0] === a && rule[1] == b);
    return aRules ? 1 : -1;
  });
}

const invalidUpdates = updates.filter((update) =>
  !isUpdateRowValid(update, rules)
);

const fixedUpdates: number[][] = invalidUpdates.map((update) =>
  fixInvalidRow(update, rules)
);

const result = fixedUpdates.reduce(
  (acc, update) => acc + getMiddleNumber(update),
  0,
);

console.log(result);
