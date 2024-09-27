const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

const executePython = async (filepath) => {
  return new Promise((resolve, reject) => {
    // Execute Python file using python command (or python3 if that's your setup)
    exec(`python ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error); // Return error if there's an issue in execution
      }
      if (stderr) {
        reject(stderr); // Return stderr for runtime errors in the script
      }
      resolve(stdout); // Return the output of the Python script
    });
  });
};

module.exports = {
  executePython,
};
