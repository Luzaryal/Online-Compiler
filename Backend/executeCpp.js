const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");
const { error } = require("console");
const { stdout, stderr } = require("process");

const outputPath = path.join(__dirname, "outputs"); // D:\AlgoUOC\Backend\outputs

if(!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const executeCpp = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFilename = `${jobId}.exe`;
    const outPath = path.join(outputPath, outputFilename);  // D:\AlgoUOC\Backend\outputs\outputFilename

    return new Promise((resolve, reject) => {
        exec(
          `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename}`, 
          (error, stdout, stderr) => {
            if (error) {
              reject (error);
            }
            if (stderr) {
              reject (error);
            }
            resolve(stdout);
          }
        )
    })

};

module.exports = {
    executeCpp,
};
