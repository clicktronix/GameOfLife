/**
 * Created by clicktronix on 30.10.16.
 */

import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

class Controller {
    constructor() {
        const length = 40;
        const model = new ActionScreen(length);
        const view = new View(length);

        view.draw(model.getCells());

        view.on('step', function () {
            model.cells = model.updateAllCells(model.cells);
            view.draw(model.cells);
        });

        view.on('clear', function () {
            view.draw(model.getCells());
        });
    }
}

export default Controller;
