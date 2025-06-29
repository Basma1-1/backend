const { Activity, Voyage } = require("../models");

// ajouter activity
exports.createActivity = async (req, res) => {
  try {
    const { voyageId } = req.params;
    const { activity_name, description, date, activity_time, price } = req.body;

    const voyage = await Voyage.findByPk(voyageId);
    if (!voyage) return res.status(404).json({ message: "Voyage non trouvé" });

    const activity = await Activity.create({
    activity_name, description, date, activity_time, price, VoyageId: voyageId
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: "Erreur création activité", error: err.message });
  }
};

// modifier activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activité introuvable" });

    await activity.update(req.body);
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Erreur modification", error: err.message });
  }
};

// supprimer activity
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activité introuvable" });

    await activity.destroy();
    res.json({ message: "Activité supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", error: err.message });
  }
};

// lister activity
exports.getActivitiesByVoyage = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { VoyageId: req.params.voyageId }
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération", error: err.message });
  }
};
