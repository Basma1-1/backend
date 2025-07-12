const sequelize = require('../config/db');
const { Voyage, User, Reservation } = require('../models');

// obtenir les statistiques globales 
exports.getStats = async (req, res) => {
  try {
    const voyagesCount = await Voyage.count();
    const usersCount = await User.count();
    const reservationsCount = await Reservation.count();
    const reservationsPerMonth = await sequelize.query(`
        SELECT DATE_FORMAT(reservation_date, '%b') AS month, COUNT(*) AS count
        FROM Reservations
        GROUP BY DATE_FORMAT(reservation_date, '%b')
        ORDER BY MIN(reservation_date)
`, { type: sequelize.QueryTypes.SELECT });

    console.log({
      voyagesCount,
      usersCount,
      reservationsCount,
      reservationsPerMonth
    });

    res.json({
      voyagesCount,
      usersCount,
      reservationsCount,
      reservationsPerMonth
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur récupération stats" });
  }
};
