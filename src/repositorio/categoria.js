const knex = require("../config/conexao");

const buscarCategoria = async () => {
  try {
    const categoria = await knex("categorias");

    return categoria;
  } catch (erro) {
    throw erro;
  }
};

const buscarCategoriaPeloId = async (categoria_id) => {
  try {
    const categoria = await knex('categorias')
      .where('id', categoria_id)
      .first();

    return categoria
  } catch (erro) {
    throw erro
  }
};

module.exports = {
  buscarCategoria,
  buscarCategoriaPeloId
};
