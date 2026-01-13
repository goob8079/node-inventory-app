const { Router } = require("express");
const inventoryController = require("../controller/inventoryController");

const router = Router();

router.get('/', inventoryController.succulentsHomepageGet);
router.get('/succulent/:id', inventoryController.viewSucculentInfoGet);

module.exports = router;