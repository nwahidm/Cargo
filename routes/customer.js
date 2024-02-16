const express = require("express");
const CustomerController = require("../controllers/customer");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, CustomerController.create);
router.post("/", authentication, CustomerController.fetchAllCustomer);
router.get("/:id", authentication, CustomerController.fetchDetailCustomer);
router.put("/:id", authentication, CustomerController.updateCustomer);
router.delete("/:id", authentication, CustomerController.deleteCustomer);

module.exports = router;
