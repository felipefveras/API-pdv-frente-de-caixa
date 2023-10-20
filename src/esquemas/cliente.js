const Joi = require('joi')

const clienteEsquema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.base': 'E-mail inválido',
        'string.email': 'E-mail inválido',
    }),
    nome: Joi.string().max(100).required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.base': 'O nome deve ser uma string',
        'string.max': 'O nome deverá conter no máximo 100 caracteres',
    }),
    cpf: Joi.string().pattern(new RegExp(/^\d{11}$/)).required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.base': 'O campo cpf deve ser uma string',
        'string.pattern.base': 'O campo cpf deverá conter exatamente 11 dígitos numéricos',
    }),
    cep: Joi.string().pattern(new RegExp(/^\d{8}$/)).messages({
        'string.base': 'O campo cep deve ser uma string',
        'string.pattern.base': 'O campo cep deverá conter exatamente 8 dígitos numéricos',
    }),
    rua: Joi.string().max(100).messages({
        'string.base': 'O campo rua deve ser uma string',
        'string.max': 'O campo rua deverá conter no máximo 100 caracteres',
    }),
    numero: Joi.string().pattern(new RegExp(/^\d{4}$/)).messages({
        'string.base': 'O campo numero deve ser uma string',
        'string.pattern.base': 'O campo numero deverá conter no maximo 4 dígitos númericos',
    }),
    bairro: Joi.string().max(100).messages({
        'string.base': 'O campo bairro deve ser uma string',
        'string.max': 'O campo bairro deverá conter no máximo 100 caracteres',
    }),

    cidade: Joi.string().max(100).messages({
        'string.base': 'O campo cidade deve ser uma string',
        'string.max': 'O campo cidade deverá conter no máximo 100 caracteres',
    }),

    estado: Joi.string().max(100).messages({
        'string.base': 'O campo estado deve ser uma string',
        'string.max': 'O campo estado deverá conter no máximo 100 caracteres',
    }),

    
})

module.exports = clienteEsquema