/**
 * Created by clicktronix on 30.10.16.
 */

import Cell from '../model/cell.js'

export default class ActionScreen {
    constructor (length) {
        this.stage = new createjs.Stage('action-screen');
        this.width = this.height = length;
    }
};

ActionScreen.prototype.newEmptyArray = function () {
    let i, j;
    let cells = [];
    for (i = 0; i < this.width; i++) {
        cells[i] = [];
        for (j = 0; j < this.height; j++) {
            const cell = new Cell();
            cells[i][j] = cell;
        }
    }
    return cells;
};

ActionScreen.prototype.draw = function (cellsArray) {
    this.stage.removeAllChildren();
    this.stage.update();
    let i, j;
    for (i = 0; i < this.width; i++) {
        for (j = 0; j < this.height; j++) {
            const currentCell = cellsArray[i][j];
            this.stage.addChild(currentCell.shape);
            currentCell.shape.x = i * 10;
            currentCell.shape.y = j * 10;
            currentCell.shape.addEventListener('click',
                    this.toggleCellAt(cellsArray, i, j, currentCell));
        }
    }
    this.stage.update();
};

ActionScreen.prototype.toggleCellAt = function (cellsArray, i, j) {
    const self = this;
    return function () {
        const currentCell = cellsArray[i][j];
        if (currentCell.status === currentCell._alive) {
            currentCell.makeDead();
        } else {
            currentCell.makeAlive();
        }
        currentCell.shape.x = i * 10;
        currentCell.shape.y = j * 10;
        self.stage.update();
    }
};

ActionScreen.prototype.getNeighborCount = function (cellsArray, i, j) {
    const currentCell = cellsArray[i][j];
    let count = (currentCell.status === currentCell._alive) ? -1 : 0;
    for (let w = -1; w <= 1; w++) {
        for (let h = -1; h <= 1; h++) {
            if (cellsArray[(this.width + (i + w)) % this.width]
                    [(this.height + (j + h)) % this.height].status === currentCell._alive) {
                count++;
            }
        }
    }
    return count;
};

ActionScreen.prototype.createOrDestroy = function (cellsArray, i, j) {
    let a;
    const neighborAmount = this.getNeighborCount(cellsArray, i, j);
    if (cellsArray[i][j]) {
        if (neighborAmount <= 2 || neighborAmount > 3) {
            a = false;
        } else {
            a = true;
        }
    }
    return a;
};

ActionScreen.prototype.updateAll = function (cellsArray) {
    let i, j;
    let newCellsArray = cellsArray;
    for (i = 0; i < this.width; i++) {
        for (j = 0; j < this.height; j++) {
            newCellsArray[i][j].status =
                this.createOrDestroy(newCellsArray, i, j) ?  true : false;
        }
    }
    return newCellsArray;
};