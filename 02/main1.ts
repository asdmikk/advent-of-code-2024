const rawData = await Deno.readTextFile(
  import.meta.dirname + "/data/data.txt",
);

const reports = rawData.split("\n").map((line) => line.split(" ").map(Number));

const results: boolean[] = Array(reports.length).fill(true);

for (const [index, report] of reports.entries()) {
  let direction = 0;
  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i + 1];
    const diff = next - current;

    if (diff === 0) {
      results[index] = false;
      break;
    }

    if (direction === 0) {
      direction = diff > 0 ? 1 : -1;
    } else if (direction === 1 && diff < 0) {
      results[index] = false;
      break;
    } else if (direction === -1 && diff > 0) {
      results[index] = false;
      break;
    }

    if (Math.abs(diff) > 3) {
      results[index] = false;
      break;
    }
  }
}

const safeReports = reports.filter((_, index) => results[index]);

console.log(safeReports.length);
