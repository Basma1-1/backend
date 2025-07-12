const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const adminNotificationController = require("../controllers/adminNotificationController");

router.use(verifyToken);

router.get("/", adminNotificationController.getAllNotifications);
router.get("/:id", isAdmin, adminNotificationController.getNotificationById); 
router.post("/",isAdmin, adminNotificationController.createNotification);
router.delete("/:id",isAdmin,  adminNotificationController.deleteNotification);
router.put("/:id",isAdmin, adminNotificationController.updateNotification);
router.post("/envoyer",isAdmin, adminNotificationController.envoyerNotification);
router.post("/envoyer-tous",isAdmin, adminNotificationController.envoyerNotificationTous);

module.exports = router;

