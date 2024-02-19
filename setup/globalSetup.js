const { CarsController } = require("../src/controllers/CarsController");

module.exports = async function (globalConfig, projectConfig) {
    try {
        globalThis.__GDATA__ =
        {
            testTable: await prepareTestTable(),
        };
    } catch (e) {
        console.log(e);
    }
};

const prepareTestTable = async () => {
    let carsController = new CarsController();
    await carsController.login();

    let allBrands = await carsController.getAllBrands();
    let allBrandsId = allBrands.data.data.map(brandObj => brandObj.id);

    let allModels = await carsController.getAllModels();
    let arrayOfModels = allModels.data.data.map(model => ({
        carBrandId: model.carBrandId,
        carModelId: model.id,
    }));

    let testTable = arrayOfModels.filter(model => allBrandsId.includes(model.carBrandId));
    return testTable;
};
