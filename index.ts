import fs from 'fs';

enum Direction {
    Down = 1,
    Up,
    Left,
    Right,
}

function readFile(fileName: string): number[][] {
    const allFileContents = fs.readFileSync(fileName, 'utf-8');
    let lines: string[] = allFileContents.split(/\r?\n/);

    let heights: number[][] = [];
    lines.forEach(line => {
        let height = line.split("").map(c => parseInt(c))
        console.log(height.map(n => n + "").join(""));
        heights.push(height);
    });

    return heights;
}

function getMaxViewingDistance(heights: number[][]): number {
    let maxRes = 0;

    for (let y = 0; y < heights.length; y++) {
        for (let x = 0; x < heights[y].length; x++) {
            var up = viewingDistance(heights, x, y, Direction.Up);
            var down = viewingDistance(heights, x, y, Direction.Down);
            var left = viewingDistance(heights, x, y, Direction.Left);
            var right = viewingDistance(heights, x, y, Direction.Right);

            var res = [up, down, left, right].filter(x => x > 0).reduce((acc, curr) => acc * curr, 1);

            maxRes = Math.max(res, maxRes);
        }
    }

    return maxRes;
}

function viewingDistance(heights: number[][], x: number, y: number, direction: Direction): number {
    let treeHutHeight = heights[y][x];
    let trees = getTreeRow(heights, x, y, direction); 
    return countVisibleTreesBetter(treeHutHeight, trees);;
}

function getTreeRow(heights: number[][], x: number, y: number, direction: Direction): number[] {
    let trees: number[] = [];
    
    let minX = 0;
    let maxX = heights[0].length - 1;
    let minY = 0;
    let maxY = heights.length - 1;

    let stepX = 0;
    let stepY = 0;

    if (direction == Direction.Left) {
        stepX = -1;
    } else if (direction == Direction.Right) {
        stepX = 1;
    } else if (direction == Direction.Down) {
        stepY = 1;
    } else {
        stepY = -1
    }

    let [nextX, nextY] = [x + stepX, y + stepY];

    while (nextX >= minX && nextX <= maxX && nextY >= minY && nextY <= maxY) {
        trees.push(heights[nextY][nextX]);
        
        [nextX, nextY] = [nextX + stepX, nextY + stepY]
    }

    return trees;
}

function countVisibleTreesBetter(treeHutHeight: number, trees: number[]): number {
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

let heights = readFile('Input.txt');
let maxView = getMaxViewingDistance(heights);

console.log(maxView); // 8736 too low