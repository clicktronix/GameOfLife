/**
 * Created by clicktronix on 30.10.16.
 */

import events from 'events';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

class Controller {
    constructor() {
        const length = 40;
        const em = new events.EventEmitter();
        const model = new ActionScreen(length);
        const view = new View(length, em);

        let cells = model.newEmptyArray();
        view.draw(cells);

        em.on('step', function () {
            cells = model.updateAllCells(cells);
            view.draw(cells);
        });

        em.on('clear', function () {
            cells = model.newEmptyArray();
            view.draw(cells);
        });
    }
}

export default Controller;
