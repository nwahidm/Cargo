const express = require("express");
const BranchController = require("../controllers/branch");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, BranchController.create);
router.post("/", authentication, BranchController.fetchAllBranchs);
router.get("/:id", authentication, BranchController.fetchDetailBranch);
router.put("/:id", authentication, BranchController.updateBranch);
router.delete("/:id", authentication, BranchController.deleteBranch);

module.exports = router;
