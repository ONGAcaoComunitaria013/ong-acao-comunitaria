const Recado = require('../models/Recado');

// Buscar todos os recados
exports.getRecados = async (req, res) => {
  try {
    const recados = await Recado.find().sort({ data: -1 }); // ordena do mais recente para o mais antigo
    res.json(recados);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar recados', error });
  }
};

// Criar um novo recado
exports.createRecado = async (req, res) => {
  try {
    const { autor, mensagem } = req.body;

    // Verifica se o campo mensagem está preenchido
    if (!mensagem || mensagem.trim() === '') {
      return res.status(400).json({ message: 'O campo "mensagem" é obrigatório.' });
    }

    // Verifica se o campo autor está preenchido
    if (!autor || autor.trim() === '') {
      return res.status(400).json({ message: 'O campo "autor" é obrigatório.' });
    }

    // Cria um novo documento no MongoDB
    const novoRecado = new Recado({
      autor,
      mensagem,
    });

    await novoRecado.save(); // Salva no banco
    res.status(201).json({ message: 'Recado criado com sucesso!' }); // Retorno de sucesso
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar recado', error });
  }
};
