const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function split(path, secondPdfPage) {

    const mainPDF = await PDFDocument.load(fs.readFileSync(`./pdf/${path}`));

    let copiedPages = await mainPDF.copyPages(mainPDF, mainPDF.getPageIndices());
    let firstPart;
    for(let page of copiedPages) {
        firstPart.addPage(page);
    }
    // for(let i = 0; i < secondPdfPage - 1; i++) {
    //     firstPart.addPage(copiedPages[i]);
    // }

    // let secondPart;
    // for(let i = secondPdfPage - 1; i < mainPDF.getPages().length; i++) {
    //     secondPart.addPage(copiedPages[i]);
    // }

    fs.writeFile('part1.pdf', await firstPart.save());
    // fs.writeFile('part2.pdf', await secondPart.save());
}

module.exports = {split};
    