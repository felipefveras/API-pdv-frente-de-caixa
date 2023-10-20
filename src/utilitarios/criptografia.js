const bcrypt = require("bcrypt");

const criptografaSenha = (senha) => {
    return bcrypt.hash(senha, 10);
};

const comparaSenha = async (senha, senhaCriptografada) => {
    const senhaValida = await bcrypt.compare(senha, senhaCriptografada);
    return senhaValida;
};

module.exports = {
    criptografaSenha,
    comparaSenha
};

