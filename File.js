
const fs = require('fs');
const path = require('path');

const readFile = (pathName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, pathName);
        fs.readFile(filePath, 'utf8', (err, text) => {
            if (err) {
                reject(err);
            }
            resolve(text);
        })
    })
}

const writeFile = (pathName, txt) => {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, pathName);
        fs.writeFile(filePath, txt, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        })
    })
}

const accessFile = (pathName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, pathName);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        })
    })
}

const readDir = (pathName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.resolve(__dirname, pathName);
        fs.readdir(filePath, (err, files) => {
            if (err) {
                reject(err)
            }
            resolve(files);
        })
    })
}

module.exports = {
    readFile,
    writeFile,
    accessFile,
    readDir
}
