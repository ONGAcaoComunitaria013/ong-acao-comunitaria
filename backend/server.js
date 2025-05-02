// Importações básicas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importações das rotas
const documentoRoutes = require('./routes/documentoRoutes');
const recadoRoutes = require('./routes/recadoRoutes');
const fotoRoutes = require('./routes/fotoRoutes');
const authRoutes = require('./routes/authRoutes');

// Inicializa o aplicativo Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definindo a pasta de arquivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rotas para servir os HTMLs
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/portal', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'portal.html'));
});

app.get('/fotos', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'fotos.html'));
});

app.get('/recados', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'recados.html'));
});

// Usar rotas da API
app.use('/api/documentos', documentoRoutes);
app.use('/api/recados', recadoRoutes);
app.use('/api/fotos', fotoRoutes);
app.use('/api/auth', authRoutes);

// Porta
const PORT = process.env.PORT || 5000;

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err);
  });
