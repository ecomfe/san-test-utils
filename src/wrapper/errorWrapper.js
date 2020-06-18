/**
 * @file san test utils error wrapper file
 **/

export default class ErrorWrapper {
    constructor(selector) {
        this.selector = selector;
    }

    exists() {
        return false;
    }

    isVisible() {
        return false;
    }
}
