const Foto = require('../models/Foto');

// Buscar todas as fotos
exports.getFotos = async (req, res) => {
  try {
    const fotos = await Foto.find().sort({ dataEnvio: -1 }); // ordena do mais recente para o mais antigo
    res.json(fotos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fotos', error });
  }
};

// Cadastrar uma nova foto
exports.createFoto = async (req, res) => {
  try {
    const { url, legenda } = req.body;

    // Verifica se o campo URL está preenchido corretamente
    if (!url || url.trim() === '') {
      return res.status(400).json({ message: 'O campo "url" é obrigatório.' });
    }

    const novaFoto = new Foto({
      url,
      legenda,
    });

    await novaFoto.save(); // Salva no banco
    res.status(201).json({ message: 'Foto cadastrada com sucesso!' }); // Retorno de sucesso
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar foto', error });
  }
};

// Marcar ou desmarcar uma foto como destaque
exports.toggleDestaque = async (req, res) => {
  try {
    const fotoId = req.params.id;
    const foto = await Foto.findById(fotoId);

    if (!foto) {
      return res.status(404).json({ message: 'Foto não encontrada.' });
    }

    if (foto.destaque) {
      // Se já for destaque, remover o destaque
      foto.destaque = false;
      await foto.save();
      return res.json({ message: 'Destaque removido com sucesso.', destaque: false });
    } else {
      // Se ainda não for destaque, verificar se já existem 5 em destaque
      const totalDestaques = await Foto.countDocuments({ destaque: true });
      if (totalDestaques >= 5) {
        return res.status(400).json({ message: 'Limite de 5 fotos em destaque atingido.' });
      }

      foto.destaque = true;
      await foto.save();
      return res.json({ message: 'Foto destacada com sucesso!', destaque: true });
    }

  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar destaque da foto.', error });
  }
};

// ✅ Nova função: retornar até 5 fotos com destaque
exports.getDestaques = async (req, res) => {
  try {
    const destaques = await Foto.find({ destaque: true })
      .sort({ dataEnvio: -1 })
      .limit(5);
    res.json(destaques);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fotos em destaque', error });
  }
};
