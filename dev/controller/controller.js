/**
 * Created by clicktronix on 30.10.16.
 */

import ActionScreen from '../view/action-screen.js';

export default class Controller {
    constructor() {
        const actionScreen = new ActionScreen(50);
        const startButton = document.getElementsByClassName('start-button');
        const stopButton = document.getElementsByClassName('stop-button');
        const clearButton = document.getElementsByClassName('clear-button');

        let cells = actionScreen.newEmptyArray();
        actionScreen.draw(cells);
        actionScreen.stage.update();

        function updateAndDraw(event) {
            if (!event.paused) {
                cells = actionScreen.updateAll(cells);
                actionScreen.draw(cells);
            }
        }

        startButton.onclick = function () {
            createjs.Ticker.addEventListener('tick', updateAndDraw);
            createjs.Ticker.paused = false;
            createjs.Ticker.setInterval(250);
        };

        stopButton.onclick = function () {
            createjs.Ticker.paused = (!createjs.Ticker.paused) ? true : false;
        };

        clearButton.onclick = function () {
            createjs.Ticker.removeEventListener('tick', updateAndDraw);
            cells = actionScreen.newEmptyArray();
            actionScreen.draw(cells);
        };
    }
};



