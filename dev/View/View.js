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

        this._gameEventManagement();
    }

    draw(cellsArray) {
        this._stage.removeAllChildren();
        this._stage.update();
        const squares = [];
        for (let i = 0; i < this._width; i += 1) {
            for (let j = 0; j < this._height; j += 1) {
                squares.push([]);
                const currentCell = cellsArray[i][j];
                let square = squares[i][j];
                square = new createjs.Shape();

                if (currentCell.status) {
                    currentCell.setAlive();
                    View._drawAlive(square);
                } else {
                    currentCell.setDead();
                    View._drawDead(square);
                }
                square.x = i * 15;
                square.y = j * 15;
                this._stage.addChild(square);
                square.addEventListener('click',
                    this._toggleCellAt.bind(this, cellsArray, i, j, square));
            }
        }
        this._stage.update();
    }

    _toggleCellAt(cellsArray, i, j, square) {
        const currentCell = cellsArray[i][j];
        if (currentCell.status) {
            currentCell.setDead();
            View._drawDead(square);
        } else {
            currentCell.setAlive();
            View._drawAlive(square);
        }
        square.x = i * 15;
        square.y = j * 15;
        this._stage.update();
    }

    _gameEventManagement() {
        const start = this._startTheProcessOfLife.bind(this);
        const step = this._stepOfLife.bind(this);
        const clear = this._clearActionScreen.bind(this);
        const pause = View._pauseTheProcessOfLife;

        const $startButton = $('.action-buttons__js-start-button');
        const $stepButton = $('.action-buttons__js-step-button');
        const $pauseButton = $('.action-buttons__js-pause-button');
        const $clearButton = $('.action-buttons__js-clear-button');

        $startButton.on('click', start);

        $pauseButton.on('click', pause);

        $stepButton.on('click', step);

        $clearButton.on('click', clear);
    }

    _startTheProcessOfLife() {
        createjs.Ticker.addEventListener('tick', this.drawAndUpdate);
        createjs.Ticker.setPaused(false);
        createjs.Ticker.setInterval(200);
    }

    _stepOfLife() {
        this.emit('step');
    }

    static _pauseTheProcessOfLife() {
        createjs.Ticker.setPaused(true);
    }

    _clearActionScreen() {
        createjs.Ticker.removeEventListener('tick', this.drawAndUpdate);
        this.emit('clear');
    }

    _updateAndDraw(event) {
        if (!event.paused) {
            this.emit('step');
        }
    }

    static _drawAlive(square) {
        square.graphics.beginFill('#00ff99')
            .beginStroke('#999999')
            .drawRect(0, 0, 15, 15);
    }

    static _drawDead(square) {
        square.graphics.beginFill('#666666')
            .beginStroke('#999999')
            .drawRect(0, 0, 15, 15);
    }
}


export default View;
