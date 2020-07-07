try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");
  const { isExist } = require("../../utility/isExist");

  let mergeUneven = (source, out, filesNames, range) => {
    work(source, out, filesNames, range).catch((err) => {
      console.log(err);
      process.exit(-1);
    });
  };

  async function work(source, out, filesNames, range) {
    const doc = await PDFDocument.create();
    for (let name of filesNames) {
      isExist(`${source}${name}`);
    }
    range = range.map((value) => value.split("-"));
    const pdf = await PDFDocument.create();
    for (let i = 0; i < filesNames.length; i++) {
      if (filesNames[i] === undefined) break;
      const content = await PDFDocument.load(
        fs.readFileSync(`${source}${filesNames[i]}`)
      );
      let indices = createPageIndices(range[i], content);
      const pages = await pdf.copyPages(content, indices);
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

  function createPageIndices(elem, source) {
    let indices = source.getPageIndices();
    if (elem.length == 1) return [indices[+elem - 1]];

    return indices.slice(elem[0] - 1, elem[1]);
  }
} catch (err) {
  console.log(err);
  process.exit(-1);
}
