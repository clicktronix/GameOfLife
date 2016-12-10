/**
 * Created by clicktronix on 30.10.16.
 */

import Cell from './Cell';

class ActionScreen {
    constructor(length) {
        this.width = this.height = length;
    }
}

ActionScreen.prototype.newEmptyArray = function () {
    const cells = [];
    for (let i = 0; i < this.width; i += 1) {
        cells[i] = [];
        for (let j = 0; j < this.height; j += 1) {
            const cell = new Cell();
            cells[i][j] = cell;
        }
    }
    return cells;
};

ActionScreen.prototype.getNeighborCount = function (cellsArray, i, j) {
    const currentCell = cellsArray[i][j];
    let count = (currentCell.status) ? -1 : 0;
    for (let w = -1; w <= 1; w += 1) {
        for (let h = -1; h <= 1; h += 1) {
            if (cellsArray[(this.width + (i + w)) % this.width][(this.height + (j + h)) % this.height]
                    .status) {
                count += 1;
            }
        }
    }
    return count;
};

// ActionScreen.prototype.getNeighborCount = function (cellsArray, i, j) {
//     let count = (cellsArray[i][j].status) ? -1 : 0;
//
//     count = cellsArray.reduce(function (sum) {
//         for (let w = -1; w <= 1; w += 1) {
//             for (let h = -1; h <= 1; h += 1) {
//                 if ([(this.width + (i + w)) % this.width][(this.height + (j + h)) % this.height]
//                         .status) {
//                     sum += 1;
//                 }
//             }
//         }
//     }, count);
//     return count;
// };

ActionScreen.prototype.cellViability = function (cellsArray, i, j) {
    const neighborAmount = this.getNeighborCount(cellsArray, i, j);
    const currentCell = cellsArray[i][j];
    // if alive
    if (currentCell.status) {
        if ((neighborAmount < 2) || (neighborAmount > 3)) {
            return 0;
        } else {
            return 1;
        }
    }
    // if dead
    if (!currentCell.status && (neighborAmount === 3)) {
        return 1;
    } else {
        return 0;
    }
};

ActionScreen.prototype.updateAllCells = function (cellsArray) {
    const newCellsArray = [];
    for (let i = 0; i < this.width; i += 1) {
        newCellsArray[i] = [];
        for (let j = 0; j < this.height; j += 1) {
            const newCell = new Cell();
            newCellsArray[i][j] = newCell;
            if (this.cellViability(cellsArray, i, j)) {
                newCellsArray[i][j].setAlive();
            } else {
                newCellsArray[i][j].setDead();
            }
        }
    }
    return newCellsArray;
};

ActionScreen.prototype.getCells = function () {
    this.cells = this.newEmptyArray();
    return this.cells;
};

export default ActionScreen;