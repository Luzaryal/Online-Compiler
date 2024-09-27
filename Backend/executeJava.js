const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const executeJava = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];  // This is the base name of the Java file without extension
  const outPath = path.join(outputPath, jobId);  // Output path for .class files

  return new Promise((resolve, reject) => {
    // Compile Java file using javac
    exec(
      `javac ${filepath} -d ${outputPath} && cd ${outputPath} && java ${jobId}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeJava,
};
