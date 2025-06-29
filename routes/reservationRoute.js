const express = require('express');
const router = express.Router();

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
// Protège la route avec verifyToken (utilisateur connecté)
router.put("/confirm/:id", verifyToken, reservationController.confirmReservation);

module.exports = router;



