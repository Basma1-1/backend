const { Transport, Voyage } = require("../models");

// ajouter  transport 
exports.createTransport = async (req, res) => {
  try {
    const { voyageId } = req.params;
    const { transport_type, compagnie, depart_point, arrival_point,time, prix } = req.body;

    const voyage = await Voyage.findByPk(voyageId);
    if (!voyage) return res.status(404).json({ message: "Voyage non trouvé" });

    const transport = await Transport.create({
      transport_type, compagnie, depart_point, arrival_point,time, prix, VoyageId: voyageId
    });

    res.status(201).json(transport);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du transport", error: err.message });
  }
};

// modifier  transport
exports.updateTransport = async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) return res.status(404).json({ message: "Transport introuvable" });

    await transport.update(req.body);
    res.json(transport);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

// supprimer  transport
exports.deleteTransport = async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) return res.status(404).json({ message: "Transport introuvable" });

    await transport.destroy();
    res.json({ message: "Transport supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};

// lister  transports  
exports.getTransportsByVoyage = async (req, res) => {
  try {
    const transports = await Transport.findAll({
      where: { VoyageId: req.params.voyageId }
    });
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};
