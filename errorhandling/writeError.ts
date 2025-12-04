import fs from 'fs';
const errorlog = './errorlog.txt';
const httplog = './httperrors.txt';

export function writeError(err: string) {
    fs.appendFile(errorlog, err, (error) => {
        if(error) {
            console.error("Error appending to errorlog");
        } else {
            console.log("Error found and handled successfully.")
        }
    })
}

export function passToHTTPLog(err: string) {
    fs.appendFile(httplog, err, (error) => {
        if(error) {
            writeError(error.message);
        }
    })
}