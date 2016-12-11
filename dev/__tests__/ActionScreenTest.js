/**
 * Created by clicktronix on 12.11.16.
 */

import assert from 'assert';
import ActionScreen from '../Model/ActionScreen';

const testObj = new ActionScreen(8);

describe('Check cells create', function () {
    const model = new ActionScreen(1);
    it('Cells created', function () {
        model.getCells();

        assert.equal(model.cells[0][0].status, false);
    });
});

describe('Checking actions of the model', function () {
    it('Is array', function () {
        const testCells = testObj.newEmptyArray();
        const arr = Array.isArray(testCells);
        assert.equal(arr, true);
    });

    it('Is out of stage', function (done) {
        const testCells = testObj.newEmptyArray();
        try {
            testCells[10][10].setAlive();
        } catch (error) {
            done();
        }
    });

    it('Checking neighbors amount', function () {
        const testCells = testObj.newEmptyArray();

        assert.equal(testObj.getNeighborCount(testCells, 0, 0), 0);
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 0);
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 0);
    });

    it('Get neighbor count when all live', function () {
        const testCells = testObj.newEmptyArray();

        for (let i = 0; i < testObj.width; i += 1) {
            for (let j = 0; j < testObj.height; j += 1) {
                testCells[i][j].setAlive();
            }
        }
        assert.equal(testObj.getNeighborCount(testCells, 0, 0), 8);
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 8);
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 8);
    });

    it('Get neighbor count of current cell', function () {
        const testCells = testObj.newEmptyArray();

        testCells[1][1].setAlive();
        testCells[1][2].setAlive();
        testCells[1][3].setAlive();
        testCells[2][1].setAlive();
        testCells[2][2].setAlive();
        testCells[2][3].setAlive();

        assert.equal(testObj.getNeighborCount(testCells, 1, 1), 3);
        assert.equal(testObj.getNeighborCount(testCells, 2, 2), 5);
        assert.equal(testObj.getNeighborCount(testCells, 3, 3), 2);
    });

    it('Create or destroy current cell', function () {
        const testCells = testObj.newEmptyArray();

        testCells[0][0].setAlive();
        testCells[0][3].setAlive();
        testCells[1][0].setAlive();
        testCells[1][2].setAlive();
        testCells[1][3].setAlive();
        testCells[2][1].setAlive();
        testCells[2][2].setAlive();
        testCells[2][3].setAlive();

        assert.equal(testObj.cellViability(testCells, 0, 1), 1);
        assert.equal(testObj.cellViability(testCells, 0, 2), 1);
        assert.equal(testObj.cellViability(testCells, 2, 2), 0);
        assert.equal(testObj.cellViability(testCells, 3, 3), 0);
    });

    it('Loop check', function () {
        const testCells = testObj.newEmptyArray();

        testCells[1][3].setAlive();
        testCells[2][3].setAlive();
        testCells[3][3].setAlive();

        assert.equal(testObj.cellViability(testCells, 2, 2), 1);
        assert.equal(testObj.cellViability(testCells, 2, 3), 1);
        assert.equal(testObj.cellViability(testCells, 2, 4), 1);
    });

    it('Static check', function () {
        const testCells = testObj.newEmptyArray();

        testCells[1][3].setAlive();
        testCells[2][3].setAlive();
        testCells[1][4].setAlive();
        testCells[2][4].setAlive();

        assert.equal(testObj.cellViability(testCells, 1, 3), 1);
        assert.equal(testObj.cellViability(testCells, 2, 3), 1);
        assert.equal(testObj.cellViability(testCells, 1, 4), 1);
        assert.equal(testObj.cellViability(testCells, 2, 4), 1);
    });
});

