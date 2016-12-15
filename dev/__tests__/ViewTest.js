/**
 * Created by clicktronix on 30.11.16.
 */

import $ from 'jquery';
import assert from 'assert';
import sinon from 'sinon';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

describe('View tests', function () {
    const canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
    const context1 = canvas.get(0).getContext('2d');
    const model = new ActionScreen(3);
    const view = new View(3);

    const canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
    const context2 = canvas2.get(0).getContext('2d');
    const stage = new createjs.Stage('action-screen');

    let i;
    let j;

    beforeEach(function () {
        view.draw(model.getCells());

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {
                const shape = new createjs.Shape();
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
            stage.update();
        }
    });

    it('Checks drawing cells at the start', function () {
        assert.equal(context1.hash(), context2.hash());
    });

    it('Checks click on the cell', function () {
        view._toggleCellAt(model.cells, 1, 1);

        assert.equal(context1.hash(), context2.hash());
    });

    it('Checks change fill of the alive cell', function () {
        const currentCell = { status: false };
        view._makeAlive(currentCell);

        assert.equal(currentCell.shape.graphics._fill.style, '#00ff99');
    });

    it('Checks change fill of the dead cell', function () {
        const currentCell = { status: false };
        view._makeDead(currentCell);

        assert.equal(currentCell.shape.graphics._fill.style, '#666666');
    });

    it('Checks equal color of the stroke', function () {
        const currentCell = { status: false };
        view._makeDead(currentCell);

        assert.equal(currentCell.shape.graphics._stroke.style, '#999999');
    });
});

describe('Manage elements tests', function () {
    let clearSpy;
    let stepSpy;
    const $body = $('body');
    const model = new ActionScreen(2);
    const view = new View(2);

    $body.append("<button class='action-buttons__js-step-button'></button>");
    $body.append("<button class='action-buttons__js-clear-button'></button>");
    $body.append("<button class='action-buttons__js-start-button'></button>");
    $body.append("<button class='action-buttons__js-pause-button'></button>");

    const $stepButton = $('.action-buttons__js-step-button');
    const $clearButton = $('.action-buttons__js-clear-button');
    const $startButton = $('.action-buttons__js-start-button');
    const $pauseButton = $('.action-buttons__js-pause-button');

    beforeEach(function () {
        clearSpy = sinon.spy(model, 'getCells');
        stepSpy = sinon.spy(model, 'updateAllCells');
    });

    afterEach(function () {
        clearSpy.restore();
        stepSpy.restore();
    });

    it('Check calling clear button', function () {
        const aSpy = sinon.spy();

        $clearButton.click(aSpy);

        $clearButton.click();
        sinon.assert.calledOnce(aSpy);
    });

    it('Check calling step button', function () {
        const aSpy = sinon.spy();

        $stepButton.click(aSpy);

        $stepButton.click();
        sinon.assert.calledOnce(aSpy);
    });

    it('Check calling start button', function () {
        const aSpy = sinon.spy();

        $startButton.click(aSpy);

        $startButton.click();
        sinon.assert.calledOnce(aSpy);
    });

    it('Check calling pause button', function () {
        const aSpy = sinon.spy();

        $pauseButton.click(aSpy);

        $pauseButton.click();
        sinon.assert.calledOnce(aSpy);
    });

    describe('End to end manage tests', function () {
        it('End to end clear button test', function () {
            $clearButton.click(function () {
                view.draw(model.getCells());
            });
            $clearButton.click();
            sinon.assert.called(clearSpy);
        });

        it('End to end step button test', function () {
            $stepButton.click(function () {
                model.cells = model.updateAllCells(model.cells);
                view.draw(model.cells);
            });
            $stepButton.click();
            sinon.assert.called(stepSpy);
        });
    });
});