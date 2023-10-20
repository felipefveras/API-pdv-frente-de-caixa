const Joi = require('joi')

const loginEsquema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.base': 'E-mail inválido',
        'string.email': 'E-mail inválido',
    }),
    senha: Joi.string().min(3).max(12).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.base': 'A senha deve conter caracteres válidos',
        'string.min': 'A senha deve conter no mínimo 5 caracteres',
        'string.max': 'A senha deve conter no máximo 15 caracteres',
    }),
})
module.exports = loginEsquema