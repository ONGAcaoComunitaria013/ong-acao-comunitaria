const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Rota para registrar novo usuário
router.post('/register', AuthController.register);

// Rota para login
router.post('/login', AuthController.login);

module.exports = router;
