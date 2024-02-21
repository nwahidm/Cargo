const express = require("express");
const ServiceController = require("../controllers/service");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, ServiceController.create);
router.post("/", authentication, ServiceController.fetchAllServices);
router.get("/:id", authentication, ServiceController.fetchDetailService);
router.put("/:id", authentication, ServiceController.updateService);
router.delete("/:id", authentication, ServiceController.deleteService);

module.exports = router;
