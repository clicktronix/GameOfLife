/**
 * Created by clicktronix on 30.10.16.
 */
import Model from '../model/cell.js';
import ActionScreen from '../view/action-screen.js';

export default class Controller {
    constructor() {
        const actionScreen = new ActionScreen(50);

        let cells = actionScreen.newEmptyArray();
        actionScreen.draw(cells);
        actionScreen.stage.update();


        // const actionScreen = document.getElementsByClassName('action-screen');
        // const startButton = document.getElementsByClassName('start-button');
        // const stopButton = document.getElementsByClassName('stop-button');
        // const clearButton = document.getElementsByClassName('clear-button');
    }
};



