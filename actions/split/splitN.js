try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExact } = require("../../test/isExist");
  const { savePDF } = require("../savePDF");

  let splitN = (source, out, countPagesInFile) => {
    work(source, out, countPagesInFile).catch((err) => {
      console.log(err);
    });
  };

  async function work(source, out, countPagesInFile) {
    isExact(source);

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
      to = countPagesInFile;
    for (; to < pageIndices.length; i++, from = to, to += countPagesInFile) {
      savePDF(mainPDF, `${out}${i}PDF.pdf`, pageIndices.slice(from, to));
      console.log(`Saved: ${`${out}${i}PDF.pdf`}`);
    }

    savePDF(mainPDF, `${out}${i}PDF.pdf`, pageIndices.slice(from, to));
    console.log(`Saved: ${`${out}${i}PDF.pdf`}`);
  }

  module.exports = { splitN };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
