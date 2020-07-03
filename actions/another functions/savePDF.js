const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

async function savePDF(sourcePDF, filePath, pageIndices) {
  const pdf = await PDFDocument.create();
  const pages = await pdf.copyPages(sourcePDF, pageIndices);
  for (const page of pages) pdf.addPage(page);

  fs.writeFile(filePath, await pdf.save(), function (err) {
    if (err) throw err;
  });
}

module.exports = {
  savePDF,
};
