const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Role, } = require("../models");

// connecter admin 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ 
      where: { email },
      include: [Role]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    if (user.Role.name !== 'admin') {
      return res.status(403).json({ message: "Accès réservé aux administrateurs" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.Role.name } });
  } catch (err) {
    res.status(500).json({ message: "Erreur connexion", error: err.message });
  }
};

// récupération des utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Role] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur chargement utilisateurs", error: err.message });
  }
};

// suppression des utilisateurs
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (req.user.id === user.id) {
      return res.status(403).json({ message: "Vous ne pouvez pas vous supprimer vous-même" });
    }

    await user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", error: err.message });
  }
};

// change le role utilisateur
exports.changeUserRole = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { roleId } = req.body;

    if (!roleId) return res.status(400).json({ message: "roleId est requis" });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ message: "Rôle non trouvé" });

    user.RoleId = roleId;
    await user.save();

    res.json({ message: "Rôle modifié" });
  } catch (err) {
    res.status(500).json({ message: "Erreur changement rôle", error: err.message });
  }
};


