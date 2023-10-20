const knex = require("../config/conexao");


const cadastrarNovoCliente = async (cliente) => {
    try {
        
        const novoCliente = await knex('clientes')
        .insert(cliente)
        .returning('*');

        return novoCliente[0];

    } catch (error) {
        throw error
    }
}

const buscarClientePeloEmail = async (email) => {
    try {
        const clienteExistente = await knex('clientes').where('email', email).first()

        return clienteExistente;
    } catch (error) {
        throw error;
    }
};

const buscarClientePeloCpf = async (cpf) => {
    try {
        const clienteExistente = await knex('clientes').where('cpf', cpf).first()
        
        return clienteExistente;
    } catch (error) {
        throw error;
    }
};


const buscarClientePeloId = async (id) => {
    try {
        const clienteExistente = await knex('clientes')
            .where('id', id)
            .first();

        return clienteExistente;
    } catch (error) {
        throw error;
    }
}

const atualizarCliente = async (id, dados) => {
    try {
        const clienteAtualizado = await knex('clientes').where('id',id).update(dados).returning("*");

        return clienteAtualizado
    } catch (error) {
        throw error
    }
}


module.exports = {
    cadastrarNovoCliente,
    atualizarCliente,
    buscarClientePeloEmail,
    buscarClientePeloCpf,
    buscarClientePeloId
}