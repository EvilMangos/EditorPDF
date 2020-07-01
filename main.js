// const { PDFDocument } = require('pdf-lib');
// const fs = require('fs');
const { merge } = require("./actions/mergepdf");
const { splitNumber } = require("./actions/split/splitNumber");
const { splitN } = require("./actions/split/splitN");
const yargs = require("yargs");
const { showHelp } = require("yargs");
const { checkFolder } = require("./test/checkFolder");

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
  describe:
    '--source="[path]" --out="[path]" --file="[name1,name2,...,nameN]" -Merge some pdf files',
  builder: {
    file: {
      describe: "PDF file",
      demandOption: true,
      type: "string",
    },
    out: inOut(describeOut),
    source: inOut(describeSource),
  },
  handler: (argv) => {
    checkFolder(argv.out),
      merge(argv.source, argv.out, ...argv.file.split(","));
  },
});

yargs.command({
  command: "split",
  describe: `--source="[path]" --out="[path]" --number=[number] -Split a pdf file to 2 part
  --source="[path]" --out="[path]" --n=[number] -Split a pdf file with n pages in a file`,
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
    out: inOut(describeOut),
    source: inOut(describeSource),
  },
  handler: (argv) => {
    try {
      checkFolder(argv.out.slice(0, -1));
      if (argv.n) {
        splitN(argv.source, argv.out, argv.n);
      } else if (argv.number) {
        splitNumber(argv.source, argv.out, argv.number);
      } else throw new Error("Need more parameters");
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

yargs.parse();

//splitN("C:/PDF/3.pdf", "./result/", 3);
