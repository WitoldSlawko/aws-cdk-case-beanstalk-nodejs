import * as fs from 'fs';
import * as path from 'path';

const directoryPath = path.join(__dirname, './../');

export default () => {

    return fs.readdirSync(directoryPath).find((file: string) => {
        return file.indexOf('.zip') !== -1;
    });

}