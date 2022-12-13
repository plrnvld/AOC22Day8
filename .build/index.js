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
var TreeView;
(function(TreeView2) {
  TreeView2[TreeView2["Visible"] = 1] = "Visible";
  TreeView2[TreeView2["Invisible"] = 2] = "Invisible";
  TreeView2[TreeView2["End"] = 3] = "End";
})(TreeView || (TreeView = {}));
function readFile(fileName) {
  const allFileContents = import_fs.default.readFileSync(fileName, "utf-8");
  var lines = allFileContents.split(/\r?\n/);
  var heights2 = [];
  lines.forEach((line) => {
    var height = line.split("").map((c) => parseInt(c));
    console.log(height.map((n) => n + "").join(""));
    heights2.push(height);
  });
  return heights2;
}
function getMaxViewingDistance(heights2) {
  var maxViewingDistance = 0;
  for (let y = 0; y < heights2.length; y++)
    for (let x = 0; x < heights2[y].length; x++) {
      var up = viewingDistance(heights2, x, y, 2);
      var down = viewingDistance(heights2, x, y, 1);
      var left = viewingDistance(heights2, x, y, 3);
      var right = viewingDistance(heights2, x, y, 4);
      var res = Math.max(1, up) * Math.max(1, down) * Math.max(1, left) * Math.max(1, right);
      console.log(`Viewing for (${x},${y}) = ${res}, (${up} ${down} ${left} ${right})`);
      if (res > maxViewingDistance) {
        maxViewingDistance = res;
      }
    }
  return maxViewingDistance;
}
function viewingDistance(heights2, x, y, direction) {
  var treeHutHeight = heights2[y][x];
  var maxHeight = 0;
  var visible = 0;
  for (let i = 1; ; i++) {
    var [xNext, yNext] = getPos(x, y, direction, i);
    if (!isAccessible(heights2, xNext, yNext))
      return visible;
    var nextTree = heights2[yNext][xNext];
    if (canSee(heights2, x, y, xNext, yNext)) {
      visible++;
      maxHeight = nextTree;
    }
    if (nextTree > treeHutHeight)
      return visible;
  }
}
function canSee(heights2, xTree, yTree, x, y) {
  var nums = [];
  var xStep = getStep(xTree, x);
  var yStep = getStep(yTree, y);
  var numSteps = Math.abs(xTree - x) + Math.abs(yTree - y);
  for (let i = 1; i <= numSteps; i++) {
    var tree = heights2[yTree + yStep * i][xTree + xStep * i];
    nums.push(tree);
  }
  return canSeeNums(nums);
}
function getStep(from, to) {
  if (from == to) {
    return 0;
  } else if (from < to) {
    return 1;
  } else {
    return -1;
  }
}
function canSeeNums(nums) {
  if (nums.length == 1)
    return true;
  return false;
}
function isAccessible(heights2, x, y) {
  return x >= 0 && x < heights2[0].length && y >= 0 && y < heights2.length;
}
function getPos(x, y, direction, step) {
  if (direction == 4) {
    return [x + step, y];
  } else if (direction == 3) {
    return [x - step, y];
  } else if (direction == 2) {
    return [x, y - step];
  } else {
    return [x, y + step];
  }
}
var heights = readFile("Example.txt");
var maxView = getMaxViewingDistance(heights);
console.log(maxView);
//# sourceMappingURL=index.js.map
