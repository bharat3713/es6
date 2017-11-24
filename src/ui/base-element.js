import $ from 'jquery';

export class BaseElement {
    constructor() {
        this.element = null; //jquery object
    }

    appendToElement(el) {
        this.createElement();
        el.append(this.element);
        this.enableJs();
    }

    createElement() {
        let s = this.getElementString();
        this.element = $(s);
    }

    getElementString() {
        throw 'Please override getElementString() in BaseElement';
    }
    enableJs() {
        componentHandler.upgradeElement(this.element[0]);
    }
}