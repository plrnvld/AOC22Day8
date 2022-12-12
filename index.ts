import fs from 'fs';

enum Direction {
    Down = 1,
    Up,
    Left,
    Right,
}

class TreeVisibilityCounter {
    treeVisibility: number[][];
    direction: Direction;
    maxLength: number;

    constructor(direction: Direction, lines: string[]) {
        this.direction = direction;
        this.maxLength = lines.length;
        this.treeVisibility = new Array(this.maxLength);
        for (let i = 0; i < this.maxLength; i++) {
            this.treeVisibility[i] = [];
        }

        this.addVisibities(lines);
    }

    countLines() {
        console.log(this.treeVisibility.length);
    }

    containsTree(x: number, y: number) {
        if (this.checkVertical())
            return this.treeVisibility[x].includes(y);

        return this.treeVisibility[y].includes(x);
    }

    addTree(x: number, y: number) {        
        var index = this.checkVertical() ? x : y;
        var item = this.checkVertical() ? y : x;

        var positions = this.treeVisibility[index];
        if (!positions.includes(item))
            positions.push(item); 
    }

    addVisibities(lines: string[]) {
        for (let i = 0; i < this.maxLength; i++) {
            this.addVisibility(i, lines);
        }
    }

    addVisibility(index: number, lines: string[]) {
        var maxHeight = -1;

        for (let i = 0; i < this.maxLength; i++) {
            var [x, y] = this.getXY(index, i);
            var treeHeight = parseInt(lines[y][x]);

            if (treeHeight > maxHeight) {
                this.addTree(x, y);

                maxHeight = treeHeight;

                if (maxHeight == 9)
                    return;
            }        
        }
    }

    getXY(index: number, step: number): [number, number] {
        if (this.direction == Direction.Left) {
            return [step, index];
        } else if (this.direction == Direction.Right) {
            return [this.maxLength - 1 - step, index];
        } else if (this.direction == Direction.Up) {
            return [index, step];
        } else { // Down
            return [index, this.maxLength - 1 - step];
        }
    }

    checkVertical(): boolean {
        return this.direction == Direction.Up || this.direction == Direction.Down;
    }

    checkHorizontal(): boolean {
        return !this.checkVertical();
    }

    countTrees(notIn: TreeVisibilityCounter[]) {
        var count = 0;

        for (let index = 0; index < this.maxLength; index++) {
            for (let j = 0; j < this.treeVisibility[index].length; j++) {
                var offset = this.treeVisibility[index][j];

                var [x, y] = this.checkVertical() ? [index, offset] : [offset, index];
                
                if (!notIn.some(tvc => tvc.containsTree(x, y))) {
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
                
                if (this.checkVertical())
                    console.log(`  (${index},${treeOffset})`);
                else
                    console.log(`  (${treeOffset},${index})`);
            }
        }
    }
}

function readFile(fileName: string): string[] {
    const allFileContents = fs.readFileSync(fileName, 'utf-8');
    var lines: [string] = allFileContents.split(/\r?\n/);
    lines.forEach(line => {
        console.log(`Line from file: ${line}`);
    });

    return lines;
}

function getMaxViewingDistance(lines: string[]): number {
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

function viewingDistance(x: number, y: number, direction: Direction): number {
    return 1; // Continue here
}

var lines = readFile('Input.txt');
var maxView = getMaxViewingDistance(lines);

console.log(maxView);

