try {
  const { PDFDocument } = require("pdf-lib");
  const fs = require("fs");

  let merge = (...arg) =>
    work(...arg).catch((err) => {
      console.log(err);
    });

  async function work(...arg) {
    fs.stat("./result", function (err) {
      if (err && err.code == "ENOENT") {
        fs.mkdirSync("result");
      }
    });

    const doc = await PDFDocument.create();

    for (let path of arg) {
      try {
        if (!fs.existsSync(`./pdf/${path}`))
          throw new Error("File does not exist");
      } catch (err) {
        console.log(err.message);
        process.exit(-1);
      }
      const content = await PDFDocument.load(fs.readFileSync(`./pdf/${path}`));
      const contentPages = await doc.copyPages(
        content,
        content.getPageIndices()
      );
      for (const page of contentPages) {
        doc.addPage(page);
      }
    }
    fs.writeFileSync("./result/result.pdf", await doc.save());
  }

  module.exports = { merge };
} catch {
  console.log(err);
  process.exit(-1);
}
