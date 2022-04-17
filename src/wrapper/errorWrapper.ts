/**
 * @file san test utils error wrapper file
 **/

export default class ErrorWrapper {
    selector: string
    constructor(selector: string) {
        this.selector = selector;
    }

    exists() {
        return false;
    }

    isVisible() {
        return false;
    }
}
