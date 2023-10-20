const Joi = require('joi')

const produtoEsquema = Joi.object({
    descricao: Joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório.',
        'string.empty': 'O campo descrição não pode estar vazio.',
        'string.pattern.base': 'O campo descrição não pode conter caracteres especiais.'
    }),
    quantidade_estoque: Joi.number().integer().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.base': 'O campo quantidade_estoque deve ser um número.',
        'number.integer': 'O campo quantidade_estoque deve ser um número inteiro.',
    }),
    valor: Joi.number().precision(2).required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.base': 'O campo valor deve ser um número.',
    }),
    categoria_id: Joi.number().integer().required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.base': 'O campo categoria_id deve ser um número.',
        'number.integer': 'O campo categoria_id deve ser um número inteiro.',
    }),
});



module.exports = produtoEsquema;
