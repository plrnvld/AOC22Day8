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
  Direction2[Direction2["Up"] = 1] = "Up";
  Direction2[Direction2["Down"] = 2] = "Down";
  Direction2[Direction2["Left"] = 3] = "Left";
  Direction2[Direction2["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
class TreeVisibilityCounter {
  treeVisibility;
  direction;
  constructor(direction, length) {
    this.direction = direction;
    this.treeVisibility = new Array(length);
    for (let i = 0; i < length; i++) {
      this.treeVisibility[i] = [];
    }
  }
  countLines() {
    console.log(this.treeVisibility.length);
  }
}
function readFile(fileName) {
  const allFileContents = import_fs.default.readFileSync(fileName, "utf-8");
  var lines2 = allFileContents.split(/\r?\n/);
  lines2.forEach((line) => {
    console.log(`Line from file: ${line}`);
  });
  return lines2;
}
var lines = readFile("Input.txt");
console.log(lines.length);
var tvc = new TreeVisibilityCounter(2, lines.length);
tvc.countLines();
//# sourceMappingURL=index.js.map
