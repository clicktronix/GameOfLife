/**
 * Created by clicktronix on 30.11.16.
 */

import $ from 'jquery';
import assert from 'assert';
import sinon from 'sinon';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';
import Controller from '../Controller/Controller';

describe('View tests', function () {
    beforeEach(function () {
        const canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        this.context1 = canvas.get(0).getContext('2d');
        this.model = new ActionScreen(3);
        this.view = new View(3);
        this.cells = this.model.newEmptyArray();

        const canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        this.context2 = canvas2.get(0).getContext('2d');
        this.stage = new createjs.Stage('action-screen');
    });

    it('Checks drawing cells at the start', function () {
        this.view.draw(this.cells);

        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                const shape = new createjs.Shape();
                shape.graphics.beginFill('#666666')
                    .beginStroke('#999999')
                    .drawRect(0, 0, 15, 15);
                shape.x = i * 15;
                shape.y = j * 15;
            }
            this.stage.update();
        }
        assert.equal(this.context1.hash(), this.context2.hash());
    });

    it('Checks click on the cell', function () {
        this.view.draw(this.cells);
        this.view.toggleCellAt(this.cells, 1, 1);

        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                let shape = new createjs.Shape();
                if ((i === 1) && (j === 1)) {
                    shape.graphics.beginFill('#00ff99')
                        .beginStroke('#999999')
                        .drawRect(0, 0, 15, 15);
                } else {
                    shape.graphics.beginFill('#666666')
                        .beginStroke('#999999')
                        .drawRect(0, 0, 15, 15);
                }
                shape.x = i * 15;
                shape.y = j * 15;
            }
            this.stage.update();
        }
        assert.equal(this.context1.hash(), this.context2.hash());
    });
});

// describe('Manage elements tests', function () {
//     it('Check calling clear button', function () {
//         const control = new Controller();
//         const length = 10;
//         const view = new View(length);
//         const aSpy = sinon.spy(view, 'emit');
//         $('.action-buttons__js-clear-button').trigger('click');
//         sinon.assert.calledOnce(aSpy);
//     });
// });