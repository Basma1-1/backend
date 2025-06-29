const express = require('express');
const router = express.Router();

const hotelAdminController = require('../controllers/hotelAdminController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

router.use(verifyToken, isAdmin);

// ajouter hotel
router.post('/:voyageId', hotelAdminController.createHotel);

// Modifier hotel
router.put('/:id',hotelAdminController.updateHotel);

// Supprimer hotel
router.delete('/:id', hotelAdminController.deleteHotel);

// Voir tous les hotel
router.get('/voyage/:voyageId', hotelAdminController.getHotelsByVoyage);

module.exports = router;
