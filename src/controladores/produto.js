const knex = require("../config/conexao");
const produtoEsquema = require("../esquemas/produtos");
const { buscarCategoriaPeloId } = require("../repositorio/categoria");
const {
  buscarProdutoVinculadoAPedido,
  cadastrarNovoProduto,
  atualizacaoDeProdutos,
  buscarProdutoPeloId,
  listarTodosProdutos,
  buscarProdutoPorCategoria,
  deletarProdutoPeloId,
} = require("../repositorio/produtos");

const { deletarImagem } = require('../utilitarios/imagem');


const cadastrarProduto = async (req, res) => {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { error } = produtoEsquema.validate({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios." });
    }

    const categoriaExistente = await buscarCategoriaPeloId(categoria_id);

    if (!categoriaExistente) {
      return res
        .status(400)
        .json({ mensagem: "A categoria informada não existe." });
    }

    const produto_imagem = req.file ? req.file.firebaseUrl : "N/A";

    const novoProduto = await cadastrarNovoProduto(
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem
    );
    return res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarProdutos = async (req, res) => {
  const { id } = req.params;

  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { error } = produtoEsquema.validate({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    const produtoExistente = await buscarProdutoPeloId(id);

    if (!produtoExistente) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const categoriaExistente = await buscarCategoriaPeloId(categoria_id);

    if (!categoriaExistente) {
      return res
        .status(400)
        .json({ mensagem: "A categoria informada não existe." });
    }

    const produto_imagem = req.file ? req.file.firebaseUrl : "N/A";

    const produtoAtualizado = await atualizacaoDeProdutos(
      id,
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem
    );

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const categoriaExistente = await buscarCategoriaPeloId(categoria_id);

      if (isNaN(categoria_id)) {
        return res.status(400).json({
          mensagem:
            "Informe o número da categoria, sem letras ou caracteres especiais.",
        });
      }
      if (!categoriaExistente) {
        return res
          .status(404)
          .json({ mensagem: "A categoria informada não existe." });
      }

      const produtosEncontrados = await buscarProdutoPorCategoria(categoria_id);
      return res.status(200).json(produtosEncontrados);
    }

    const todosProdutos = await listarTodosProdutos();
    return res.status(200).json(todosProdutos);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};



const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await buscarProdutoPeloId(id);

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não existe" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};


const deletarProduto = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido, tente novamente" });
  }

  try {
    const produtoExistente = await buscarProdutoPeloId(id);

    if (!produtoExistente) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const produtoVinculadoAPedido = await buscarProdutoVinculadoAPedido(id);

    if (produtoVinculadoAPedido) {
      return res
        .status(400)
        .json({ mensagem: "O produto solicitado está vinculado a pedido" });
    }

    const urlDaImagem = produtoExistente.produto_imagem;

    if (urlDaImagem !== "N/A") {
      await deletarImagem(urlDaImagem)
    }

    const produtoDeletado = await deletarProdutoPeloId(id);
    return res.status(204).send();
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarProduto,
  atualizarProdutos,
  listarProdutos,
  detalharProduto,
  deletarProduto,
};
