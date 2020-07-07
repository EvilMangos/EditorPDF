function getRange(rangeStr) {
  let range = rangeStr.split(",");
  range = range.map((value) => value.split("-"));
  range = range.map(function (value) {
    let from = Math.min(...value),
      to = Math.max(...value);
    for (let i = 0; from <= to; i++, from++) {
      value[i] = from;
    }
    return value;
  });
  return value;
}

module.exports = { getRange };
