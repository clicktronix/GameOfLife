/**
 * Created by clicktronix on 30.11.16.
 */

import assert from 'assert';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

describe('Controller tests', function () {
    const length = 30;
    const view = new View(length);
    const model = new ActionScreen(length);

    it('The length of the controller and the view is equal', function () {
        assert.equal(view._width, length);
        assert.equal(view._height, length);
    });

    it('The length of the controller and the model is equal', function () {
        assert.equal(model._width, length);
        assert.equal(model._height, length);
    });
});