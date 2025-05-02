// backend/models/Documento.js

const mongoose = require('mongoose');

const DocumentoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  url: String, // para links externos
  arquivo: String, // nome do arquivo salvo no servidor (se houver)
  dataEnvio: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Documento', DocumentoSchema);
