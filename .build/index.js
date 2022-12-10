const fs = require("fs");
const allFileContents = fs.readFileSync("Input.txt", "utf-8");
allFileContents.split(/\r?\n/).forEach((line) => {
  console.log(`Line from file: ${line}`);
});
//# sourceMappingURL=index.js.map
