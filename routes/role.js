const express = require("express");
const RoleController = require("../controllers/role");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, RoleController.create);
router.post("/", authentication, RoleController.fetchAllRoles);
router.get("/:id", authentication, RoleController.fetchDetailRole);
router.put("/:id", authentication, RoleController.updateRole);
router.delete("/:id", authentication, RoleController.deleteRole);

module.exports = router;
