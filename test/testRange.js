let testRange = function (range) {
  try {
    if (!Array.isArray(range)) throw new Error("Invalid range value");
    range.forEach((element) => {
      if (element.length === 3) {
        if (
          !isFinite(+element[0]) ||
          !isFinite(+element[2]) ||
          element[1] !== "-" ||
          +element[0] > +element[2]
        ) {
          throw new Error("Invalid range value");
        } else {
          return false;
        }
      } else {
        if (!+isFinite(element)) throw new Error("Invalid range value");
        else return false;
      }
    });
    return true;
  } catch (err) {
    return false;
    console.log(err);
    process.exit(-1);
  }
};

module.exports = { testRange };
