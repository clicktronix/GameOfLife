/**
 * Created by clicktronix on 30.10.16.
 */

import ActionScreen from '../view/action-screen.js';

export default class Controller {
    constructor() {
        const actionScreen = new ActionScreen(40);

        let cells = actionScreen.newEmptyArray();
        actionScreen.draw(cells);

        function updateAndDraw(event) {
            if (!event.paused) {
                cells = actionScreen.updateAll(cells);
                actionScreen.draw(cells);
            }
        }

        $('.start-button').click(function () {
            createjs.Ticker.addEventListener('tick', updateAndDraw);
            createjs.Ticker.setPaused(false);
            createjs.Ticker.setInterval(250);
        });

        $('.pause-button').click(function () {
            createjs.Ticker.setPaused(true);
        });

        $('.step-button').click(function () {
            cells = actionScreen.updateAll(cells);
            actionScreen.draw(cells);
        });

        $('.clear-button').click(function () {
            createjs.Ticker.removeEventListener('tick', updateAndDraw);
            cells = actionScreen.newEmptyArray();
            actionScreen.draw(cells);
        });
    }
};

