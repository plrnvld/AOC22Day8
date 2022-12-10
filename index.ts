import fs from 'fs';

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

class TreeVisibilityCounter {
    treeVisibility: number[][];
    direction: Direction;

    constructor(direction: Direction, length: number) {
        this.direction = direction;
        this.treeVisibility = new Array(length);
        for (let i = 0; i < length; i++) {
            this.treeVisibility[i] = [];
        }
    }

    countLines() {
        console.log(this.treeVisibility.length);
    }

    containsTree(x: number, y: number) {
        
    }

    addTree(x: number, y: number) {
        
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

var lines = readFile('Input.txt');
console.log(lines.length)

var tvc = new TreeVisibilityCounter(Direction.Down, lines.length);
tvc.countLines();