const jwt = require('jsonwebtoken');

function verifyToken (req, res, next)  {
  console.log("Headers Authorization :", req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token requis" });
  }

  const token = authHeader.split(' ')[1];
 
  if (!token || token === "null" || token === "undefined") {
  return res.status(401).json({ error: "Token manquant ou invalide" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
     console.log(" Utilisateur authentifié :", decoded);
    req.user = decoded;
    next();
  }catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ error: "Token expiré" });
    }
    return res.status(403).json({ error: "Token invalide" });
  }
};

module.exports = verifyToken ;

