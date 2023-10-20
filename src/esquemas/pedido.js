const Joi = require('joi')

const pedidoEsquema = Joi.object({
    cliente_id: Joi.number().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.base': 'O campo cliente_id deve conter apenas dígitos numéricos positivos',
        'number.positive': 'O campo cliente_id deve conter apenas dígitos numéricos positivos (maiores que zero)'
    }),
    observacao: Joi.string().max(1000).messages({
        'string.base': 'O campo observacao deve ser uma string',
        'string.max': 'O campo observacao deve conter no máximo 10000 caracteres'
    }),
    pedido_produtos: Joi.array().items(Joi.object({
        produto_id: Joi.number().positive().required().messages({
            'any.required': 'O campo produto_id é obrigatório',
            'number.base': 'O campo produto_id deve conter apenas dígitos numéricos positivos (maiores que zero)',
            'number.positive': 'O campo produto_id deve conter apenas dígitos numéricos positivos (maiores que zero)',
        }),
        quantidade_produto: Joi.number().positive().required().messages({
            'any.required': 'O campo quantidade_produto é obrigatório',
            'number.base': 'O campo quantidade_produto deve conter apenas dígitos numéricos positivos (maiores que zero)',
            'number.positive': 'O campo quantidade_produto deve conter apenas dígitos numéricos positivos (maiores que zero)',
        }),
    })).min(1).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório',
        'array.base': "O campo quantidade_produto deve ser um array",
        'object.unknown': "Campo não permitido dentro do array pedido_produtos encontrado"
      })


})

module.exports = pedidoEsquema