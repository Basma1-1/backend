const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");
const verifyToken = require("../middleware/verifyToken");

// Récupérer toutes les notifications de utilisateur connecte
router.get("/", verifyToken, notificationController.getNotifications);

module.exports = router;




