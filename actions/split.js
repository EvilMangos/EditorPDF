const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function split(path, secondPdfPage) {

    const mainPDF = await PDFDocument.load(fs.readFileSync(`./pdf/${path}`));
    const firstPart = await PDFDocument.create();
    const secondPart = await PDFDocument.create();
    const copiedPages = await firstPart.copyPages(mainPDF, mainPDF.getPageIndices());
    for (let i = 0; i < secondPdfPage - 1; i++) {
        firstPart.addPage(copiedPages[i]);
    }
    
    copiedPages2 = await secondPart.copyPages(mainPDF, mainPDF.getPageIndices());
    for(let i = secondPdfPage; i < mainPDF.getPages().length; i++) {
        secondPart.addPage(copiedPages2[i]);
    }

    fs.writeFileSync('./firstPart.pdf', await firstPart.save());
    fs.writeFileSync('./secondPart.pdf', await secondPart.save());
}

module.exports = {split};
    