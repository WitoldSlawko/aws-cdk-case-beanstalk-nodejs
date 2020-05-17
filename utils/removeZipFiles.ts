import * as fs from 'fs';
import * as path from 'path';

fs.readdirSync(path.join(__dirname, './../')).forEach(file => {
    if (file.indexOf('.zip') !== -1) {
        fs.unlinkSync(path.join(__dirname, './../', file));
    }
});
