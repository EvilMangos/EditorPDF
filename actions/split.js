try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { checkAllFolders } = require("../test/checkAllFolders");
  const resultPath = "C:/EditorPDF/Result/";
  const sourcePdf = "C:/EditorPDF/PDF/";

  checkAllFolders();

  let split = (path, secondPart) =>
    work(path, secondPart).catch((err) => {
      console.log(err);
    });

  async function work(path, lastPageFirstPart) {
    path = `${sourcePdf}${path}`;

    try {
      if (!fs.existsSync(path)) throw new Error("File does not exist");
    } catch (err) {
      console.log(err.message);
      process.exit(-1);
    }
    const mainPDF = await PDFDocument.load(fs.readFileSync(path));
    const firstPart = await PDFDocument.create();
    const secondPart = await PDFDocument.create();
    const copiedPages = await firstPart.copyPages(
      mainPDF,
      mainPDF.getPageIndices()
    );
    try {
      if (mainPDF.getPages().length <= lastPageFirstPart)
        throw new Error("А number is too large");
      if (lastPageFirstPart < 1) throw new Error("A number is too small");
    } catch (err) {
      console.log(err.message);
      process.exit(-1);
    }

    for (let i = 0; i < lastPageFirstPart; i++) {
      firstPart.addPage(copiedPages[i]);

      copiedPages2 = await secondPart.copyPages(
        mainPDF,
        mainPDF.getPageIndices()
      );
      for (let i = lastPageFirstPart; i < mainPDF.getPages().length; i++) {
        secondPart.addPage(copiedPages2[i]);
      }

      fs.writeFileSync(`${resultPath}firstPart.pdf`, await firstPart.save());
      fs.writeFileSync(`${resultPath}secondPart.pdf`, await secondPart.save());
    }
  }

  module.exports = { split };
} catch {
  console.log(err);
  process.exit(-1);
}
