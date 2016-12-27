/**
 * Created by clicktronix on 30.10.16.
 */

import Cell from './Cell';

class ActionScreen {
    constructor(length) {
        this._width = this._height = length;
        this.cells = this._newEmptyArray();
    }

    setUpdatedCells() {
        this.cells = this._updateAllCells();
    }

    setEmptyArray() {
        this.cells = this._newEmptyArray();
    }

    _newEmptyArray() {
        const cells = [];
        for (let i = 0; i < this._width; i += 1) {
            cells[i] = [];
            for (let j = 0; j < this._height; j += 1) cells[i][j] = new Cell();
        }
        return cells;
    }

    _updateAllCells() {
        return this.cells.map((row, i) => {
            return row.map((column, j) => {
                const cell = new Cell();
                if (this._cellViability(i, j)) {
                    cell.setAlive();
                } else {
                    cell.setDead();
                }
                return cell;
            });
        });
    }

    _getNeighborCount(i, j) {
        const currentCell = this.cells[i][j];
        let count = (currentCell.status) ? -1 : 0;

        const neighborIndexes = [-1, 0, 1];
        count = neighborIndexes.reduce((firstSum, rowIndex) => {
            return firstSum + neighborIndexes.reduce((secondSum, columnIndex) => {
                if (this._getCurrentCellStatus(i, j, columnIndex, rowIndex)) {
                    return secondSum + 1;
                } else {
                    return secondSum;
                }
            }, 0);
        }, count);

        return count;
    }

    _getCurrentCellStatus(i, j, columnIndex, rowIndex) {
        const row = this._getRowIndex(j, rowIndex);
        const column = this._getColumnIndex(i, columnIndex);
        return this.cells[column][row].status;
    }

    // check the extreme cells
    _getRowIndex(j, rowIndex) {
        return (this._height + (j + rowIndex)) % this._height;
    }

    // check the extreme cells
    _getColumnIndex(i, columnIndex) {
        return (this._width + (i + columnIndex)) % this._width;
    }

    _cellViability(i, j) {
        const currentCell = this.cells[i][j];
        const neighborAmount = this._getNeighborCount(i, j);
        const optimalPopulation = 3;
        const lowPopulation = 2;

        // if alive
        if (currentCell.status) {
            if ((ActionScreen._cellsLowPopulation(neighborAmount, lowPopulation)) ||
                (ActionScreen._cellsOverPopulation(neighborAmount, optimalPopulation))) {
                return 0;
            } else {
                return 1;
            }
        }
        // if dead
        if (!currentCell.status && (ActionScreen._cellsOptimalPopulation(neighborAmount,
                optimalPopulation))) {
            return 1;
        } else {
            return 0;
        }
    }

    static _cellsOverPopulation(neighborAmount, optimalPopulation) {
        return neighborAmount > optimalPopulation;
    }

    static _cellsLowPopulation(neighborAmount, lowPopulation) {
        return neighborAmount < lowPopulation;
    }

    static _cellsOptimalPopulation(neighborAmount, optimalPopulation) {
        return neighborAmount === optimalPopulation;
    }
}

export default ActionScreen;