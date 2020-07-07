var assert = require("assert");

describe("testRange", function () {
  it("Range = 1-3,4,6-8", function () {
    let expectedResult = true;
    let range = "1-3,4,6-8".split(",");
    range = range.map((elem) => elem.split("-"));
    let result = testRange(range);
    assert.equal(result, expectedResult);
  });

  it("Range = 5-3", function () {
    let expectedResult = false;
    let range = "5-3".split(",");
    range = range.map((elem) => elem.split("-"));
    let result = testRange(range);
    assert.notStrictEqual(result, expectedResult);
  });
});
