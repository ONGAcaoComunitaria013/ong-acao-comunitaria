// backend/controllers/DocumentoController.js

const Documento = require('../models/Documento');

exports.salvarDocumento = async (req, res) => {
  try {
    const { titulo, url } = req.body;
    let nomeArquivo = null;

    if (!titulo) {
      return res.status(400).json({ message: 'O título é obrigatório.' });
    }

    if (req.file) {
      nomeArquivo = req.file.filename;
    }

    if (!url && !nomeArquivo) {
      return res.status(400).json({ message: 'Forneça um link ou envie um arquivo.' });
    }

    const novo = new Documento({
      titulo,
      url,
      arquivo: nomeArquivo
    });

    await novo.save();
    res.status(201).json({ message: 'Documento salvo com sucesso!' });

  } catch (error) {
    console.error('Erro ao salvar documento:', error);
    res.status(500).json({ message: 'Erro ao salvar documento.' });
  }
};
