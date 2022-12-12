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
  maxLength;
  constructor(direction, lines2) {
    this.direction = direction;
    this.maxLength = lines2.length;
    this.treeVisibility = new Array(this.maxLength);
    for (let i = 0; i < this.maxLength; i++) {
      this.treeVisibility[i] = [];
    }
    this.addVisibities(lines2);
  }
  countLines() {
    console.log(this.treeVisibility.length);
  }
  containsTree(x, y) {
    if (this.checkHorizontal())
      return this.treeVisibility[x].includes(y);
    return this.treeVisibility[y].includes(x);
  }
  addTree(x, y) {
    var index = this.checkHorizontal() ? y : x;
    var item = this.checkHorizontal() ? x : y;
    var positions = this.treeVisibility[index];
    if (!positions.includes(item))
      positions.push(item);
  }
  addVisibities(lines2) {
    for (let i = 0; i < this.maxLength; i++) {
      this.addVisibility(i, lines2);
    }
  }
  addVisibility(index, lines2) {
    var maxHeight = -1;
    for (let i = 0; i < this.maxLength; i++) {
      var [x, y] = this.getXY(index, i);
      var treeHeight = parseInt(lines2[y][x]);
      if (treeHeight > maxHeight) {
        this.addTree(x, y);
        maxHeight = treeHeight;
        if (maxHeight == 9)
          return;
      }
    }
  }
  getXY(index, step) {
    if (this.direction == 3) {
      return [step, index];
    } else if (this.direction == 4) {
      return [this.maxLength - 1 - step, index];
    } else if (this.direction == 1) {
      return [index, step];
    } else {
      return [index, this.maxLength - 1 - step];
    }
  }
  checkVertical() {
    return this.direction == 1 || this.direction == 2;
  }
  checkHorizontal() {
    return !this.checkVertical();
  }
  countTrees(notIn) {
    var count = 0;
    for (let index = 0; index < this.maxLength; index++) {
      for (let j = 0; j < this.treeVisibility[index].length; j++) {
        var subCoord = this.treeVisibility[index][j];
        var [x, y] = this.checkHorizontal() ? [subCoord, index] : [index, subCoord];
        if (!notIn.some((tvc) => tvc.containsTree(x, y))) {
          count++;
        }
      }
    }
    return count;
  }
  printDict() {
    for (let index = 0; index < this.maxLength; index++) {
      console.log("Index = " + index);
      for (let j = 0; j < this.treeVisibility[index].length; j++) {
        var treeOffset = this.treeVisibility[index][j];
        var pos = this.getXY(index, treeOffset);
        var x = pos[0];
        var y = pos[1];
        console.log(`  (${x},${y})`);
      }
    }
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
var lines = readFile("Example.txt");
var down = new TreeVisibilityCounter(2, lines);
var up = new TreeVisibilityCounter(1, lines);
var left = new TreeVisibilityCounter(3, lines);
var right = new TreeVisibilityCounter(4, lines);
console.log("UP SINGLE: " + up.countTrees([]));
up.printDict();
console.log("DOWN SINGLE: " + down.countTrees([]));
console.log("LEFT SINGLE: " + left.countTrees([]));
console.log("RIGHT SINGLE: " + right.countTrees([]));
var countDown = down.countTrees([]);
var countUp = up.countTrees([down]);
var countLeft = left.countTrees([down, up]);
var countRight = right.countTrees([down, up, left]);
console.log(countDown + countUp + countLeft + countRight);
//# sourceMappingURL=index.js.map
