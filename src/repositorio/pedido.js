const knex = require('../config/conexao');
const { buscarClientePeloId } = require('./cliente');


const filtrarPedidos = async (cliente_id) => {
    let pedido = knex('pedidos as p')
        .select('p.id as pedido_id', 'p.valor_total', 'p.observacao', 'p.cliente_id')
        .leftJoin('pedido_produtos as pp', 'p.id', 'pp.pedido_id')
        .select('pp.id as produto_pedido_id', 'pp.quantidade_produto', 'pp.valor_produto', 'pp.produto_id')
        .orderBy('p.id', 'asc');

    if (cliente_id) {
        pedido = pedido.where('p.cliente_id', cliente_id);
    }

    return await pedido;
};


const validarPedido = async (pedido) => {
    const { cliente_id, pedido_produtos, observacao } = pedido


    try {

        const existeCliente = await buscarClientePeloId(cliente_id)

        if (!existeCliente) {
            return "Cliente"
        }


        let produtosId = []
        pedido_produtos.map(item => {
            produtosId.push(item.produto_id)
        })

        const produtosPedido = await knex('produtos')
            .select('id', 'valor', 'quantidade_estoque', 'descricao')
            .whereIn('id', produtosId)



        if (pedido_produtos.length !== produtosPedido.length) {
            return "Produto"
        }

        let estoqueExcedido = false
        let valor_total = 0
        produtosPedido.map(item => {
            for (const pedido_produto of pedido_produtos) {
                if (item.id === pedido_produto.produto_id) {
                    item.quantidade_produto = pedido_produto.quantidade_produto
                    valor_total += item.valor * item.quantidade_produto
                    if (item.quantidade_estoque < item.quantidade_produto) {
                        estoqueExcedido = true
                    }
                    break
                }

            }
        })

        if (estoqueExcedido === true) {
            return "Estoque"
        }


        return { produtosPedido, valor_total, cliente_id, observacao }

    } catch (error) {
        throw error
    }
}


const cadastrarPedidoDoCliente = async (pedidoValido) => {
    const { produtosPedido, ...pedido } = pedidoValido

    try {

        await knex.transaction(async trx => {
            const resposta = await trx('pedidos')
                .insert(pedido)
                .returning('id')

            const pedidoId = resposta[0].id

            for (const produto of produtosPedido) {
                await trx('produtos')
                    .where('id', produto.id)
                    .decrement('quantidade_estoque', produto.quantidade_produto)


                await trx('pedido_produtos')
                    .insert({ 'pedido_id': pedidoId, 'produto_id': produto.id, 'quantidade_produto': produto.quantidade_produto, 'valor_produto': produto.valor })
            }
        })



    } catch (error) {
        throw error
    }
}


module.exports = {
    filtrarPedidos,
    validarPedido,
    cadastrarPedidoDoCliente
};



