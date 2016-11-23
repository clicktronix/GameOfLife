/**
 * Created by clicktronix on 30.10.16.
 */

import ActionScreen from '../model/action-screen.js';
import View from '../View/View';

class Controller {
    constructor() {
        const actionScreen = new ActionScreen(40);
        const view = new View(actionScreen);
    }
}

export default Controller;
