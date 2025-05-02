const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { listarRecados, criarRecado } = require('../controllers/recadoController');

// Rota para obter todos os recados
router.get('/', listarRecados);

// Rota para criar um novo recado (requer autenticação)
router.post('/', authMiddleware, criarRecado);

module.exports = router;
