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

        _view.draw(_model.getCells());

        _view.on('step', function () {
            _model.cells = _model.updateAllCells(_model.cells);
            _view.draw(_model.cells);
        });

        _view.on('clear', function () {
            _view.draw(_model.getCells());
        });
    }
}

export default Controller;
