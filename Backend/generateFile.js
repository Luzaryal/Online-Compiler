const fs = require("fs");
const path = require("path");
const {v4: uuid} = require("uuid");

const dirCodes = path.join(__dirname, "codes"); // D:\AlgoUOC\Backend\codes

if(!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (language, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, filename);  // D:\AlgoUOC\Backend\codes\filename
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = {
    generateFile,
};
