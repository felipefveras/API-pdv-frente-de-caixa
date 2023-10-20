const { verificarToken } = require('../utilitarios/token')

const validaToken = (req, res, next) => {
  
  try {
    const { authorization } = req.headers;
    if (typeof authorization === "undefined")
      return res
        .status(400)
        .json({
          mensagem:
            "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    
    const [Bearer, token] = authorization.split(" ");
    
    if (!Bearer || !token)
      return res
        .status(400)
        .json({
          mensagem:
            "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    
    const validaToken = verificarToken(token);
    
    if (!validaToken)
      return res
        .status(401)
        .json({
          mensagem:
            "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    
    req.id = validaToken.id;
    next();
    
  } catch (error) {
    if(error.name === 'TokenExpiredError'){
      return res.status(401).json({mensagem: "Token jwt expirado"})
    }
    return res.status(500).json({mensagem: "Erro interno do servidor"})
  }
};
module.exports = { validaToken };
