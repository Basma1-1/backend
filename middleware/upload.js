const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier ou les fichiers  stockés
const uploadDir = path.join(__dirname, '..', 'uploads');

// creation de dossier s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
  
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;


