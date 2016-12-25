/**
 * Created by clicktronix on 30.10.16.
 */

class Cell {
    constructor() {
        this.status = false;
    }

    setAlive() {
        this.status = true;
    }

    setDead() {
        this.status = false;
    }
}

export default Cell;