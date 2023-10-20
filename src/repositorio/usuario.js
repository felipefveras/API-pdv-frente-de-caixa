const knex = require("../config/conexao")
const { comparaSenha } = require("../utilitarios/criptografia")


const buscarUsuarioPeloEmaileSenha = async (email, senhaLogin) => {
    try {
        const usuario = await knex('usuarios').where('email', email).first();
        if (!usuario) {
            return false
        }

        contaValida = await comparaSenha(senhaLogin, usuario.senha)

        if (!contaValida) {
            return false
        }
        return usuario
    } catch (erro) {
        throw erro
    }
}

const buscarUsuarioPeloEmail = async (email) => {
    try {
        const usuarioExistente = await knex('usuarios')
            .where('email', email)
            .first();

        return usuarioExistente;
    } catch (error) {
        throw error;
    }
};

const cadastrarNovoUsuario = async (nome, email, senhaCriptografada) => {
    try {
        const novoUsuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning('*');

        return novoUsuario[0];
    } catch (error) {
        throw error;
    }
};


const buscarUsuarioPeloId = async (id) => {
    try {
        const usuario = await knex('usuarios')
            .where('id', id)
            .first();

        return usuario
    } catch (erro) {
        throw erro
    }
};

const atualizarUsuarioPeloId = async (id, nome, email, senhaCriptografada) => {
    try {
        const atualizarDados = {
            email,
            nome,
            senha: senhaCriptografada
        };

        const usuarioAtualizado = await knex('usuarios').where({ id }).update(atualizarDados).returning("*");
        return usuarioAtualizado

    } catch (erro) {
        throw erro
    }
}

module.exports = {
    buscarUsuarioPeloEmaileSenha,
    buscarUsuarioPeloEmail,
    cadastrarNovoUsuario,
    buscarUsuarioPeloId,
    atualizarUsuarioPeloId
}