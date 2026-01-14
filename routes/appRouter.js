const { Router } = require("express");
const inventoryController = require("../controller/inventoryController");

const router = Router();

router.get('/', inventoryController.succulentsHomepageGet);
router.get('/succulent/:id', inventoryController.viewSucculentInfoGet);
router.post('/delete/:id', 
    inventoryController.validatePassword,
    inventoryController.deleteSucculentPost
);

module.exports = router;