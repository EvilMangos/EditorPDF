const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
let checkFolder = (path, name) => {
  fs.stat(path, async function (err) {
    if (err && err.code == "ENOENT") {
      await fs.mkdirSync(name);
    }
  });
};

module.exports = { checkFolder };
