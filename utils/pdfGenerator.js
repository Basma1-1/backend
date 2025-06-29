const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generateReservationPDF(reservation, voyage, hotel, transport, activities) {
  return new Promise((resolve, reject) => {
    try {

      const pdfDir = path.join(__dirname, '../pdfs');
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir);
      }

      const pdfPath = path.join(pdfDir, `reservation_${reservation.id}.pdf`);

      const doc = new PDFDocument();
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      doc.fontSize(20).text('Résumé de la réservation', { align: 'center' }).moveDown();

      doc.fontSize(14).text(`Voyage: ${voyage.description || 'N/A'}`);
      doc.text(`Départ: ${voyage.depart || 'N/A'}`);
      doc.text(`Destination: ${voyage.destination || 'N/A'}`);
      doc.text(`Date: ${voyage.start_date ? new Date(voyage.start_date).toLocaleDateString() : 'N/A'} à ${voyage.end_date ? new Date(voyage.end_date).toLocaleDateString() : 'N/A'}`);
      doc.moveDown();

      if (hotel) {
        doc.fontSize(14).text('Hôtel:', { underline: true });
        doc.text(`Nom: ${hotel.hotel_name}`);
        doc.text(`Adresse: ${hotel.address}`);
        doc.text(`Date: de ${hotel.start_date || 'N/A'} à ${hotel.end_date || 'N/A'}`);
        doc.text(`Prix: ${hotel.price} €`);
        doc.moveDown();
      }

      if (transport) {
        doc.fontSize(14).text('Transport:', { underline: true });
        doc.text(`Type: ${transport.transport_type}`);
        doc.text(`Compagnie: ${transport.company}`);
        doc.text(`Trajet: de ${transport.depart_point} à ${transport.arrival_point}`);
        doc.text(`Date départ: ${transport.departure_date || 'N/A'}`);
        doc.text(`Heure départ: ${transport.departure_time || 'N/A'}`);
        doc.text(`Date retour: ${transport.return_date || 'N/A'}`);
        doc.text(`Heure retour: ${transport.return_time || 'N/A'}`);
        doc.text(`Prix: ${transport.price} €`);
        doc.moveDown();
      }

      if (activities && activities.length > 0) {
        doc.fontSize(14).text('Activités:', { underline: true });
        activities.forEach((act, idx) => {
          doc.text(`${idx + 1}. ${act.activity_name} - Date: ${act.date}, Heure: ${act.activity_time}, Prix: ${act.price} €`);
        });
        doc.moveDown();
      }

      doc.fontSize(16).text(`Prix total: ${reservation.price} €`, { align: 'right' });

      doc.end();

      stream.on('finish', () => {
        resolve(pdfPath);
      });

      stream.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateReservationPDF };
