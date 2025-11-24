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