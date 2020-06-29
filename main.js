const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const {merge} = require('./actions/mergepdf');
const {split} = require('./actions/split');

//split("5.pdf", 4);