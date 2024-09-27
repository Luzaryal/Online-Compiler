const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const executeGo = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];  // Get the base name of the Go file without extension
  const outPath = path.join(outputPath, jobId);  // Output path for the compiled Go executable

  return new Promise((resolve, reject) => {
    // Compile Go file using go build and execute the output binary
    exec(
      `go build -o ${outPath} ${filepath} && ${outPath}`, 
      (error, stdout, stderr) => {
        if (error) {
          reject(error);  // Compilation error or execution error
        }
        if (stderr) {
          reject(stderr);  // Runtime error (stderr)
        }
        resolve(stdout);  // Return the standard output (stdout)
      }
    );
  });
};

module.exports = {
  executeGo,
};
