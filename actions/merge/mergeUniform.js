try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../test/isExist");

  let mergeUniform = (source, out, ...filesNames) => {
    work(source, out, ...filesNames).catch((err) => {
      console.log(err);
      process.exit(-1);
    });
  };

  async function work(source, out, ...filesNames) {
    const doc = await PDFDocument.create();

    for (let name of filesNames) {
      isExist(`${source}${name}`);
      const content = await PDFDocument.load(
        fs.readFileSync(`${source}${name}`)
      );
      const contentPages = await doc.copyPages(
        content,
        content.getPageIndices()
      );
      for (const page of contentPages) {
        doc.addPage(page);
      }
    }
    fs.writeFileSync(`${out}result.pdf`, await doc.save());
    console.log(`saved ${out}result.pdf`);
  }

  module.exports = { mergeUniform };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
