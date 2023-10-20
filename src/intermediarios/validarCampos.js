const validarCampos = (joiSchema) => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body)
        next()
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message })
    }
}

const validarParametroId = (req, res, next) => {
    const { id } = req.params;

    if (!Number(id)) {
        return res.status(400).json({ mensagem: "O parâmetro id deve conter apenas dígitos númericos" })
    }

    next();
}


module.exports = {
    validarCampos,
    validarParametroId
}