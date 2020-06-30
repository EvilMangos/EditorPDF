// const { PDFDocument } = require('pdf-lib');
// const fs = require('fs');
const { merge } = require("./actions/mergepdf");
const { split } = require("./actions/split");
const yargs = require("yargs");
const { showHelp } = require("yargs");

yargs.command({
  command: "merge",
  describe: '--file="[name1,name2,...,nameN]" -Merge some pdf files',
  builder: {
    file: {
      describe: "PDF file",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => merge(...argv.file.split(",")),
});

yargs.command({
  command: "split",
  describe: '--file="[name]" --number=[number] -Split a pdf file',
  builder: {
    file: {
      describe: "PDF file",
      demandOption: true,
      type: "string",
    },
    number: {
      describe: "First page of the second part after split",
      demandOption: true,
      type: "number",
    },
  },
  handler: (argv) => split(argv.file, argv.number),
});

var argv = require("yargs").option("?", {
  describe: "Show help",
  type: "boolean",
}).argv;

var argv = require("yargs").argv;
if (argv._[0] == "?" || !argv._[0]) showHelp();

yargs.parse();
