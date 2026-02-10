const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");

const parseFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    if (filePath.endsWith(".csv")) {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
      resolve(data);
    }
  });
};

module.exports = parseFile;
