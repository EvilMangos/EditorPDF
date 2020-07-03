const { mergeUniform } = require("./actions/merge/mergeUniform");
const { splitNumber } = require("./actions/split/splitNumber");
const { splitN } = require("./actions/split/splitN");
const yargs = require("yargs");
const { showHelp } = require("yargs");
const { mergeUneven } = require("./actions/merge/mergeUneven");
const { splitRange } = require("./actions/split/splitRange");

function inOut(describe) {
  return {
    describe: describe,
    demandOption: true,
    type: "string",
  };
}
const describeSource = `set pdf files source`;
const describeOut = `set result folder`;

yargs.command({
  command: "merge",
  describe: `--source="[path]" --out="[path]" --file="[name1,name2,...,nameN]" 
  -Merge some pdf files --source="[path]" --out="[path]" --file="[name1,name2,...,nameN]" --range="[number1]-[number2],[number3],..." -Merge some pdf files with different count of pages`,
  builder: {
    file: {
      describe: "PDF file",
      demandOption: true,
      type: "string",
    },
    range: {
      describe: "How much pages in 1 file",
      demandOption: false,
      type: "string",
    },
    out: inOut(describeOut),
    source: inOut(describeSource),
  },
  handler: (argv) => {
    if (argv.range) {
      mergeUneven(
        argv.source,
        argv.out,
        argv.file.split(","),
        argv.range.split(",")
      );
    } else {
      mergeUniform(argv.source, argv.out, argv.file.split(","));
    }
  },
});

yargs.command({
  command: "split",
  describe: `--source="[path]" --out="[path]" --number=[number] -Split a pdf file to 2 part
  --source="[path]" --out="[path]" --n=[number] -Split a pdf file with n pages in a file
  --source="[path]" --out="[path]" --range="[number1]-[number2],[number3],..." -Split a pad file by the range`,
  builder: {
    number: {
      describe: "First page of the second part after split",
      demandOption: false,
      type: "number",
    },
    n: {
      describe: "How much pages in 1 file",
      demandOption: false,
      type: "number",
    },
    range: {
      describe: "How to split a file",
      demandOption: false,
      type: "string",
    },
    out: inOut(describeOut),
    source: inOut(describeSource),
  },
  handler: (argv) => {
    try {
      if (argv.range) {
        splitRange(argv.source, argv.out, argv.range.split(","));
      } else if (argv.n) {
        splitN(argv.source, argv.out, argv.n);
      } else if (argv.number) {
        splitNumber(argv.source, argv.out, argv.number);
      } else throw new Error("Invalid parameters");
    } catch (err) {
      console.log(err);
    }
  },
});

var argv = require("yargs").option("?", {
  describe: "Show help",
  type: "boolean",
}).argv;

var argv = require("yargs").argv;
if (argv._[0] == "?" || !argv._[0]) showHelp();

//mergeUniform("C:/PDF/", "./result/result.pdf", "3.pdf,4.pdf".split(","));
