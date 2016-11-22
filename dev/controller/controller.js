/**
 * Created by clicktronix on 30.10.16.
 */

import ActionScreen from '../view/action-screen.js';

export default class Controller {
    constructor() {
        const actionScreen = new ActionScreen(40);
        let $startButton = $('.js-start-button');
        let $stepButton = $('.js-step-button');
        let $pauseButton = $('.js-pause-button');
        let $clearButton = $('.js-clear-button');

        let cells = actionScreen.newEmptyArray();
        actionScreen.draw(cells);

        function updateAndDraw(event) {
            if (!event.paused) {
                cells = actionScreen.updateAllCells(cells);
                actionScreen.draw(cells);
            }
        }

        $startButton.click(function () {
            createjs.Ticker.addEventListener('tick', updateAndDraw);
            createjs.Ticker.setPaused(false);
            createjs.Ticker.setInterval(250);
        });

        $pauseButton.click(function () {
            createjs.Ticker.setPaused(true);
        });

        $stepButton.click(function () {
            cells = actionScreen.updateAllCells(cells);
            actionScreen.draw(cells);
        });

        $clearButton.click(function () {
            createjs.Ticker.removeEventListener('tick', updateAndDraw);
            cells = actionScreen.newEmptyArray();
            actionScreen.draw(cells);
        });
    }
};

