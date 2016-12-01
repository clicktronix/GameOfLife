/**
 * Created by clicktronix on 30.11.16.
 */

import $ from 'jquery';
import assert from 'assert';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

describe('View tests', function () {
    beforeEach(function () {
        const canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        this.context1 = canvas.get(0).getContext('2d');
        const model = new ActionScreen(3);
        const view = new View(3);
        const cells = model.newEmptyArray();
        view.draw(cells);

        const canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        this.context2 = canvas2.get(0).getContext('2d');
        let stage = new createjs.Stage('action-screen');
        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                const shape = new createjs.Shape();
                shape.graphics.beginFill('#666666')
                    .beginStroke('#999999')
                    .drawRect(0, 0, 15, 15);
                shape.x = i * 15;
                shape.y = j * 15;
            }
            stage.update();
        }
    });

    it('Checks drawing cells at the start', function () {
        assert.equal(this.context1.hash(), this.context2.hash());
    });
});