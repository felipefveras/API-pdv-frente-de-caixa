const { buscarUsuarioPeloEmaileSenha } = require("../repositorio/usuario");
const { criarToken } = require("../utilitarios/token");

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const resposta = await buscarUsuarioPeloEmaileSenha(email, senha);
    if (!resposta) {
      return res.status(400).json({ mensagem: "Email ou senha incorreta" });
    }
    const { senha: _, ...usuario } = resposta;

    const token = criarToken(usuario.id);

    return res.status(200).json({ usuario, token });
  } catch (erro) {
    console.log(erro.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  login,
};
