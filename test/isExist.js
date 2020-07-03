const fs = require("fs");

function isExact(source) {
  try {
    if (!fs.existsSync(source)) throw new Error(`File ${name} does not exist`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
}

module.exports = {
  isExist,
};
