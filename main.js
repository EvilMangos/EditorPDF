// const { PDFDocument } = require('pdf-lib');
// const fs = require('fs');
const {merge} = require('./actions/mergepdf');
const {split} = require('./actions/split');
const yargs = require('yargs') 

yargs.command({
    command: 'merge',
    describe: 'Merge some pdf files',
    builder: {
      file: {
        describe: 'PDF file',
        demandOption: true,
        type: "string"
      }
    },
    handler: (argv) => merge(...argv.file.split(','))
  })

    yargs.command({
    command: 'split',
    describe: 'Split a pdf file',
    builder: {
      file: {
        describe: 'PDF file',
        demandOption: true,
        type: "string"
      },
      number: {
        describe: 'First page of the second part after split',
        demandOption: true,
        type: "number"
      }
    },
    handler: (argv) => split(argv.file, argv.number)
  })

  yargs.parse()