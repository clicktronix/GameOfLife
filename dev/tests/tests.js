/**
 * Created by clicktronix on 12.11.16.
 */

import ActionScreen from '../view/action-screen.js';

let assert = require('assert');
let testObj = new ActionScreen(4);

describe('Checking point', function() {
    it('Checking neighbors amount',
        function () {
            let testCells = testObj.newEmptyArray();

            assert.equal(testObj.getNeighborCount(testCells, 0, 0), 0, 'Zero neighbors at 0,0');
            assert.equal(testObj.getNeighborCount(testCells, 2, 2), 0, 'Zero neighbors at 2,2');
            assert.equal(testObj.getNeighborCount(testCells, 3, 3), 0, 'Zero neighbors at #,3');
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