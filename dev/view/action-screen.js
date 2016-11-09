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
    if (cellsArray[i][j]) {
        if (this.getNeighborCount(cellsArray, i, j) < 2) {
            return 0;
        }
        if (this.getNeighborCount(cellsArray, i, j) > 3) {
            return 0;
        } else {
            return 1;
        }
    }
    if (!cellsArray[i][j] && (this.getNeighborCount(cellsArray, i, j) === 3)) {
        return 1;
    } else {
        return 0;
    }
};

ActionScreen.prototype.updateAll = function (cellsArray) {
    var i, j;
    var newCellsArray = [];
    for (i = 0; i < this.width; i++) {
        newCellsArray.push([]);
        for (j = 0; j < this.height; j++) {
            if (this.createOrDestroy(cellsArray, i, j)) {
                newCellsArray[i][j] = cellsArray[i][j]._alive;
            } else {
                newCellsArray[i][j] = cellsArray[i][j]._dead;
            }
        }
    }
    return newCellsArray;
};