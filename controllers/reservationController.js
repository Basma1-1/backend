const { Voyage, Hotel, Transport, Activity, Reservation, Document, Notification } = require('../models');

// creer la reservation
exports.createReservation = async (req, res) => {
  console.log("Requête reçue avec body:", req.body);
  console.log("Fichiers reçus:", req.files);
  try {
    const { voyageId, price, method, hotelId, transportId, activities } = req.body;

    // verification voyage
    const voyage = await Voyage.findByPk(voyageId);
    if (!voyage) return res.status(400).json({ error: "VoyageId invalide" });

    // verification hôtel
    let hotel = null;
    if (hotelId) {
      hotel = await Hotel.findByPk(hotelId);
      if (!hotel) return res.status(400).json({ error: "HotelId invalide" });
    }

    // verification transport
    let transport = null;
    if (transportId) {
      transport = await Transport.findByPk(transportId);
      if (!transport) return res.status(400).json({ error: "TransportId invalide" });
    }

    // verification activity
    let activityList = [];
    if (activities) {
      const activitiesArray = JSON.parse(activities);
      const ids = activitiesArray.map(act => act.id);  // extraire les ids
      const validActivities = await Activity.findAll({ where: { id: ids } });
      if (validActivities.length !== ids.length) {
        return res.status(400).json({ error: "Une ou plusieurs ActivityId sont invalides" });
      }
      activityList = ids;
    }

    // creation reservation
    const reservation = await Reservation.create({
      UserId: req.user.id,
      VoyageId: voyage.id,
      price,
      method: method || 'card',
      reservation_status: 'valide',
      reservation_date: new Date(),
      HotelId: hotel ? hotel.id : null,
      TransportId: transport ? transport.id : null,
    });

    // associer activity
    if (activityList.length > 0) {
      await reservation.setActivities(activityList);
    }

    // enregistrer documents upload
    const files = req.files;
    console.log("Fichiers reçus :", files);

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    try {
      for (const type in files) {
        const file = files[type][0];
        await Document.create({
          type,
          filePath: file.path,
          fileName: file.originalname,
          format: file.mimetype,
          taille: file.size,
          ReservationId: reservation.id,
        });
      }
    } catch (error) {
      console.error("Erreur création document :", error);
      return res.status(500).json({ error: "Erreur lors de l’enregistrement des documents", details: error.message });
    }

    res.status(201).json({
      message: "Réservation enregistrée avec succès",
      reservation,
      voyageDetails: voyage
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de réservation", details: err.message });
  }
};

// obtenir  reservations
exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { UserId: req.user.id },
      include: [Voyage, Document],
    });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du chargement des réservations" });
  }
};

exports.confirmReservation = async (req, res) => {
  const { reservationId } = req.body;
  try {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) return res.status(404).json({ error: "Réservation non trouvée" });

    reservation.reservation_status = 'valide';
    await reservation.save();

    await Notification.create({
      UserId: reservation.UserId,
      type: 'confirmation',
      message: `Votre réservation ${reservation.id} est confirmée.`,
      reservationId: reservation.id
    });

    return res.json({ message: "Réservation confirmée avec notification" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la confirmation" });
  }
};

exports.cancelReservation = async (req, res) => {
  const { reservationId } = req.body;
  console.log("Annulation de réservation ID :", reservationId);
  try {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) return res.status(404).json({ error: "Réservation non trouvée" });

    reservation.reservation_status = 'annulee';
    await reservation.save();

    await Notification.create({
      UserId: reservation.UserId,
      type: 'annulation',
      message: `Votre réservation ${reservation.id} a été annulée.`,
      reservationId: reservation.id
    });

    return res.json({ message: "Réservation annulée avec notification" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de l'annulation" });
  }
};
