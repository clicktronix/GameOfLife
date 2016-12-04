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

        const $startButton = $('.action-buttons__js-start-button');
        const $stepButton = $('.action-buttons__js-step-button');
        const $pauseButton = $('.action-buttons__js-pause-button');
        const $clearButton = $('.action-buttons__js-clear-button');

        function updateAndDraw(event) {
            if (!event.paused) {
                this.emit('step');
            }
        }

        const drawAndUpdate = updateAndDraw.bind(this);
        const emit = this.emit.bind(this);

        $startButton.on('click', function () {
            createjs.Ticker.addEventListener('tick', drawAndUpdate);
            createjs.Ticker.setPaused(false);
            createjs.Ticker.setInterval(200);
        });

        $pauseButton.on('click', function () {
            createjs.Ticker.setPaused(true);
        });

        $stepButton.on('click', function () {
            emit('step');
        });

        $clearButton.on('click', function () {
            createjs.Ticker.removeEventListener('tick', drawAndUpdate);
            emit('clear');
        });
    }
}

View.prototype.draw = function (cellsArray) {
    this.stage.removeAllChildren();
    this.stage.update();
    for (let i = 0; i < this.width; i += 1) {
        for (let j = 0; j < this.height; j += 1) {
            const currentCell = cellsArray[i][j];
            if (currentCell.status) {
                currentCell.makeAlive();
            } else {
                currentCell.makeDead();
            }
            currentCell.shape.x = i * 15;
            currentCell.shape.y = j * 15;
            this.stage.addChild(currentCell.shape);

            function func() {
                this.toggleCellAt(cellsArray, i, j);
            }
            currentCell.shape.addEventListener('click', func.bind(this));
        }
    }
    this.stage.update();
};

View.prototype.toggleCellAt = function (cellsArray, i, j) {
    const currentCell = cellsArray[i][j];
    if (currentCell.status) {
        currentCell.makeDead();
    } else {
        currentCell.makeAlive();
    }
    currentCell.shape.x = i * 15;
    currentCell.shape.y = j * 15;
    this.stage.update();
};

export default View;