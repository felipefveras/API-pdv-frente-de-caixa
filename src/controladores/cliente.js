const {
  buscarClientePeloEmail,
  cadastrarNovoCliente,
  buscarClientePeloCpf,
  buscarClientePeloId,
  atualizarCliente,
} = require("../repositorio/cliente");
const knex = require("../config/conexao");
const cadastrarCliente = async (req, res) => {
  try {
    const { nome, cpf, email, cep, rua, numero, bairro, cidade, estado } =
      req.body;
    const id  = req.id;
    const cliente = {
      nome,
      cpf,
      email,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      id_usuario: id,
    };

    const existeEmail = await buscarClientePeloEmail(cliente.email);
    
    if (existeEmail) {
        return res.status(401).json({ mensagem: "Email ou Cpf já cadastrado" });
    }

    const existeCpf = await buscarClientePeloCpf(cliente.cpf);

    if (existeCpf) {
        return res.status(401).json({ mensagem: "Email ou Cpf já cadastrado" });
      }
  

    await cadastrarNovoCliente(cliente);

    return res.status(201).json({ message: "Cliente cadastrado com sucesso" });
    
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const editarDadosCliente = async (req, res) => {
  const { email, cpf, nome, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  const { id } = req.params;

  try {
    const clienteExiste = await buscarClientePeloId(id);

    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "cliente não encontrado" });
    }

    const existeCpfCadastrado = await buscarClientePeloCpf(cpf);

    if (existeCpfCadastrado && existeCpfCadastrado.id != id) {
      return res.status(401).json({ mensagem: "cpf já cadastrado" });
    }

    const existeEmailCadastrado = await buscarClientePeloEmail(email);

    if (existeEmailCadastrado && existeEmailCadastrado.id != id) {
      return res.status(401).json({ mensagem: "Este e-mail já está em uso." });
    }

    const atualizarDados = {
      email,
      nome,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    };

    const clienteAtualizado = atualizarCliente(id, atualizarDados);

    return res.status(201).json({ mensagem: "cliente atualizado" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Erro interno do servidor");
  }
};

const listarClientes = async (req, res) => {
  try {
    const cliente = await knex("clientes").select("*");

    return res.status(200).json(cliente);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarClienteId = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await knex("clientes")
      .select("*")
      .where({ id: id, id_usuario: req.id });
    if (cliente <= 0) {
      return res.status(404).json({ mensagem: "cliente não encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarCliente,
  editarDadosCliente,
  editarDadosCliente,
  listarClientes,
  listarClienteId,
};
