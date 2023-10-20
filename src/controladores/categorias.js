const { buscarCategoria } = require("../repositorio/categoria");

const categorias = async (req, res) => {
  try {
    const categorias = await buscarCategoria();
    return res.status(200).json(categorias);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};



module.exports = {
  categorias
};
