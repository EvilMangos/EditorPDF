var assert = require("assert");
const { getRange } = require("../utility/getRange");

describe("getRange", function () {
  it("Range = 1-3,4,6-8 should return true", function () {
    let expectedResult = JSON.stringify([[0, 1, 2], [3], [5, 6, 7]]);
    let range = "1-3,4,6-8";
    let result = JSON.stringify(getRange(range));
    assert.equal(result, expectedResult);
  });

  it("Range = 5-3 should return false", function () {
    let expectedResult = JSON.stringify([[5, 6, 8]]);
    let range = "5-3";
    let result = JSON.stringify(getRange(range));
    assert.equal(result, expectedResult);
  });
});
