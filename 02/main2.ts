const rawData = await Deno.readTextFile(
  import.meta.dirname + "/data/data.txt",
);

const reports = rawData.split("\n").map((line) => line.split(" ").map(Number));

const results: boolean[] = Array(reports.length).fill(false);

function checkReport(
  report: number[],
) {
  let direction = 0;

  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i + 1];
    const diff = next - current;

    if (diff === 0) {
      return false;
    }

    if (direction === 0) {
      direction = diff > 0 ? 1 : -1;
    } else if (direction === 1 && diff < 0) {
      return false;
    } else if (direction === -1 && diff > 0) {
      return false;
    }

    if (Math.abs(diff) > 3) {
      return false;
    }
  }

  return true;
}

for (const [index, report] of reports.entries()) {
  const safe = checkReport(report);
  if (safe) {
    results[index] = true;
  } else {
    for (let i = 0; i < report.length; i++) {
      const safe = checkReport(report.toSpliced(i, 1));
      if (safe) {
        results[index] = true;
        break;
      }
    }
  }
}

const safeReports = reports.filter((_, index) => results[index]);

console.log(safeReports.length);
