const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

let merge = (...arg) => work(...arg).catch(err =>{
  console.log(err);
} );

async function work(...arg) {
  // Load cover and content pdfs
  const doc = await PDFDocument.create();

  for(let path of arg) {
    const content = await PDFDocument.load(fs.readFileSync(`./pdf/${path}`));
    const contentPages = await doc.copyPages(content, content.getPageIndices());
  for (const page of contentPages) {
    doc.addPage(page);
  }
  }
  fs.writeFileSync('./result.pdf', await doc.save());
}

module.exports = {merge};