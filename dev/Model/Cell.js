/**
 * Created by clicktronix on 30.10.16.
 */

class Cell {
    constructor() {
        this.status = false;
    }
}

Cell.prototype.setAlive = function () {
    this.status = true;
};

Cell.prototype.setDead = function () {
    this.status = false;
};

export default Cell;