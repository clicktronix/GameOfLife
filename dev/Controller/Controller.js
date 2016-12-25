/**
 * Created by clicktronix on 30.10.16.
 */

import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

class Controller {
    constructor() {
        const length = 40;
        const _model = new ActionScreen(length);
        const _view = new View(length);

        _view.draw(_model.cells);

        _view.on('step', function () {
            _model.setUpdatedCells();
            _view.draw(_model.cells);
        });

        _view.on('clear', function () {
            _model.setEmptyArray();
            _view.draw(_model.cells);
        });
    }
}

export default Controller;
