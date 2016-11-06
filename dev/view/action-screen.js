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
        if (currentCell.status == currentCell._alive) {
            currentCell.makeDead();
        } else {
            currentCell.makeAlive();
        }
        currentCell.shape.x = i * 10;
        currentCell.shape.y = j * 10;
        self.stage.update();
    };
};