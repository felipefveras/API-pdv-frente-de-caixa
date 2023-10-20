const knex = require("../config/conexao");

const cadastrarNovoProduto = async (
  descricao,
  quantidade_estoque,
  valor,
  categoria_id,
  produto_imagem
) => {
  try {
    const novoProduto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem,
      })
      .returning("*");

    return novoProduto[0];
  } catch (error) {
    throw error;
  }
};

const atualizacaoDeProdutos = async (
  id,
  descricao,
  quantidade_estoque,
  valor,
  categoria_id,
  produto_imagem
) => {
  try {
    const produtos = await knex("produtos")
      .where("id", id)
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem,
      })
      .returning("*");

    return produtos[0];
  } catch (error) {
    throw error;
  }
};

const buscarProdutoPeloId = async (id) => {
  try {
    const produto = await knex("produtos").where("id", id).first();

    return produto;
  } catch (error) {
    throw error;
  }
};

const buscarProdutoPorCategoria = async (categoria_id) => {
  try {
    const produtosEncontrados = await knex("produtos").where(
      "categoria_id",
      categoria_id
    );

    return produtosEncontrados;
  } catch (error) {
    throw error;
  }
};

const listarTodosProdutos = async () => {
  try {
    const produtosEncontrados = await knex("produtos");

    return produtosEncontrados;
  } catch (error) {
    throw error;
  }
};

const deletarProdutoPeloId = async (id) => {
  try {
    const produtoDeletado = await knex("produtos").where("id", id).del();
  } catch (error) {
    throw error;
  }
};

const buscarProdutoVinculadoAPedido = async (id) => {
  try {
    const produtoVinculado = await knex("pedido_produtos")
      .where("produto_id", id)
      .first();

    return produtoVinculado;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  buscarProdutoVinculadoAPedido,
  cadastrarNovoProduto,
  atualizacaoDeProdutos,
  buscarProdutoPeloId,
  buscarProdutoPorCategoria,
  listarTodosProdutos,
  deletarProdutoPeloId,
};
