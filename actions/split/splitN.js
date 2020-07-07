try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../utility/isExist");
  const { savePDF } = require("../../utility/savePDF");

  let splitN = (source, out, countPagesInFile) => {
    work(source, out, countPagesInFile).catch((err) => {
      console.log(err);
      process.exit(-1);
    });
  };

  async function work(source, out, countPagesInFile) {
    isExist(source);
    const mainPDF = await PDFDocument.load(fs.readFileSync(source));

    try {
      if (countPagesInFile < 1) throw new Error("А number is too small");
    } catch {
      console.log(err);
      process.exit(-1);
    }

    var pageIndices = mainPDF.getPageIndices();
    let i = 1,
      from = 0,
      to = countPagesInFile,
      pathToSave = (i) => `${out}${i}PDF.pdf`;
    for (; to < pageIndices.length; i++, from = to, to += countPagesInFile) {
      savePDF(mainPDF, pathToSave(i), pageIndices.slice(from, to));
      console.log(`Saved: ${pathToSave(i)}`);
    }

    savePDF(mainPDF, pathToSave(i), pageIndices.slice(from, to));
    console.log(`Saved: ${pathToSave(i)}`);
  }

  module.exports = { splitN };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
