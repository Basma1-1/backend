module.exports = (req, res, next) => {
  console.log("Rôle utilisateur dans isAdmin :", req.user.role);
  
  if (req.user && req.user.role && req.user.role.toLowerCase() === 'admin') {
    console.log("Accès admin autorisé pour id :", req.user.id);
    next();
  } else {
    console.warn("Accès refusé - rôle insuffisant :", req.user?.role);
    res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
};



