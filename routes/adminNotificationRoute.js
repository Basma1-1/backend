const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const adminNotificationController = require("../controllers/adminNotificationController");

router.use(verifyToken);

router.get("/", adminNotificationController.getAllNotifications);
router.get("/:id", isAdmin, adminNotificationController.getNotificationById); // ✅ AJOUT ICI
router.post("/",isAdmin, adminNotificationController.createNotification);
router.delete("/:id",isAdmin,  adminNotificationController.deleteNotification);
router.put("/:id",isAdmin, adminNotificationController.updateNotification);


// envoyer a un utilisateur specifique
router.post("/envoyer",isAdmin, adminNotificationController.envoyerNotification);

// Envoyer a tous les utilisateurs
router.post("/envoyer-tous",isAdmin, adminNotificationController.envoyerNotificationTous);

module.exports = router;

