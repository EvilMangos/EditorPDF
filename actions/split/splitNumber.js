try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  //const { checkFolder } = require("../../test/checkFolder");
  //const { checkAllFolders } = require("../test/checkAllFolders");

  let splitNumber = (source, out, secondPart) => {
    // checkFolder(out);
    work(source, out, secondPart).catch((err) => {
      console.log(err);
    });
  };

  async function work(source, out, lastPageFirstPart) {
    let path = `${source}`;

    try {
      if (!fs.existsSync(path)) throw new Error(`File ${path} does not exist`);
    } catch (err) {
      console.log(err.message);
      process.exit(-1);
    }

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

  async function savePDF(sourcePDF, filePath, pageIndices) {
    const pdf = await PDFDocument.create();
    const pages = await pdf.copyPages(sourcePDF, pageIndices);
    for (const page of pages) pdf.addPage(page);

    fs.writeFile(filePath, await pdf.save(), function (err) {
      if (err) return console.log(err);
      console.log(`saved ${filePath}`);
    });
  }

  module.exports = { splitNumber };
} catch {
  console.log(err);
  process.exit(-1);
}
