// const { PDFDocument } = require('pdf-lib');
// const fs = require('fs');
const { merge } = require("./actions/mergepdf");
const { split } = require("./actions/split");
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
  describe:
    '--source="[path]" --out="[path]" --number=[number] -Split a pdf file',
  builder: {
    number: {
      describe: "First page of the second part after split",
      demandOption: true,
      type: "number",
    },
    out: inOut(describeOut),
    source: inOut(describeSource),
  },
  handler: (argv) => {
    checkFolder(argv.out.slice(0, -1));
    split(argv.source, argv.out, argv.number);
  },
});

var argv = require("yargs").option("?", {
  describe: "Show help",
  type: "boolean",
}).argv;

var argv = require("yargs").argv;
if (argv._[0] == "?" || !argv._[0]) showHelp();

yargs.parse();
