try {
  function getRange(rangeStr) {
    "";
    let range = rangeStr.split(",");
    range = range.map((value) => value.split("-"));
    range.forEach(function (element) {
      if (!isFinite(element[0]) || (element[1] && !isFinite(element[1])))
        throw new Error("Invalid range value");
    });

    range = range.map(function (value) {
      let from = Math.min(...value) - 1,
        to = Math.max(...value) - 1;
      for (let i = 0; from <= to; i++, from++) {
        value[i] = from;
      }
      return value;
    });
    return range;
  }

  module.exports = { getRange };
} catch (err) {
  console.log(err);
  process.exit();
}
