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

        // if (this.direction == Direction.Down)
        //     console.log(` >>>> Pushing for index ${index} => ${y}`)

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

                // if (this.direction == Direction.Down)
                //     console.log(` >> Adding tree (${x},${y})`)

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
        console.log(`** Counting ${Direction[this.direction]}`)
        var count = 0;

        for (let index = 0; index < this.maxLength; index++) {
            for (let j = 0; j < this.treeVisibility[index].length; j++) {
                var offset = this.treeVisibility[index][j];

                var [x, y] = this.checkVertical() ? [index, offset] : [offset, index];
                
                if (!notIn.some(tvc => tvc.containsTree(x, y))) {
                    // console.log(`    Counting (${x},${y})`)
                    count++;
                } else {
                    // console.log(`    (${x},${y}) has been counted before`)
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

function readFile(fileName: string): [string] {
    const allFileContents = fs.readFileSync(fileName, 'utf-8');
    var lines: [string] = allFileContents.split(/\r?\n/);
    lines.forEach(line => {
        console.log(`Line from file: ${line}`);
    });

    return lines;
}

var lines = readFile('Example.txt');

var down = new TreeVisibilityCounter(Direction.Down, lines);
var up = new TreeVisibilityCounter(Direction.Up, lines);
var left = new TreeVisibilityCounter(Direction.Left, lines);
var right = new TreeVisibilityCounter(Direction.Right, lines);


//console.log("UP SINGLE: " + up.countTrees([]));
// up.printDict();
//console.log("DOWN SINGLE: " + down.countTrees([]));
// down.printDict();
//console.log("LEFT SINGLE: " + left.countTrees([]));
// left.printDict();
//console.log("RIGHT SINGLE: " + right.countTrees([]));
//right.printDict();


var countUp = up.countTrees([]);
var countDown = down.countTrees([up]);


var countLeft = left.countTrees([down, up]);
var countRight = right.countTrees([down, up, left]);

console.log(countUp + countDown + countLeft + countRight);