// backend/config/uploadConfig.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cria pasta /uploads se não existir
const pastaUpload = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(pastaUpload)) {
  fs.mkdirSync(pastaUpload);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUpload);
  },
  filename: (req, file, cb) => {
    const nomeOriginal = file.originalname.replace(/\s+/g, '_');
    const nomeFinal = `${Date.now()}_${nomeOriginal}`;
    cb(null, nomeFinal);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limite: 5MB
  fileFilter: (req, file, cb) => {
    const tiposAceitos = ['application/pdf', 'image/jpeg', 'image/png'];
    if (tiposAceitos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos PDF, JPG ou PNG são permitidos.'));
    }
  }
});

module.exports = upload;
