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
    let i;
    for (
      i = 1;
      pageIndices.length > countPagesInFile;
      i++, pageIndices = pageIndices.slice(countPagesInFile)
    ) {
      savePDF(
        mainPDF,
        `${out}${i}PDF.pdf`,
        pageIndices.slice(0, countPagesInFile)
      );
    }

    savePDF(mainPDF, `${out}${i + 1}PDF.pdf`, pageIndices);
  }

  module.exports = { splitN };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
