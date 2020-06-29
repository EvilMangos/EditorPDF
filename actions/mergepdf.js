const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

//merge().catch(err => console.log(err));

async function merge(path1, path2) {
  // Load cover and content pdfs

  const cover = await PDFDocument.load(fs.readFileSync(`./pdf/${path1}`));
  const content = await PDFDocument.load(fs.readFileSync(`./pdf/${path2}`));

  // Create a new document
  const doc = await PDFDocument.create();

  // Add the cover to the new doc
  const [coverPage] = await doc.copyPages(cover, [0]);
  doc.addPage(coverPage);

  // Add individual content pages
  const contentPages = await doc.copyPages(content, content.getPageIndices());
  for (const page of contentPages) {
    doc.addPage(page);
  }

  // Write the PDF to a file
  fs.writeFileSync('./result.pdf', await doc.save());
}

module.exports = {merge};