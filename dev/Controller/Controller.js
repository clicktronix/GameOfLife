/**
 * Created by clicktronix on 30.10.16.
 */

import $ from 'jquery';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

class Controller {
    constructor() {
        const length = 40;
        const model = new ActionScreen(length);
        const view = new View(length);
        const $body = $('body');

        let cells = model.newEmptyArray();
        view.draw(cells);

        $body.on('step', function () {
            cells = model.updateAllCells(cells);
            view.draw(cells);
        });

        $body.on('clear', function () {
            cells = model.newEmptyArray();
            view.draw(cells);
        });
    }
}

export default Controller;
