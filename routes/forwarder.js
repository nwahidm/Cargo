const express = require("express");
const ForwarderController = require("../controllers/forwarder");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, ForwarderController.create);
router.post("/", authentication, ForwarderController.fetchAllForwarders);
router.get("/:id", authentication, ForwarderController.fetchDetailForwarder);
router.put("/:id", authentication, ForwarderController.updateForwarder);
router.delete("/:id", authentication, ForwarderController.deleteForwarder);

module.exports = router;
