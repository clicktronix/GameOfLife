/**
 * Created by clicktronix on 23.11.16.
 */

import $ from 'jquery';

class View {
    constructor(length, em) {
        this.width = this.height = length;
        this.stage = new createjs.Stage('action-screen');

        const $startButton = $('.action-buttons__js-start-button');
        const $stepButton = $('.action-buttons__js-step-button');
        const $pauseButton = $('.action-buttons__js-pause-button');
        const $clearButton = $('.action-buttons__js-clear-button');

        function updateAndDraw(event) {
            if (!event.paused) {
                em.emit('step');
            }
        }

        $startButton.on('click', function () {
            createjs.Ticker.addEventListener('tick', updateAndDraw);
            createjs.Ticker.setPaused(false);
            createjs.Ticker.setInterval(200);
        });

        $pauseButton.on('click', function () {
            createjs.Ticker.setPaused(true);
        });

        $stepButton.on('click', function () {
            em.emit('step');
        });

        $clearButton.on('click', function () {
            createjs.Ticker.removeEventListener('tick', updateAndDraw);
            em.emit('clear');
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
            currentCell.shape.addEventListener('click',
                this.toggleCellAt(cellsArray, i, j, currentCell));
        }
    }
    this.stage.update();
};

View.prototype.toggleCellAt = function (cellsArray, i, j) {
    const self = this;
    return function () {
        const currentCell = cellsArray[i][j];
        if (currentCell.status) {
            currentCell.makeDead();
        } else {
            currentCell.makeAlive();
        }
        currentCell.shape.x = i * 15;
        currentCell.shape.y = j * 15;
        self.stage.update();
    };
};

export default View;