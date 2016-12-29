/**
 * Created by clicktronix on 12.11.16.
 */

import assert from 'assert';
import ActionScreen from '../Model/ActionScreen';

describe('Check cells create', function () {
    const testObj = new ActionScreen(1);
    it('Cells created', function () {
        assert.equal(testObj.cells[0][0].status, false);
    });
});

describe('Checking actions of the model', function () {
    const testObj = new ActionScreen(8);

    beforeEach(function () {
        testObj.setEmptyArray();
    });

    it('Is array', function () {
        const arr = Array.isArray(testObj.cells);
        assert.equal(arr, true);
    });

    it('Is out of stage', function (done) {
        try {
            testObj.cells[10][10].setAlive();
        } catch (error) {
            done();
        }
    });

    it('Checking neighbors amount', function () {
        assert.equal(testObj._getNeighborCount(0, 0), 0);
        assert.equal(testObj._getNeighborCount(2, 2), 0);
        assert.equal(testObj._getNeighborCount(3, 3), 0);
    });

    it('Get neighbor count when all live', function () {
        for (let i = 0; i < testObj._width; i += 1) {
            for (let j = 0; j < testObj._height; j += 1) {
                testObj.cells[i][j].setAlive();
            }
        }
        assert.equal(testObj._getNeighborCount(0, 0), 8);
        assert.equal(testObj._getNeighborCount(2, 2), 8);
        assert.equal(testObj._getNeighborCount(3, 3), 8);
    });

    it('Get neighbor count of current cell', function () {
        testObj.cells[1][1].setAlive();
        testObj.cells[1][2].setAlive();
        testObj.cells[1][3].setAlive();
        testObj.cells[2][1].setAlive();
        testObj.cells[2][2].setAlive();
        testObj.cells[2][3].setAlive();

        assert.equal(testObj._getNeighborCount(1, 1), 3);
        assert.equal(testObj._getNeighborCount(2, 2), 5);
        assert.equal(testObj._getNeighborCount(3, 3), 2);
    });

    it('Create or destroy current cell', function () {
        testObj.cells[0][0].setAlive();
        testObj.cells[0][3].setAlive();
        testObj.cells[1][0].setAlive();
        testObj.cells[1][2].setAlive();
        testObj.cells[1][3].setAlive();
        testObj.cells[2][1].setAlive();
        testObj.cells[2][2].setAlive();
        testObj.cells[2][3].setAlive();

        assert.equal(testObj._cellViability(0, 1), 1);
        assert.equal(testObj._cellViability(0, 2), 1);
        assert.equal(testObj._cellViability(2, 2), 0);
        assert.equal(testObj._cellViability(3, 3), 0);
    });

    it('Loop check', function () {
        testObj.cells[1][3].setAlive();
        testObj.cells[2][3].setAlive();
        testObj.cells[3][3].setAlive();

        assert.equal(testObj._cellViability(2, 2), 1);
        assert.equal(testObj._cellViability(2, 3), 1);
        assert.equal(testObj._cellViability(2, 4), 1);
    });

    it('Static check', function () {
        testObj.cells[1][3].setAlive();
        testObj.cells[2][3].setAlive();
        testObj.cells[1][4].setAlive();
        testObj.cells[2][4].setAlive();

        assert.equal(testObj._cellViability(1, 3), 1);
        assert.equal(testObj._cellViability(2, 3), 1);
        assert.equal(testObj._cellViability(1, 4), 1);
        assert.equal(testObj._cellViability(2, 4), 1);
    });

    it('Low population check', function () {
        let a = ActionScreen._cellsLowPopulation(3, 2);
        assert.equal(a, false);
    });

    it('Over population check', function () {
        let a = ActionScreen._cellsOverPopulation(3, 2);
        assert.equal(a, true);
    });

    it('Optimal population check', function () {
        let a = ActionScreen._cellsOptimalPopulation(3, 3);
        assert.equal(a, true);
    });
});

