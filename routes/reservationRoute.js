const express = require('express');
const router = express.Router();
const fs = require('fs');

const { generateReservationPDF } = require('../utils/pdfGenerator');
const reservationController = require('../controllers/reservationController');
const verifyToken  = require('../middleware/verifyToken');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', verifyToken, upload.fields([
  { name: 'passport', maxCount: 1 },
  { name: 'cni', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), reservationController.createReservation);

router.get('/myreservation', verifyToken, reservationController.getUserReservations);
router.post('/confirm', verifyToken, reservationController.confirmReservation);
router.post('/cancel', verifyToken, reservationController.cancelReservation);
router.post('/', reservationController.createReservation);
router.put("/confirm/:id", verifyToken, reservationController.confirmReservation);

router.get('/pdfs/reservation/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId)
      .populate('voyage hotel transport activities'); 

    if (!reservation) {
      return res.status(404).send("Réservation non trouvée.");
    }

    const pdfPath = await generateReservationPDF(
      reservation,
      reservation.voyage,
      reservation.hotel,
      reservation.transport,
      reservation.activities
    );
    res.sendFile(pdfPath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de la génération du PDF.");
  }
});

module.exports = router;



