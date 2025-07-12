const express = require('express');
const router = express.Router();
const { downloadReservationPDF } = require('../controllers/pdfController');

router.get('/pdf/:reservationId', downloadReservationPDF);

module.exports = router;
