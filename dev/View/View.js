/**
 * Created by clicktronix on 23.11.16.
 */

import $ from 'jquery';
import EventEmitter from 'events';

class View extends EventEmitter {
    constructor(length) {
        super();

        this.width = this.height = length;
        this.stage = new createjs.Stage('action-screen');
        this.drawAndUpdate = this.updateAndDraw.bind(this);
        this.emit = this.emit.bind(this);

        this.gameEventManagement();
    }
}

View.prototype.gameEventManagement = function () {
    const start = this.startButton.bind(this);
    const step = this.stepButton.bind(this);
    const clear = this.clearButton.bind(this);
    const pause = this.pauseButton.bind(this);

    const $startButton = $('.action-buttons__js-start-button');
    const $stepButton = $('.action-buttons__js-step-button');
    const $pauseButton = $('.action-buttons__js-pause-button');
    const $clearButton = $('.action-buttons__js-clear-button');

    $startButton.on('click', start);

    $pauseButton.on('click', pause);

    $stepButton.on('click', step);

    $clearButton.on('click', clear);
};

View.prototype.startButton = function () {
    createjs.Ticker.addEventListener('tick', this.drawAndUpdate);
    createjs.Ticker.setPaused(false);
    createjs.Ticker.setInterval(200);
};

View.prototype.stepButton = function () {
    this.emit('step');
};

View.prototype.pauseButton = function () {
    createjs.Ticker.setPaused(true);
};

View.prototype.clearButton = function () {
    createjs.Ticker.removeEventListener('tick', this.drawAndUpdate);
    this.emit('clear');
};

View.prototype.updateAndDraw = function (event) {
    if (!event.paused) {
        this.emit('step');
    }
};

View.prototype.draw = function (cellsArray) {
    this.stage.removeAllChildren();
    this.stage.update();
    for (let i = 0; i < this.width; i += 1) {
        for (let j = 0; j < this.height; j += 1) {
            const currentCell = cellsArray[i][j];
            if (currentCell.status) {
                currentCell.setAlive();
                this.makeAlive(currentCell);
            } else {
                currentCell.setDead();
                this.makeDead(currentCell);
            }
            currentCell.shape.x = i * 15;
            currentCell.shape.y = j * 15;
            this.stage.addChild(currentCell.shape);
            currentCell.shape.addEventListener('click', this.toggleCellAt.bind(this, cellsArray, i, j));
        }
    }
    this.stage.update();
};

View.prototype.toggleCellAt = function (cellsArray, i, j) {
    const currentCell = cellsArray[i][j];
    if (currentCell.status) {
        currentCell.setDead();
        this.drawDead(currentCell);
    } else {
        currentCell.setAlive();
        this.drawAlive(currentCell);
    }
    currentCell.shape.x = i * 15;
    currentCell.shape.y = j * 15;
    this.stage.update();
};

View.prototype.makeAlive = function (currentCell) {
    currentCell.shape = new createjs.Shape();
    this.drawAlive(currentCell);
};

View.prototype.makeDead = function (currentCell) {
    currentCell.shape = new createjs.Shape();
    this.drawDead(currentCell);
};

View.prototype.drawAlive = function (currentCell) {
    currentCell.shape.graphics.beginFill('#00ff99')
        .beginStroke('#999999')
        .drawRect(0, 0, 15, 15);
};

View.prototype.drawDead = function (currentCell) {
    currentCell.shape.graphics.beginFill('#666666')
        .beginStroke('#999999')
        .drawRect(0, 0, 15, 15);
};

export default View;