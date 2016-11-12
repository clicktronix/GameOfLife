/**
 * Created by clicktronix on 12.11.16.
 */

import ActionScreen from '../view/action-screen.js';

let testObj = new ActionScreen(4);

describe('Checking point', function() {
    it('Checking neighbors amount',
        function () {
            let testCells = testObj.newEmptyArray();

            assert.equal(testObj.getNeighborCount(testCells, 0, 0), 0, 'Zero neighbors at 0,0');
            assert.equal(testObj.getNeighborCount(testCells, 2, 2), 0, 'Zero neighbors at 2,2');
            assert.equal(testObj.getNeighborCount(testCells, 3, 3), 0, 'Zero neighbors at 3,3');
    });
});

describe('Get neighbor count', function() {
    it('Get neighbor count when all live', function () {
        let testCells = testObj.newEmptyArray();

        for (let i = 0; i < testObj.width; i++) {
            for (let j = 0; j < testObj.height; j++) {
                testCells[i][j].status = testCells[i][j]._alive;
            }
        }

        assert.equal(testObj.getNeighborCount(testCells, 0, 0), 8, 'Eight neighbors at 0,0');
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 8, 'Eight neighbors at 2,2');
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 8, 'Eight neighbors at 3,3');
    });
});

describe('Get neighbor count', function() {
    it('Get neighbor count of current cell', function() {
        let testCells = testObj.newEmptyArray();

        testCells[1][1].status = testCells[1][1]._alive;
        testCells[1][2].status = testCells[1][2]._alive;
        testCells[1][3].status = testCells[1][3]._alive;
        testCells[2][1].status = testCells[2][1]._alive;
        testCells[2][2].status = testCells[2][2]._alive;
        testCells[2][3].status = testCells[2][3]._alive;

        assert.equal(testObj.getNeighborCount(testCells, 1, 1), 3, 'Three neighbors at 1,1');
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 5, 'Five neighbors at 2,2');
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 2, 'Two neighbor at 3,3');
    });
});

describe('Create or destroy', function() {
    it('Create or destroy current cell', function() {
        let testCells = testObj.newEmptyArray();

        testCells[0][0].status = testCells[1][1]._alive;
        testCells[0][3].status = testCells[1][1]._alive;
        testCells[1][0].status = testCells[1][1]._alive;
        testCells[1][2].status = testCells[1][2]._alive;
        testCells[1][3].status = testCells[1][3]._alive;
        testCells[2][1].status = testCells[2][1]._alive;
        testCells[2][2].status = testCells[2][2]._alive;
        testCells[2][3].status = testCells[2][3]._alive;

        assert.equal(testObj.createOrDestroy(testCells, 0, 1), 1, 'Cell 0,1 will regenerate');
        assert.equal(testObj.createOrDestroy(testCells, 0, 2), 1, 'Cell 0,2 will regenerate');
        assert.equal(testObj.createOrDestroy(testCells, 2, 2), 0, 'Cell 2,2 will die');
        assert.equal(testObj.createOrDestroy(testCells, 3, 3), 0, 'Cell 3,3 stays dead');
    });
});

describe('Canvas view __tests__', function() {
    it('Checks drawing cells at the start', function () {
        let canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        let context = canvas.get(0).getContext('2d');
        let view = new ActionScreen(40);
        let cells = view.newEmptyArray();
        view.draw(cells);

        let canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        let context2 = canvas2.get(0).getContext('2d');
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) {
                let shape = new createjs.Shape();
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
        let canvas = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        let context = canvas.get(0).getContext('2d');
        let view = new ActionScreen(40);
        let cells = view.newEmptyArray();
        view.draw(cells);
        view.toggleCellAt(cells, 2, 2);

        let canvas2 = $('<canvas class="action-screen" width="600" height="600"></canvas>');
        let context2 = canvas2.get(0).getContext('2d');
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) {
                let shape = new createjs.Shape();
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