const { Op } = require('sequelize');
const { Voyage, Hotel, Transport, Activity } = require('../models');

// recherche des voyages pour utilsareur connecter et anonyme
exports.searchVoyages = async (req, res) => {
  const { destination, date } = req.query;
  try {
    const conditions = [];

    if (destination) {
      console.log("Recherche destination:", destination);
      conditions.push({
        destination: {
          [Op.like]: destination.trim()
        }
      });
    }

    if (date) {
      const searchDate = new Date(date);
      console.log("Recherche date:", searchDate);
      conditions.push({ 
        start_date: { [Op.lte]: searchDate } });
      conditions.push({ 
        end_date: { [Op.gte]: searchDate } });
    }

    const voyages = await Voyage.findAll({
      where: conditions.length > 0 ? { [Op.and]: conditions } : {},
      include: [Hotel, Transport, Activity],
      logging: console.log
    });

    if (voyages.length === 0) {
      return res.status(404).json({ message: "Voyage introuvable" });
    }

    res.json(voyages);
  } catch (error) {
    console.error("Erreur Sequelize :", error);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
};

// detail de voyage pour utilisateur anonyme
exports.getVoyageDetailsAnonymous = async (req, res) => {
  res.status(401).json({
    message: "Vous devez vous connecter pour voir les détails du voyage",
    requireAuth: true
  });
};

// detail de voyage  pour utilisateur connecté
exports.getVoyageDetailsForUser = async (req, res) => {
  try {
    const voyage = await Voyage.findByPk(req.params.id, {
      include: [Hotel, Transport, Activity],
    });
    if (!voyage) {
      return res.status(404).json({ error: "Voyage introuvable" });
    }
    res.json(voyage);
  } catch (err) {
    res.status(500).json({ error: "Erreur de récupération", details: err.message });
  }
};
