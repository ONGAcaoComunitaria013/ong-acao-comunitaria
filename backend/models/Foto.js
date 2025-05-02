// models/Foto.js

const mongoose = require('mongoose');

const FotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  legenda: {
    type: String,
    required: false
  },
  dataEnvio: {
    type: Date,
    default: Date.now
  },
  destaque: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Foto', FotoSchema);
