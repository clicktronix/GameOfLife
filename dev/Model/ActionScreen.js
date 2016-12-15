/**
 * Created by clicktronix on 30.10.16.
 */

import Cell from './Cell';

class ActionScreen {
    constructor(length) {
        this._width = this._height = length;
    }
}

ActionScreen.prototype.getCells = function () {
    this.cells = this._newEmptyArray();
    return this.cells;
};

ActionScreen.prototype.updateAllCells = function (cellsArray) {
    const newCellsArray = [];
    for (let i = 0; i < this._width; i += 1) {
        newCellsArray[i] = [];
        for (let j = 0; j < this._height; j += 1) {
            newCellsArray[i][j] = new Cell();
            if (this._cellViability(cellsArray, i, j)) {
                newCellsArray[i][j].setAlive();
            } else {
                newCellsArray[i][j].setDead();
            }
        }
    }
    return newCellsArray;
};

ActionScreen.prototype._newEmptyArray = function () {
    const cells = [];
    for (let i = 0; i < this._width; i += 1) {
        cells[i] = [];
        for (let j = 0; j < this._height; j += 1) cells[i][j] = new Cell();
    }
    return cells;
};

ActionScreen.prototype._getNeighborCount = function (cellsArray, i, j) {
    const getCurrentCellStatus = this._getCurrentCellStatus.bind(this);
    let count = (cellsArray[i][j].status) ? -1 : 0;

    const neighborIndexes = [-1, 0, 1];
    count = neighborIndexes.reduce(function (firstSum, rowIndex) {
        return firstSum + neighborIndexes.reduce(function (secondSum, columnIndex) {
            if (getCurrentCellStatus(cellsArray, i, j, columnIndex, rowIndex)) {
                return secondSum + 1;
            } else {
                return secondSum;
            }
        }, 0);
    }, count);

    return count;
};

ActionScreen.prototype._getCurrentCellStatus = function (cellsArray, i, j, columnIndex, rowIndex) {
    return cellsArray[(this._width + (i + columnIndex))
    % this._width][(this._height + (j + rowIndex)) % this._height]
        .status;
};

ActionScreen.prototype._cellViability = function (cellsArray, i, j) {
    const neighborAmount = this._getNeighborCount(cellsArray, i, j);
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

export default ActionScreen;