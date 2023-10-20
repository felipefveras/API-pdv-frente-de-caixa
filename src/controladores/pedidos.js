const { filtrarPedidos, validarPedido, cadastrarPedidoDoCliente } = require('../repositorio/pedido');
const { buscarClientePeloId } = require('../repositorio/cliente');
const enviarEmail = require('../utilitarios/nodemailer');

const listarPedidos = async (req, res) => {
    try {
        const { cliente_id } = req.query;

        const pedidos = await filtrarPedidos(cliente_id);

        if (!pedidos || pedidos.length === 0) {
            return res.status(200).json({ mensagem: 'Nenhum pedido foi encontrado.', pedido: [] });
        }

        const resultado = [];

        for (const pedido of pedidos) {
            if (!pedido.pedido_produtos) {
                pedido.pedido_produtos = [];
            }

            const pedidoExistente = resultado.find((p) => p.id === pedido.pedido_id);

            if (!pedidoExistente) {
                resultado.push({
                    id: pedido.pedido_id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id,
                    pedido_produtos: [],
                });
                break
            }
            
            const produto = {
                id: pedido.produto_pedido_id,
                quantidade_produto: pedido.quantidade_produto,
                valor_produto: pedido.valor_produto,
                produto_id: pedido.produto_id,
            };
            
            pedidoExistente.pedido_produtos.push(produto);
        }
        return res.status(200).json("resultado");

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    const pedido = {
        cliente_id,
        observacao,
        pedido_produtos
    }


    try {

        const pedidoValido = await validarPedido(pedido)

        if (pedidoValido === "Cliente") {
            return res.status(404).json({ mensagem: "Cliente não encontrado" })

        }
        if (pedidoValido === "Produto") {
            return res.status(404).json({ mensagem: "Produto(s) não encontrado(s)" })

        }
        if (pedidoValido === "Estoque") {
            return res.status(403).json({ mensagem: "Quantidade do produto(s) pedido(s) excedem seu(s) estoque(s)" })

        }

        await cadastrarPedidoDoCliente(pedidoValido)

        const { email, nome } = await buscarClientePeloId(cliente_id)

        enviarEmail(email, nome)



        return res.status(201).json({ mensagem: "Pedido cadastrado!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = {
    listarPedidos,
    cadastrarPedido
};