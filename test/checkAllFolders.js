const { checkFolder } = require("./checkFolder");

let checkAllFolders = () => {
  checkFolder("C:/EditorPDF");
  checkFolder("C:/EditorPDF/Result");
  checkFolder("C:/EditorPDF/PDF");
};

module.exports = {
  checkAllFolders,
};
