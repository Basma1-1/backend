const express = require('express');
const router = express.Router();

const voyageController = require('../controllers/voyageUserController');
const verifyToken = require("../middleware/verifyToken");

router.get('/search', voyageController.searchVoyages);
router.get('/anonymous/:id', voyageController.getVoyageDetailsAnonymous);
router.get('/:id', verifyToken, voyageController.getVoyageDetailsForUser);

module.exports = router;