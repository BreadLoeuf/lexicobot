import * as fs from 'fs';
// FILE FUNCTIONS

// Read a file:
export function readFile(filename: string): string {
    const content: string = fs.readFileSync(filename, 'utf-8');
//    const lines: string[] = content.split(/\r?\n/);

    return content;
}

// Clear a file: clears a text file
export function clearFile(filename: string): void {
    return fs.writeFileSync(filename, "", 'utf-8');
}

export function isFileEmpty(fileName: string, ignoreWhitespace=true): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if( err ) {
                reject(err);
                return;
            }

            resolve((!ignoreWhitespace && data.length == 0) || (ignoreWhitespace && !!String(data).match(/^\s*$/)))
        });
    })
}
