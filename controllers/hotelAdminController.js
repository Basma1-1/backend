const { Hotel, Voyage } = require("../models");

// ajouter hotel
exports.createHotel = async (req, res) => {
  try {
    const { voyageId } = req.params;
    const { nom, adresse, etoiles, prixParNuit } = req.body;

    // Vérifie si le voyage existe
    const voyage = await Voyage.findByPk(voyageId);
    if (!voyage) return res.status(404).json({ message: "Voyage non trouvé" });

    const hotel = await Hotel.create({ hotel_name, adresse, price, VoyageId: voyageId });
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'hôtel", error: err.message });
  }
};

// modifier hotel
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hôtel introuvable" });

    await hotel.update(req.body);
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
  }
};

// supprimer hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hôtel introuvable" });

    await hotel.destroy();
    res.json({ message: "Hôtel supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};

// voir tous hotels
exports.getHotelsByVoyage = async (req, res) => {
  try {
    const { voyageId } = req.params;
    const hotels = await Hotel.findAll({ where: { VoyageId: voyageId } });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};
