/**
 * Created by clicktronix on 30.10.16.
 */

export default class Cell {
    constructor () {
        this.status = 0;
        this._alive = 1;
        this._dead = 0;
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill('#666666')
            .beginStroke('#999999')
            .drawRect(0, 0, 10, 10);
    }
};

Cell.prototype.makeAlive = function () {
    this.status = this._alive;
    this.shape.graphics.beginFill('#00ff99')
        .beginStroke('#999999')
        .drawRect(0, 0, 10, 10);
};

Cell.prototype.makeDead = function () {
    this.status = this._dead;
    this.shape.graphics.beginFill('#666666')
        .beginStroke('#999999')
        .drawRect(0, 0, 10, 10);
};