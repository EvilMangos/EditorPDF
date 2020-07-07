const fs = require("fs");

function isExist(source) {
  try {
    if (!fs.existsSync(source))
      throw new Error(`File ${source} does not exist`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
}

module.exports = {
  isExist,
};
