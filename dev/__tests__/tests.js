/**
 * Created by clicktronix on 12.11.16.
 */

import $ from 'jquery';
import assert from 'assert';
import ActionScreen from '../Model/ActionScreen';
import View from '../View/View';

const testObj = new ActionScreen(4);

describe('Checking point', function () {
    it('Checking neighbors amount', function () {
        const testCells = testObj.newEmptyArray();

        assert.equal(testObj.getNeighborCount(testCells, 0, 0), 0, 'Zero neighbors at 0,0');
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 0, 'Zero neighbors at 2,2');
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 0, 'Zero neighbors at 3,3');
    });
});

describe('Get neighbor count', function () {
    it('Get neighbor count when all live', function () {
        const testCells = testObj.newEmptyArray();

        for (let i = 0; i < testObj.width; i += 1) {
            for (let j = 0; j < testObj.height; j += 1) {
                testCells[i][j].status = testCells[i][j].alive;
            }
        }

        assert.equal(testObj.getNeighborCount(testCells, 0, 0), 8, 'Eight neighbors at 0,0');
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 8, 'Eight neighbors at 2,2');
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 8, 'Eight neighbors at 3,3');
    });
});

describe('Get neighbor count', function () {
    it('Get neighbor count of current cell', function () {
        const testCells = testObj.newEmptyArray();

        testCells[1][1].status = testCells[1][1].alive;
        testCells[1][2].status = testCells[1][2].alive;
        testCells[1][3].status = testCells[1][3].alive;
        testCells[2][1].status = testCells[2][1].alive;
        testCells[2][2].status = testCells[2][2].alive;
        testCells[2][3].status = testCells[2][3].alive;

        assert.equal(testObj.getNeighborCount(testCells, 1, 1), 3, 'Three neighbors at 1,1');
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 5, 'Five neighbors at 2,2');
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 2, 'Two neighbor at 3,3');
    });
});

describe('Create or destroy', function () {
    it('Create or destroy current cell', function () {
        const testCells = testObj.newEmptyArray();

        testCells[0][0].status = testCells[1][1].alive;
        testCells[0][3].status = testCells[1][1].alive;
        testCells[1][0].status = testCells[1][1].alive;
        testCells[1][2].status = testCells[1][2].alive;
        testCells[1][3].status = testCells[1][3].alive;
        testCells[2][1].status = testCells[2][1].alive;
        testCells[2][2].status = testCells[2][2].alive;
        testCells[2][3].status = testCells[2][3].alive;

        assert.equal(testObj.cellViability(testCells, 0, 1), 1, 'Cell 0,1 will regenerate');
        assert.equal(testObj.cellViability(testCells, 0, 2), 1, 'Cell 0,2 will regenerate');
        assert.equal(testObj.cellViability(testCells, 2, 2), 0, 'Cell 2,2 will die');
        assert.equal(testObj.cellViability(testCells, 3, 3), 0, 'Cell 3,3 stays dead');
    });
});

describe('Canvas view test', function () {
    it('Checks drawing cells at the start', function () {
        const canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        const context = canvas.get(0).getContext('2d');
        const model = new ActionScreen(40);
        const view = new View(40);
        const cells = model.newEmptyArray();
        view.draw(cells);
        view.toggleCellAt(cells, 2, 2);

        const canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        const context2 = canvas2.get(0).getContext('2d');
        for (let i = 0; i < 40; i += 1) {
            for (let j = 0; j < 40; j += 1) {
                const shape = new createjs.Shape();
                shape.graphics.beginFill('#666666')
                    .beginStroke('#999999')
                    .drawRect(0, 0, 15, 15);
                shape.x = i * 15;
                shape.y = j * 15;
            }
        }
        assert.equal(context.hash(), context2.hash());
    });

    it('Checks the drawing when you click', function () {
        const canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        const context = canvas.get(0).getContext('2d');
        const model = new ActionScreen(40);
        const view = new View(40);
        const cells = model.newEmptyArray();
        view.draw(cells);
        view.toggleCellAt(cells, 2, 2);

        const canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        const context2 = canvas2.get(0).getContext('2d');
        for (let i = 0; i < 40; i += 1) {
            for (let j = 0; j < 40; j += 1) {
                const shape = new createjs.Shape();
                if ((i === 2) && (j === 2)) {
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
        }
        assert.equal(context.hash(), context2.hash());
    });
});