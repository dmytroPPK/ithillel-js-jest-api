const { CarsController } = require("../../src/controllers/CarsController");

describe("Negative test suite of cars controller", () => {

    let carsController = null;
    let brandsID = null;
    let modelsID = null;

    beforeAll(async () => {

        carsController = new CarsController();
        await carsController.login();

        brandsID = (await carsController.getAllBrands()).data.data.map(brand=>brand.id);
        modelsID = (await carsController.getAllModels()).data.data.map(model=>model.id);

    });

    test("should not create car with not existed Brand ID", async () => {

        let maxBrandId = Math.max(...brandsID);
        let modelId = modelsID[Math.floor(Math.random() * modelsID.length)];

        let addCarResponce = await carsController.addCar({
            carBrandId: ++maxBrandId,
            carModelId: modelId,
            mileage: 50,
        });

        expect(addCarResponce.status).toBe(404);
        expect(addCarResponce.data.message).toBe("Brand not found");

    });

    test("should not create car with not existed Model ID", async () => {

        let brandId = brandsID[Math.floor(Math.random() * brandsID.length)];
        let maxModelId = Math.max(...modelsID);

        let addCarResponce = await carsController.addCar({
            carBrandId: brandId,
            carModelId: ++maxModelId,
            mileage: 50,
        });

        expect(addCarResponce.status).toBe(404);
        expect(addCarResponce.data.message).toBe("Model not found");

    });

    test("should not create car with invalid type of mileage", async () => {

        let brandId = brandsID[Math.floor(Math.random() * brandsID.length)];
        let modelId = modelsID[Math.floor(Math.random() * modelsID.length)];

        let addCarResponce = await carsController.addCar({
            carBrandId: brandId,
            carModelId: modelId,
            mileage: "some text",
        });

        expect(addCarResponce.status).toBe(400);
        expect(addCarResponce.data.message).toBe("Invalid mileage type");

    });

    test("should not get brand with invalid brandId", async () => {

        let maxBrandId = Math.max(...brandsID);

        let getBrandByIdResponce = await carsController.getBrandById(++maxBrandId);

        expect(getBrandByIdResponce.status).toBe(404);
        expect(getBrandByIdResponce.data.message).toBe("No car brands found with this id");

    });

    test("should not get model with invalid modelId", async () => {

        let maxModelId = Math.max(...modelsID);

        let getModelByIdResponce = await carsController.getModelById(++maxModelId);

        expect(getModelByIdResponce.status).toBe(404);
        expect(getModelByIdResponce.data.message).toBe("No car models found with this id")

    })

});

