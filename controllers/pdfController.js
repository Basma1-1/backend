const { generateReservationPDF } = require('../utils/pdfGenerator');
const { getReservationDetails } = require('../services/reservationService');
const path = require('path');

exports.downloadReservationPDF = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;

    const { reservation, voyage, hotel, transport, activities } = await getReservationDetails(reservationId);

    const pdfPath = await generateReservationPDF(reservation, voyage, hotel, transport, activities);

    res.download(pdfPath, `reservation_${reservationId}.pdf`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la génération du PDF' });
  }
};
