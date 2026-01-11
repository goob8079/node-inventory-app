const { Router } = require("express");
const inventoryController = require("../controller/inventoryController");

const router = Router();

router.get('/', inventoryController.succulentsHomepageGet);

module.exports = router;