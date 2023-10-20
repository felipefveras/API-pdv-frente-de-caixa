const { sign, verify } = require("jsonwebtoken");
require("dotenv").configDotenv();

const criarToken = (id) => {
    const token = sign({ id: id }, process.env.SENHA_TOKEN, {
        expiresIn: "2h",
    });
    return token;
};

const verificarToken = (token) => {
    const verificar = verify(token, process.env.SENHA_TOKEN);
    return verificar;
}
module.exports = {
    criarToken,
    verificarToken
};
