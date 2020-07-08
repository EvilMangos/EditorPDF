try {
  const { getRange } = require("../../utility/getRange");
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../utility/isExist");

  let mergeUneven = (source, out, filesNames, range) => {
    work(source, out, filesNames, range).catch((err) => {
      console.log(err);
      process.exit();
    });
  };

  async function work(source, out, filesNames, range) {
    for (let name of filesNames) {
      isExist(`${source}${name}`);
    }
    range = getRange(range);
    const pdf = await PDFDocument.create();
    for (let i = 0; i < filesNames.length; i++) {
      if (filesNames[i] === undefined) break;
      const content = await PDFDocument.load(
        fs.readFileSync(`${source}${filesNames[i]}`)
      );
      const pages = await pdf.copyPages(content, range[i]);
      for (const page of pages) pdf.addPage(page);
    }
    fs.writeFile(out, await pdf.save(), function (err) {
      if (err) throw err;
    });
    console.log(`saved ${out}`);
  }

  module.exports = {
    mergeUneven,
  };
} catch (err) {
  // console.log(err);
  process.exit();
}
