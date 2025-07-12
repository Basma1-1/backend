const { Notification, User } = require("../models");

// voir toutes les notifications 
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: User, attributes: ["id", "name", "email"], required: false, }],
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (err) {
    console.error("Erreur chargement notifications:", err); 
    res.status(500).json({ message: "Erreur chargement notifications", error: err.message });
  }
};

// voir une notification par ID 
exports.getNotificationById = async (req, res) => {
  try {
    const notif = await Notification.findByPk(req.params.id);
    if (!notif) {
      return res.status(404).json({ error: "Notification non trouvée" });
    }
    res.json(notif);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// supprimer une notification
exports.deleteNotification = async (req, res) => {
  try {
    const notif = await Notification.findByPk(req.params.id);
    if (!notif) return res.status(404).json({ message: "Notification non trouvée" });

    await notif.destroy();
    res.json({ message: "Notification supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", error: err.message });
  }
};

// créer une notification manuellement
exports.createNotification = async (req, res) => {
  try {
    console.log("Requête création notification, body =", req.body);
    const { userId, message, type } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ message: "userId et message sont obligatoires" });
    }

    const notification = await Notification.create({
      UserId: userId,
      message,
      type: type || "confirmation",
      lu: false,
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Erreur création notification", error: err.message });
  }
};

// envoyer  notification à un utilisateur
exports.envoyerNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "userId et message sont requis" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const notification = await Notification.create({
      UserId: user.id,
      message,
      type: type || "admin",
      lu: false
    });

    res.status(201).json({ message: "Notification envoyée", data: notification });
  } catch (err) {
    res.status(500).json({ message: "Erreur envoi", error: err.message });
  }
};

// envoyer une notification à tous les utilisateurs
exports.envoyerNotificationTous = async (req, res) => {
  try {
    const { message, type } = req.body;

    if (!message) return res.status(400).json({ message: "Message requis" });

    const users = await User.findAll();

    const envois = users.map((user) =>
      Notification.create({
        UserId: user.id,
        message,
        type: type || "admin",
        lu: false
      })
    );

    await Promise.all(envois);

    res.status(201).json({ message: "Notifications envoyées à tous" });
  } catch (err) {
    res.status(500).json({ message: "Erreur envoi collectif", error: err.message });
  }
};

// mettre à jour le contenu d'une notification
exports.updateNotification = async (req, res) => {
  try {
    const notif = await Notification.findByPk(req.params.id);
    if (!notif) {
      return res.status(404).json({ error: "Notification non trouvée" });
    }
    notif.message = req.body.message;
    await notif.save();
    res.json({ message: "Notification mise à jour avec succès", notif });
  } catch (error) {
    console.error("Erreur update :", error);
    res.status(500).json({ error: "Erreur mise à jour" });
  }
};
