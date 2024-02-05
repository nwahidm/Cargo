const express = require("express");
const ProvinceController = require("../controllers/province");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, ProvinceController.create);
router.post("/", authentication, ProvinceController.fetchAllProvinces);
router.get("/:id", authentication, ProvinceController.fetchDetailProvince);
router.put("/:id", authentication, ProvinceController.updateProvince);
router.delete("/:id", authentication, ProvinceController.deleteProvince);

module.exports = router;
