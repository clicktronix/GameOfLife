/**
 * Created by clicktronix on 23.11.16.
 */

import $ from 'jquery';
import EventEmitter from 'events';

class View extends EventEmitter {
    constructor(length) {
        super();

        this._stage = new createjs.Stage('action-screen');
        this._width = this._height = length;
        this.drawAndUpdate = this._updateAndDraw.bind(this);
        this.emit = this.emit.bind(this);

        this.gameEventManagement();
    }
}

View.prototype.gameEventManagement = function () {
    const start = this._startButton.bind(this);
    const step = this._stepButton.bind(this);
    const clear = this._clearButton.bind(this);
    const pause = this._pauseButton.bind(this);

    const $startButton = $('.action-buttons__js-start-button');
    const $stepButton = $('.action-buttons__js-step-button');
    const $pauseButton = $('.action-buttons__js-pause-button');
    const $clearButton = $('.action-buttons__js-clear-button');

    $startButton.on('click', start);

    $pauseButton.on('click', pause);

    $stepButton.on('click', step);

    $clearButton.on('click', clear);
};

View.prototype.draw = function (cellsArray) {
    this._stage.removeAllChildren();
    this._stage.update();
    for (let i = 0; i < this._width; i += 1) {
        for (let j = 0; j < this._height; j += 1) {
            const currentCell = cellsArray[i][j];
            if (currentCell.status) {
                currentCell.setAlive();
                this._makeAlive(currentCell);
            } else {
                currentCell.setDead();
                this._makeDead(currentCell);
            }
            currentCell.shape.x = i * 15;
            currentCell.shape.y = j * 15;
            this._stage.addChild(currentCell.shape);
            currentCell.shape.addEventListener('click', this._toggleCellAt.bind(this, cellsArray, i, j));
        }
    }
    this._stage.update();
};

View.prototype._startButton = function () {
    createjs.Ticker.addEventListener('tick', this.drawAndUpdate);
    createjs.Ticker.setPaused(false);
    createjs.Ticker.setInterval(200);
};

View.prototype._stepButton = function () {
    this.emit('step');
};

View.prototype._pauseButton = function () {
    createjs.Ticker.setPaused(true);
};

View.prototype._clearButton = function () {
    createjs.Ticker.removeEventListener('tick', this.drawAndUpdate);
    this.emit('clear');
};

View.prototype._updateAndDraw = function (event) {
    if (!event.paused) {
        this.emit('step');
    }
};

View.prototype._toggleCellAt = function (cellsArray, i, j) {
    const currentCell = cellsArray[i][j];
    if (currentCell.status) {
        currentCell.setDead();
        this._drawDead(currentCell);
    } else {
        currentCell.setAlive();
        this._drawAlive(currentCell);
    }
    currentCell.shape.x = i * 15;
    currentCell.shape.y = j * 15;
    this._stage.update();
};

View.prototype._makeAlive = function (currentCell) {
    currentCell.shape = new createjs.Shape();
    this._drawAlive(currentCell);
};

View.prototype._makeDead = function (currentCell) {
    currentCell.shape = new createjs.Shape();
    this._drawDead(currentCell);
};

View.prototype._drawAlive = function (currentCell) {
    currentCell.shape.graphics.beginFill('#00ff99')
        .beginStroke('#999999')
        .drawRect(0, 0, 15, 15);
};

View.prototype._drawDead = function (currentCell) {
    currentCell.shape.graphics.beginFill('#666666')
        .beginStroke('#999999')
        .drawRect(0, 0, 15, 15);
};

export default View;
