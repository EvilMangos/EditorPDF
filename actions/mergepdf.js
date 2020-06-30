try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { checkAllFolders } = require("../test/checkAllFolders");
  const resultPath = "C:/EditorPDF/Result/";
  const sourcePDF = "C:/EditorPDF/PDF/";

  checkAllFolders();

  let merge = (...filesPaths) =>
    work(...filesPaths).catch((err) => {
      console.log(err);
    });

  async function work(...filesPaths) {
    const doc = await PDFDocument.create();

    for (let path of filesPaths) {
      try {
        if (!fs.existsSync(`${sourcePDF}${path}`))
          throw new Error(`File ${path} does not exist`);
      } catch (err) {
        console.log(err.message);
        process.exit(-1);
      }
      const content = await PDFDocument.load(
        fs.readFileSync(`${sourcePDF}${path}`)
      );
      const contentPages = await doc.copyPages(
        content,
        content.getPageIndices()
      );
      for (const page of contentPages) {
        doc.addPage(page);
      }
    }
    fs.writeFileSync(`${resultPath}result.pdf`, await doc.save());
    console.log(`saved ${resultPath}result.pdf`);
  }

  module.exports = { merge };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
