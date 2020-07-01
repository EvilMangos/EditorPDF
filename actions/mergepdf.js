try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { checkFolder } = require("../test/checkFolder");
  //const { checkAllFolders } = require("../test/checkAllFolders");

  let merge = (source, out, ...filesNames) => {
    //checkFolder(out);
    work(source, out, ...filesNames).catch((err) => {
      console.log(err);
    });
  };

  async function work(source, out, ...filesNames) {
    const doc = await PDFDocument.create();

    for (let name of filesNames) {
      try {
        if (!fs.existsSync(`${source}${name}`))
          throw new Error(`File ${name} does not exist`);
      } catch (err) {
        console.log(err);
        process.exit(-1);
      }
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

  module.exports = { merge };
} catch (err) {
  console.log(err);
  process.exit(-1);
}
