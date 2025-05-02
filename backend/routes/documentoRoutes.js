const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { salvarDocumento } = require('../controllers/documentoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const nomeUnico = Date.now() + '-' + file.originalname;
    cb(null, nomeUnico);
  }
});

// Filtro de tipos permitidos
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  }
});

// Rotas
router.get('/', require('../controllers/documentoController').listarDocumentos || ((req, res) => res.status(501).send('Não implementado')));
router.post('/', authMiddleware, upload.single('arquivo'), salvarDocumento);

module.exports = router;
