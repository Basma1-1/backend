const { User } = require("../models");

// Lister tous les utilisateurs (sans le mot de passe)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Modifier un utilisateur (ex: role, email, username)
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.update({ username, email, role });
    res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour utilisateur", error });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression utilisateur", error });
  }
};
