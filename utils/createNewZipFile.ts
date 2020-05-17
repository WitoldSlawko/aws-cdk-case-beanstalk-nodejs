import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

const output = fs.createWriteStream(`./archive-app_${(new Date()).toLocaleString().replace(/\//g,'-').replace(/ /g, '').replace(/,/g, '_')}.zip`);

var archive = archiver('zip', {
    gzip: true,
    zlib: { level: 9 } // Sets the compression level.
});

const directoryPath = path.join(__dirname, './../', 'app');

let filesToZip: string[] = [];

fs.readdirSync(directoryPath).forEach((file: string) => {
    filesToZip.push(file);
});

archive.on('error', (err: Error) => {
  throw err;
});

// pipe archive data to the output file
archive.pipe(output);

// append files

filesToZip.forEach(file => {
    archive.file(path.join(directoryPath, file), {name: file});
});

archive.finalize();