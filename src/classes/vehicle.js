export class Vehicle {
    constructor(license, model, latLong) {
        this.license = license;
        this.model = model;
        this.latLong = latLong;

    }
    get id() {
        console.log('get:  ')

    }
    set id(value) {
        console.log('get:  ')
    }
}