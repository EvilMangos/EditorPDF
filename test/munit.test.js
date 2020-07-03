var assert = require("assert");
var should = require("should");
var supertest = require("supertest");
const { checkFolder } = require("./checkFolder");
const { mergeUniform } = require("../actions/merge/mergeUniform");

const source = "./forTest/source/";
const sourceSplit = source + "8.pdf";
const names = "3.pdf,4.pdf";
const result = "./forTest/result/";
const resultMerge = result + "result.pdf";

checkFolder("./forTest");
checkFolder("./forTest/result");
checkFolder("./forTest/source");

describe("Merge", function () {
  it("should merge 2 pdf files", async function (done) {
    done();
    let expectedResult = 11;
    mergeUniform(source, result, "names");
    const content = await PDFDocument.load(fs.readFile(`${resultMerge}`));
    let indices = createPageIndices(range[i], content);
    let result = indices.length;
    fs.unlink(resultMerge);
    assert.equal(result, expectedResult);
  });
});
