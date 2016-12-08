/**
 * Created by clicktronix on 01.12.16.
 */

import assert from 'assert';
import Cell from '../Model/Cell';

describe('Cell tests', function () {
    it('Change the cells status on Alive', function () {
        const cell = new Cell();
        cell.setAlive();
        assert.equal(cell.status, true);
    });

    it('Change the cells status on Dead', function () {
        const cell = new Cell();
        cell.setDead();
        assert.equal(cell.status, false);
    });
});