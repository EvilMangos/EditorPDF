try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../test/isExist");
  const { savePDF } = require("../another functions/savePDF");
  const { testRange } = require("../../test/testRange");

  let splitRange = (source, out, range) => {
    work(source, out, range).catch((err) => {
      console.log(err);
      process.exit(-1);
    });
  };

  async function work(source, out, range) {
    const mainPDF = await PDFDocument.load(fs.readFileSync(source));
    range = range.map((value) => value.split("-"));
    testRange(range);
    var pageIndices = mainPDF.getPageIndices();
    let pathToSave = (i) => `${out}${i}PDF.pdf`;
    for (let i = 0; i < range.length; i++) {
      let limits = range[i];
      if (limits.length == 1) limits[2] = +limits[0];
      savePDF(
        mainPDF,
        pathToSave(i + 1),
        pageIndices.slice(limits[0] - 1, +limits[2])
      );
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
