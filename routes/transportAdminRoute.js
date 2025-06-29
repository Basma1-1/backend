const express = require('express');
const router = express.Router();
const transportAdminController = require('../controllers/transportAdminController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

router.use(verifyToken, isAdmin);
// ajouter transport 
router.post('/:voyageId', transportAdminController.createTransport);

// Modifier transport
router.put('/:id', transportAdminController.updateTransport);

// Supprimer transport
router.delete('/:id', transportAdminController.deleteTransport);

// Liste des transports 
router.get('/voyage/:voyageId', transportAdminController.getTransportsByVoyage);

module.exports = router;
