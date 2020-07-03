try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../test/isExist");
  const { savePDF } = require("../another functions/savePDF");

  let splitNumber = (source, out, secondPart) => {
    work(source, out, secondPart).catch((err) => {
      console.log(err);
      process.exit(-1);
    });
  };

  async function work(source, out, lastPageFirstPart) {
    let path = `${source}`;

    isExist(source);

    const mainPDF = await PDFDocument.load(fs.readFileSync(path));

    try {
      if (mainPDF.getPages().length <= lastPageFirstPart)
        throw new Error("А number is too large");
      if (lastPageFirstPart < 1) throw new Error("A number is too small");
    } catch {
      console.log(err.message);
      process.exit(-1);
    }

    var pageIndices = mainPDF.getPageIndices();

    await savePDF(
      mainPDF,
      `${out}firstPart.pdf`,
      pageIndices.slice(0, lastPageFirstPart)
    );
    await savePDF(
      mainPDF,
      `${out}secondPart.pdf`,
      pageIndices.slice(lastPageFirstPart + 1)
    );
  }

  module.exports = { splitNumber };
} catch {
  console.log(err);
  process.exit(-1);
}
