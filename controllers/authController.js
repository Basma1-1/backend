const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User , Role } = require('../models');

// inscription
exports.register = async (req, res) => {
    console.log("Inscription reçue:", req.body); 
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

     if (password.length < 6) {
      return res.status(400).json({ 
        error: "Le mot de passe doit contenir au moins 6 caractères" 
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const hash = await bcrypt.hash(password, 10);

    const userRole = await Role.findOne({ where: { name: 'user' } });
    if (!userRole) {
      return res.status(500).json({ error: "Rôle utilisateur introuvable" });
    }

    const user = await User.create({ name, email, password: hash, RoleId: userRole.id });

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    console.error("Erreur création utilisateur:", err);
    res.status(500).json({ error: "Erreur création utilisateur", details: err.message });
  }
};

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD_HASH =  "$2b$10$bty2oRMeoSQS4J6XuXke3eCDldEfLzjGXFkCmv6U6zkSFNiHNTPHu" ;

//  connecter
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email }, include: [ Role ] });
    console.log(user)
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Mot de passe incorrect" });


    const token = jwt.sign({ id: user.id, role: user.Role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Connexion réussie", token, role: user.Role.name });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// deconnexion
exports.logout = (req, res) => {
  res.json({ message: "Déconnexion réussie" });
};


