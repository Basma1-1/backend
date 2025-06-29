const express = require('express');
const router = express.Router();

const voyageController = require('../controllers/voyageUserController');
const verifyToken = require("../middleware/verifyToken");

//  rechercher les voyages pour utilisateur connecte et anonyme
router.get('/search', voyageController.searchVoyages);

// detail voyage pour utilisateur anonyme
router.get('/anonymous/:id', voyageController.getVoyageDetailsAnonymous);

// detail pour utilisateur connecter
router.get('/:id', verifyToken, voyageController.getVoyageDetailsForUser);

module.exports = router;