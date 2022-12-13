import fs from 'fs';

enum Direction {
    Down = 1,
    Up,
    Left,
    Right,
}

enum TreeView {
    Visible = 1,
    Invisible,
    End
}

function readFile(fileName: string): number[][] {
    const allFileContents = fs.readFileSync(fileName, 'utf-8');
    var lines: string[] = allFileContents.split(/\r?\n/);
    

    var heights: number[][] = [];
    lines.forEach(line => {
        var height = line.split("").map(c => parseInt(c))
        console.log(height.map(n => n + "").join(""));
        heights.push(height);
    });

    return heights;
}

function getMaxViewingDistance(heights: number[][]): number {
    var maxViewingDistance = 0;

    for (let y = 0; y < heights.length; y++)
        for (let x = 0; x < heights[y].length; x++) {
            var up = viewingDistance(heights, x, y, Direction.Up);
            var down = viewingDistance(heights,x, y, Direction.Down);
            var left = viewingDistance(heights,x, y, Direction.Left);
            var right = viewingDistance(heights,x, y, Direction.Right);

            // if (x == 2 && y == 3)
            //     console.log(`Up: ${up}, Down: ${down}, Left: ${left}, Right: ${right}`);

            var res = Math.max(1, up) * Math.max(1, down) * Math.max(1, left) * Math.max(1, right);
            console.log(`Viewing for (${x},${y}) = ${res}, (${up} ${down} ${left} ${right})`)

            if (res > maxViewingDistance) {
                maxViewingDistance = res;                
            }
        }

    return maxViewingDistance;
}

function viewingDistance(heights: number[][], x: number, y: number, direction: Direction): number {
    var treeHutHeight = heights[y][x];
    var maxHeight = 0;

    var visible = 0;
    
    for (let i = 1; ;i++ ) {
        var [xNext, yNext] = getPos(x, y, direction, i);

        if (!isAccessible(heights, xNext, yNext))
            return visible;

        var nextTree = heights[yNext][xNext];
        if (canSee(heights, x, y, xNext, yNext)) {
            visible++;
            maxHeight = nextTree;
        }

        if (nextTree > treeHutHeight)
            return visible;
    }
}

function canSee(heights: number[][], xTree: number, yTree: number, x: number, y: number): boolean {
    var nums: number[] = [];

    var xStep = getStep(xTree, x);
    var yStep = getStep(yTree, y);
    var numSteps = Math.abs(xTree - x) + Math.abs(yTree - y);
    
    for (let i = 1; i <= numSteps; i++) {
        var tree = heights[yTree + yStep*i][xTree + xStep*i];
        nums.push(tree);        
    }

    return canSeeNums(nums);
}

function getStep(from: number, to: number): number {
    if (from == to) {
        return 0;
    } else if (from < to ) {
        return 1;
    } else {
        return -1;
    }
}

function canSeeNums(nums: number[]): boolean {
    if (nums.length == 1)
        return true;

    return false; // ################ Continue here, something with the angle to the top?
}

function isAccessible(heights: number[][], x: number, y: number): boolean {
    return x >= 0 && x < heights[0].length && y >= 0 && y < heights.length;
} 

function getPos(x: number, y:number, direction: Direction, step: number): [number, number] {
    if (direction == Direction.Right) {
        return [x + step, y];
    } else if (direction == Direction.Left) {
        return [x - step, y];
    } else if (direction == Direction.Up) {
        return [x, y - step]; 
    } else { // Down
        return [x, y + step];         
    }
}

var heights = readFile('Example.txt');
var maxView = getMaxViewingDistance(heights);

console.log(maxView); // 8736 too low

