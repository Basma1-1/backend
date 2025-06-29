const bcrypt = require('bcrypt');

async function generate() {
  const hash = await bcrypt.hash('Admin123', 10); 
  console.log('Hash généré :', hash);
}

generate();
