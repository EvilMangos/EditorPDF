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
  });

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
  });

  var argv = require('yargs').argv;
  if(argv._[0] == '?') showHelp();

  yargs.parse();