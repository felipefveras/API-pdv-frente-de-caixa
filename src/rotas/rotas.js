const express = require("express");
const {
  cadastrarUsuario,
  exibirUsuarioLogado,
  editarPerfilUsuarioLogado,
} = require("../controladores/usuario");
const usuarioEsquema = require("../esquemas/usuario");
const loginEsquema = require("../esquemas/login");
const { login } = require("../controladores/login");
const {
  validarCampos,
  validarParametroId,
} = require("../intermediarios/validarCampos");
const { categorias } = require("../controladores/categorias");
const { validaToken } = require("../intermediarios/token");
const {
  cadastrarProduto,
  atualizarProdutos,
  listarProdutos,
  deletarProduto,
  detalharProduto,
} = require("../controladores/produto");
const produtoEsquema = require("../esquemas/produtos");
const clienteEsquema = require("../esquemas/cliente");
const pedidoEsquema = require("../esquemas/pedido");

const {
  cadastrarCliente,
  editarDadosCliente,
  listarClientes,
  listarClienteId,
} = require("../controladores/cliente");
const { listarPedidos, cadastrarPedido } = require("../controladores/pedidos");
const multer = require("multer");
const { salvarImage } = require("../intermediarios/imagem");
const intermediarioMulter = multer({ storage: multer.memoryStorage() }).single(
  "produto_imagem"
);

const rotas = express();

rotas.get("/categoria", categorias);

rotas.post("/usuario", validarCampos(usuarioEsquema), cadastrarUsuario);

rotas.post("/login", validarCampos(loginEsquema), login);

rotas.use(validaToken);

rotas.put("/usuario", validarCampos(usuarioEsquema), editarPerfilUsuarioLogado);
rotas.get("/usuario", exibirUsuarioLogado);

rotas.post("/produto", intermediarioMulter, salvarImage, cadastrarProduto);
rotas.put(
  "/produto/:id",
  validarParametroId,
  intermediarioMulter,
  salvarImage,
  atualizarProdutos
);
rotas.get("/produto", listarProdutos);
rotas.delete("/produto/:id", validarParametroId, deletarProduto);
rotas.get("/produto/:id", validarParametroId, detalharProduto);

rotas.post("/cliente", validarCampos(clienteEsquema), cadastrarCliente);
rotas.put(
  "/cliente/:id",
  validarParametroId,
  validarCampos(clienteEsquema),
  editarDadosCliente
);

rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id", validarParametroId, listarClienteId);

rotas.post("/pedido", validarCampos(pedidoEsquema), cadastrarPedido)
rotas.get("/pedido", listarPedidos);

module.exports = rotas;
