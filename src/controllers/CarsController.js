const {BaseController} = require("./BaseController.js")

class CarsController extends BaseController{
    constructor(){
        super();
        this.API_CARS = '/cars';
		this.API_CARS_ID = '/cars/{id}';
        this.API_CARS_BRANDS = '/cars/brands';
		this.API_CARS_BRANDS_ID = '/cars/brands/{id}';
        this.API_CARS_MODELS = '/cars/models';
        this.API_CARS_MODELS_ID = '/cars/models/{id}';

    }

    async addCar(car){
        return this.post(this.API_CARS, car);
    }

    async getAllCars(){
        return this.get(this.API_CARS);
    }

    async getCarById(id){
        return this.get(this.API_CARS_ID.replace("{id}", id));
    }

    async deleteCarById(id){
        return this.delete(this.API_CARS_ID.replace("{id}", id));
    }

    async getAllBrands(){
        return this.get(this.API_CARS_BRANDS);
    }

    async getBrandById(id){
        return this.get(this.API_CARS_BRANDS_ID.replace("{id}", id));
    }

    async getAllModels(){
        return this.get(this.API_CARS_MODELS);
    }

    async getModelById(id){
        return this.get(this.API_CARS_MODELS_ID.replace("{id}", id));
    }
}

module.exports = {
    CarsController,
}