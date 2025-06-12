// Importações básicas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const documentoRoutes = require('./routes/documentoRoutes');


// Importações das rotas
const recadoRoutes = require('./routes/recadoRoutes');
const fotoRoutes = require('./routes/fotoRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ adicionado aqui
const documentosListRoute = require('./routes/documentosListRoute');


// Inicializa o aplicativo Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/documentos', documentosListRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Definindo a pasta de arquivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rotas para servir os HTMLs

app.use('/api/documentos', documentoRoutes);

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
app.use('/api/recados', recadoRoutes);
app.use('/api/fotos', fotoRoutes);
app.use('/api/auth', authRoutes); // ✅ adicionada aqui

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


  const nodemailer = require("nodemailer");

app.post("/api/contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: "siteongacaocomunitaria@outlook.com",
        pass: "@Olwjai16" // use a senha do email ou uma senha de app
      }
    });

    const mailOptions = {
      from: `"${nome}" <${email}>`,
      to: "siteongacaocomunitaria@outlook.com",
      subject: "Mensagem do site da ONG",
      text: mensagem
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar mensagem." });
  }
});
