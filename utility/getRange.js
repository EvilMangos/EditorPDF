function getRange(rangeStr) {
  let range = rangeStr.split(",");
  range = range.map((value) => value.split("-"));
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
