var assert = require("assert");
// const { PDFDocument } = require("pdf-lib");
// const fs = require("fs");
// const { checkFolder } = require("./checkFolder");
// const { mergeUniform } = require("../actions/merge/mergeUniform");
// const { testRange } = require("./testRange");

// const source = "./forTest/source/";
// const sourceSplit = source + "8.pdf";
// const names = "3.pdf,8.pdf";
// const result = "./forTest/result/";
// const resultMerge = result + "result.pdf";

// checkFolder("./forTest");
// checkFolder("./forTest/result");
// checkFolder("./forTest/source");

// describe("Merge", function () {
//   it("MergeUniform should merge 2 pdf files", async function () {
//     let expectedResult = 11;
//     mergeUniform(source, resultMerge, names.split(","));
//     const content = await PDFDocument.load(
//       fs.readFile(resultMerge, (err, data) => {})
//     );
//     let indices = content.getPageIndices();
//     let result = indices.length;
//     //fs.unlink(resultMerge);
//     assert.equal(result, expectedResult);
//   });
// });

describe("testRange", function () {
  it("Range = 1-3,4,6-8", function () {
    let expectedResult = true;
    let range = "1-3,4,6-8".split(",");
    range = range.map((elem) => elem.split(""));
    let result = testRange(range);
    assert.equal(result, expectedResult);
  });

  it("Range = 5-3", function () {
    let expectedResult = false;
    let range = "5-3".split(",");
    range = range.map((elem) => elem.split(""));
    let result = testRange(range);
    assert.notStrictEqual(result, expectedResult);
  });
});
