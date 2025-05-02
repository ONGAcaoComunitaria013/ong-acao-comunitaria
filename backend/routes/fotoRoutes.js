const express = require('express');
const router = express.Router();
const {
  getFotos,
  createFoto,
  toggleDestaque
} = require('../controllers/FotoController');

const authMiddleware = require('../middlewares/authMiddleware');

// Rotas
router.get('/', getFotos);
router.post('/', authMiddleware, createFoto); // ✅ proteção adicionada
router.put('/:id/destaque', authMiddleware, toggleDestaque); // ✅ proteção adicionada

module.exports = router;
