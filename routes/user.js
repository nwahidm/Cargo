const express = require("express");
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", UserController.register);
router.post("/login", UserController.login);
router.post("/", authentication, UserController.fetchAllUser);
router.get("/:id", authentication, UserController.fetchDetailUser);
router.put("/:id", authentication, UserController.updateUser);
router.delete("/:id", authentication, UserController.deleteUser);

module.exports = router;
