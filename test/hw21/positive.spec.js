const { CarsController } = require("../../src/controllers/CarsController");

describe("Should create cars for all brands combine with all models", () => {

    let carsController = null;
    let testTable = __GDATA__.testTable

    beforeAll(async () => {

        carsController = new CarsController();
        await carsController.login();

        let allCars = (await carsController.getAllCars()).data.data;
        if (allCars.length) {
            await Promise.all(allCars.map(car => carsController.deleteCarById(car.id)));
        }
        
    });

    test.each(testTable)("should create the car", async ({ carBrandId, carModelId }) => {

        let addCarResponce = await carsController.addCar({
            carBrandId,
            carModelId,
            mileage: 50,
        });

        expect(addCarResponce.status).toBe(201);
        expect(addCarResponce.statusText).toBe("Created");
        expect(addCarResponce.data.data.carBrandId).toBe(carBrandId);
        expect(addCarResponce.data.data.carModelId).toBe(carModelId);

    });

    test("Verify QNT of created cars for current user", async () => {

        let lengthCreatedCars = (await carsController.getAllCars()).data.data.length;
        expect(lengthCreatedCars).toBe(testTable.length);

    });

});

