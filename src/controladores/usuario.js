const { buscarUsuarioPeloEmail, buscarUsuarioPeloId, cadastrarNovoUsuario, atualizarUsuarioPeloId } = require('../repositorio/usuario')
const { criptografaSenha } = require('../utilitarios/criptografia')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;


    try {
        const senhaCriptografada = await criptografaSenha(senha);

        const usuarioExistente = await buscarUsuarioPeloEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({ mensagem: 'Este e-mail já está em uso.' });
        }

        const novoUsuario = await cadastrarNovoUsuario(nome, email, senhaCriptografada);

        const { senha: _, ...usuario } = novoUsuario;

        return res.status(201).json(usuario);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const exibirUsuarioLogado = async (req, res) => {
    const usuarioId = req.id

    try {
        const { senha: _, ...usuario } = await buscarUsuarioPeloId(usuarioId)
        return res.status(200).json(usuario);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const editarPerfilUsuarioLogado = async (req, res) => {
    const { nome, email, senha } = req.body;
    const id = req.id;


    try {

        const senhaCriptografada = await criptografaSenha(senha);

        const usuarioExistente = await buscarUsuarioPeloEmail(email);

        if (usuarioExistente && usuarioExistente.id != id) {
            return res.status(400).json({ mensagem: 'Este e-mail já está em uso.' });
        }

        const usuarioAtualizado = await atualizarUsuarioPeloId(id, nome, email, senhaCriptografada)

        if (!usuarioAtualizado) {
            return res.status(400).json({ mensagem: "usuário não atualizado" });
        }

        return res.status(200).json({ mensagem: "usuário atualizado com sucesso" });
    } catch (erro) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};


module.exports = {
    cadastrarUsuario,
    exibirUsuarioLogado,
    editarPerfilUsuarioLogado
}