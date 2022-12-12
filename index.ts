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

function readFile(fileName: string): int[][] {
    const allFileContents = fs.readFileSync(fileName, 'utf-8');
    var lines: string[] = allFileContents.split(/\r?\n/);
    

    var heights: int[][] = [];
    lines.forEach(line => {
        var height = line.split().map(c => parseInt(c))
        heights.push(height);
    });

    return heights;
}

function getMaxViewingDistance(lines: int[][]): number {
    var maxViewingDistance = 0;

    for (let y = 0; y < lines.length; y++)
        for (let x = 0; x < lines[y].length; x++) {
            var up = viewingDistance(x, y, Direction.Up);
            var down = viewingDistance(x, y, Direction.Down);
            var left = viewingDistance(x, y, Direction.Left);
            var right = viewingDistance(x, y, Direction.Right);

            var res = up * down * left * right;

            if (res > maxViewingDistance)
                maxViewingDistance = res;
        }

    return maxViewingDistance;
}

function viewingDistance(heights: int[][], x: number, y: number, direction: Direction): number {
    var treeHutHeight = heights[y][x];

    var dist = 0;
    
    for (let i = 1; ;i++ ) {
        var [xNext, yNext] = getPos(x, y, direction, i);

        if (itStopsHere(heights, x, y, treeHutHeight))
    }
}

function itStopsHere(heights: int[][], x: number, y: number, treeHutHeight: number, currMaxHeight: number): TreeView {
    if (x < 0 || x >= heights[0].length || y < 0 || y >= heights.length)
        return TreeView.End;

    if (prevHeight >= treeHutHeight)
        return TreeView.End;

    var treeHeight = heights[y][x];
    if (treeHi)

        // #########################
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

console.log(maxView);

