const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, notificationController.getNotifications);

module.exports = router;




