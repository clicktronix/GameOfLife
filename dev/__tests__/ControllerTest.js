/**
 * Created by clicktronix on 30.11.16.
 */

import assert from 'assert';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

describe("Controller tests", function() {
    it("The length of the controller and the view is equal", function() {
        let length = 30;
        let view = new View(length);
        assert.equal(view.width, length);
    });

    it("The length of the controller and the model is equal", function() {
        let length = 30;
        let model = new ActionScreen(length);
        assert.equal(model.width, length);
    });
});