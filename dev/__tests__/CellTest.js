/**
 * Created by clicktronix on 01.12.16.
 */

import assert from 'assert';
import Cell from '../View/Cell';

describe("Cell tests", function() {
    it("Change the cells status on Alive", function() {
        let cell = new Cell();
        cell.setAlive();
        assert.equal(cell.status, true);
    });

    it("Change the cells status on Dead", function() {
        let cell = new Cell();
        cell.setDead();
        assert.equal(cell.status, false);
    });
});