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
  let lines = allFileContents.split(/\r?\n/);
  let heights2 = [];
  lines.forEach((line) => {
    let height = line.split("").map((c) => parseInt(c));
    console.log(height.map((n) => n + "").join(""));
    heights2.push(height);
  });
  return heights2;
}
function getMaxViewingDistance(heights2) {
  let maxRes = 0;
  for (let y = 0; y < heights2.length; y++) {
    for (let x = 0; x < heights2[y].length; x++) {
      var up = viewingDistance(heights2, x, y, 2);
      var down = viewingDistance(heights2, x, y, 1);
      var left = viewingDistance(heights2, x, y, 3);
      var right = viewingDistance(heights2, x, y, 4);
      var res = [up, down, left, right].filter((x2) => x2 > 0).reduce((acc, curr) => acc * curr, 1);
      maxRes = Math.max(res, maxRes);
    }
  }
  return maxRes;
}
function viewingDistance(heights2, x, y, direction) {
  let treeHutHeight = heights2[y][x];
  let trees = getTreeRow(heights2, x, y, direction);
  return countVisibleTreesBetter(treeHutHeight, trees);
  ;
}
function getTreeRow(heights2, x, y, direction) {
  let trees = [];
  let minX = 0;
  let maxX = heights2[0].length - 1;
  let minY = 0;
  let maxY = heights2.length - 1;
  let stepX = 0;
  let stepY = 0;
  if (direction == 3) {
    stepX = -1;
  } else if (direction == 4) {
    stepX = 1;
  } else if (direction == 1) {
    stepY = 1;
  } else {
    stepY = -1;
  }
  let [nextX, nextY] = [x + stepX, y + stepY];
  while (nextX >= minX && nextX <= maxX && nextY >= minY && nextY <= maxY) {
    trees.push(heights2[nextY][nextX]);
    [nextX, nextY] = [nextX + stepX, nextY + stepY];
  }
  return trees;
}
function countVisibleTreesBetter(treeHutHeight, trees) {
  let visible = 0;
  for (let i = 0; i < trees.length; i++) {
    let tree = trees[i];
    visible++;
    if (tree >= treeHutHeight) {
      return visible;
    }
  }
  return visible;
}
let heights = readFile("Input.txt");
let maxView = getMaxViewingDistance(heights);
console.log(maxView);
//# sourceMappingURL=index.js.map
