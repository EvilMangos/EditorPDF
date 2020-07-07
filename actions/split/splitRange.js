try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../utility/isExist");
  const { savePDF } = require("../../utility/savePDF");
  const { getRange } = require("../../utility/getRange");

  let splitRange = (source, out, range) => {
    work(source, out, range).catch((err) => {
      console.log(err);
      process.exit(-1);
    });
  };

  async function work(source, out, range) {
    isExist(source);
    const mainPDF = await PDFDocument.load(fs.readFileSync(source));
    let pathToSave = (i) => `${out}${i}PDF.pdf`;
    // var pageIndices = mainPDF.getPageIndices();
    range = getRange(range);
    for (let i = 0; i < range.length; i++) {
      savePDF(mainPDF, pathToSave(i + 1), range[i]);
      console.log(`Saved: ${pathToSave(i + 1)}`);
    }
  }

  module.exports = {
    splitRange,
  };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
