var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_fs = __toModule(require("fs"));
var Direction;
(function(Direction2) {
  Direction2[Direction2["Down"] = 1] = "Down";
  Direction2[Direction2["Up"] = 2] = "Up";
  Direction2[Direction2["Left"] = 3] = "Left";
  Direction2[Direction2["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
function readFile(fileName) {
  const allFileContents = import_fs.default.readFileSync(fileName, "utf-8");
  var lines = allFileContents.split(/\r?\n/);
  var heights2 = [];
  lines.forEach((line) => {
    var height = line.split().map((c) => parseInt(c));
    heights2.push(height);
  });
  return heights2;
}
function getMaxViewingDistance(lines) {
  var maxViewingDistance = 0;
  for (let y = 0; y < lines.length; y++)
    for (let x = 0; x < lines[y].length; x++) {
      var up = viewingDistance(x, y, 2);
      var down = viewingDistance(x, y, 1);
      var left = viewingDistance(x, y, 3);
      var right = viewingDistance(x, y, 4);
      var res = up * down * left * right;
      if (res > maxViewingDistance)
        maxViewingDistance = res;
    }
  return maxViewingDistance;
}
function viewingDistance(x, y, direction) {
  return 1;
}
var heights = readFile("Example.txt");
var maxView = getMaxViewingDistance(heights);
console.log(maxView);
//# sourceMappingURL=index.js.map
