const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const { arguments } = require('commander');

let split = (path, secondPart) => work(path, secondPart).catch(err => {
    console.log(err);
});

async function work(path, secondPdfPage) {

    const mainPDF = await PDFDocument.load(fs.readFileSync(`./pdf/${path}`));
    const firstPart = await PDFDocument.create();
    const secondPart = await PDFDocument.create();
    const copiedPages = await firstPart.copyPages(mainPDF, mainPDF.getPageIndices());
    for (let i = 0; i < secondPdfPage; i++) {
        firstPart.addPage(copiedPages[i]);
    }
    
    copiedPages2 = await secondPart.copyPages(mainPDF, mainPDF.getPageIndices());
    for(let i = secondPdfPage; i < mainPDF.getPages().length; i++) {
        secondPart.addPage(copiedPages2[i]);
    }

    fs.writeFileSync('./result/firstPart.pdf', await firstPart.save());
    fs.writeFileSync('./result/secondPart.pdf', await secondPart.save());
}

module.exports = {split};
    