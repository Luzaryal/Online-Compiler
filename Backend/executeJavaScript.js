const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const executeJavaScript = async (filepath) => {
  return new Promise((resolve, reject) => {
    // Execute JavaScript file using Node.js
    exec(`node ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error); // Return error if there's an issue in execution
      }
      if (stderr) {
        reject(stderr); // Return stderr for runtime errors in the script
      }
      resolve(stdout); // Return the output of the JS script
    });
  });
};

module.exports = {
  executeJavaScript,
};
