const express = require("express");
const router = express.Router();
const userAdminController = require("../controllers/userAdminController");

router.get("/", userAdminController.getAllUsers);
router.put("/:id", userAdminController.updateUser);
router.delete("/:id", userAdminController.deleteUser);

module.exports = router;
