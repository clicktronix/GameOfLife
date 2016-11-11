/**
 * Created by clicktronix on 30.10.16.
 */

export default class Cell {
    constructor () {
        this.status = false;
        this._alive = true;
        this._dead = false;
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill('#666666')
            .beginStroke('#999999')
            .drawRect(0, 0, 15, 15);
    }
};

Cell.prototype.makeAlive = function () {
    this.status = this._alive;
    this.shape.graphics.beginFill('#00ff99')
        .beginStroke('#999999')
        .drawRect(0, 0, 15, 15);
};

Cell.prototype.makeDead = function () {
    this.status = this._dead;
    this.shape.graphics.beginFill('#666666')
        .beginStroke('#999999')
        .drawRect(0, 0, 15, 15);
};