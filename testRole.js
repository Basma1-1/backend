const { Role } = require('./models');

async function test() {
  try {
    const userRole = await Role.findOne({ where: { name: 'user' } });
    console.log("Rôle user trouvé:", userRole ? userRole.toJSON() : null);
  } catch (err) {
    console.error("Erreur:", err);
  }
}

test();
