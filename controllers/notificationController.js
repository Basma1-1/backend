const { Notification, User } = require("../models");

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "UserId manquant dans le token" });
    }

    const notifications = await Notification.findAll({
      where: { UserId: userId },
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json(notifications);
  } catch (err) {
    console.error("Erreur chargement notifications :", err);
    res.status(500).json({ error: "Erreur chargement notifications", details: err.message });
  }
};


exports.confirmReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
       return res.status(404).json({ message: "Réservation introuvable" });
    }

    console.log("Réservation récupérée :", reservation.toJSON());

    reservation.status = "valide";
    await reservation.save();

    const documentUrl = `http://localhost:8080/documents/reservation-${reservation.id}.pdf`;

    if (!reservation.UserId) {
      return res.status(400).json({ message: "La réservation n'a pas d'utilisateur associé" });
    }

    await Notification.create({
      UserId: reservation.UserId,
      message: `Votre réservation ${reservation.id} est confirmée.`,
      documentUrl,
      date: new Date(),
    });

    res.json({ message: "Réservation confirmée" });
  } catch (err) {
    console.error(err);
    console.error("Erreur dans confirmReservation :", err);
    res.status(500).json({ error: "Erreur confirmation" });
  }
};




