const { Router } = require("express");
const inventoryController = require("../controller/inventoryController");

const router = Router();

router.get('/', inventoryController.succulentsHomepageGet);
router.get('/succulent/:id', inventoryController.viewSucculentInfoGet);
router.get('/newPlant', inventoryController.newPlantGet);
router.post('/newPlant', 
    inventoryController.validatePlant,
    inventoryController.validatePlantPassword,
    inventoryController.newPlantPost
);
router.post('/delete/:id', 
    inventoryController.validateDeletePassword,
    inventoryController.deleteSucculentPost
);

module.exports = router;