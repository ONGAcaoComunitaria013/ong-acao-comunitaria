const mongoose = require('mongoose');

// Define o "molde" dos recados
const RecadoSchema = new mongoose.Schema({
  mensagem: {
    type: String,
    required: true // A mensagem é obrigatória
  },
  autor: {
    type: String,
    default: 'Anônimo' // Se não informar o autor, salva como Anônimo
  },
  data: {
    type: Date,
    default: Date.now // Salva a data automaticamente
  }
});

// Exporta o modelo para ser usado no servidor
module.exports = mongoose.model('Recado', RecadoSchema);
