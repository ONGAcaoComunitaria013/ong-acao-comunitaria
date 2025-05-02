const express = require('express');
const router = express.Router();
const {
  listarRecados,
  criarRecado
} = require('../controllers/recadoController');

const authMiddleware = require('../middlewares/authMiddleware');

// Rotas
router.get('/', listarRecados);
router.post('/', authMiddleware, criarRecado); // ✅ proteção adicionada

module.exports = router;
