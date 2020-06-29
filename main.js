const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const {merge} = require('./actions/mergepdf');

merge("1.pdf", "2.pdf");