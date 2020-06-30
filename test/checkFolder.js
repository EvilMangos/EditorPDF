const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
let checkFolder = () => {
  let checkFolder = (path) => {
    fs.stat(path, async function (err) {
      try {
        if (err) await fs.mkdirSync(path);
      } catch (err) {}
    });
  };
};

module.exports = { checkFolder };
