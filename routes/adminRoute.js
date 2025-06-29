const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");
const adminController = require("../controllers/adminController");

//router.use(verifyToken, isAdmin);

// gestion utilisateur
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);
router.put("/users/:id/role", adminController.changeUserRole);
router.get("/dashboard", (req, res) => {
  res.json({
    message: "Bienvenue dans espace administration",
    user: req.user
  });
});

module.exports = router;
