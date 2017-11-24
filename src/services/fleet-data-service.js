import { Car } from '../classes/car.js';
import { drone } from '../classes/drone.js';
import { DataError } from './data-error.js';

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }
    getcarsSortedBylicense() {
        return this.cars.sort(function(car1, car2) {
            if (car1.license < car2.license) {
                return -1;
            }
            if (car1.license > car2.license) {
                return 1;
            }
            return 0;
        })
    }
    getCarByLicence(license) {
        return this.cars.find(function(car) {
            return car.license === license;
        })

    }
    filterCarsByMake(filter) {
        return this.cars.filter(car => car.make.indexOf(filter) >= 0);
    }
    loadData(fleet) {
        for (let data of fleet) {
            switch (data.type) {
                case 'car':
                    if (this.validateCarData(data)) {
                        let car = this.loadCar(data)
                        if (car) {
                            this.cars.push(car);
                        }
                    } else {
                        let e = new DataError('Invalid car data', data);
                        this.errors.push(e);
                    }
                    break;

                case 'drone':
                    this.drones.push(data);
                    break;
                default:
                    let e = new DataError('Invalid Vehicle type');
                    this.errors.push(e);
                    break;

            }
        }
    }
    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch (e) {
            this.errors.push(new DataError('Error loading Car', car))
        }
        return null;

    }
    validateCarData(car) {
        let requiredProps = "license model latLong miles make".split(' ');
        let hasErrors = false;
        for (let field of requiredProps) {
            // console.log(field);
            if (!car[field]) {
                this.errors.push(new DataError(`Invalid field ${field}`, car));
                hasErrors = true;
            }

        }
        if (Number.isNaN(Number.parseFloat(car.miles))) {
            this.errors.push(new DataError('Invalid Milage', car));
            hasErrors = true;
        }
        return !hasErrors;
    }

};