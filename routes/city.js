const express = require("express");
const CityController = require("../controllers/city");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, CityController.create);
router.post("/", authentication, CityController.fetchAllCities);
router.get("/:id", authentication, CityController.fetchDetailCity);
router.put("/:id", authentication, CityController.updateCity);
router.delete("/:id", authentication, CityController.deleteCity);

module.exports = router;
