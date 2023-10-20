const {
    getStorage,
    ref,
    deleteObject
} = require("firebase/storage");
const { app } = require("../config/firebase");
const storage = getStorage(app);

function extrairNomeDaImagem(link) {

    const ultimaBarra = link.lastIndexOf('/');
    const pontoDeInterrogacao = link.indexOf('?');
    const nomeDaImagem = link.substring(ultimaBarra + 1, pontoDeInterrogacao);

    return nomeDaImagem;
}

const deletarImagem = async (urlDaImagem) => {

    const nomeArquivo = extrairNomeDaImagem(urlDaImagem);

    const imagemRef = ref(storage, nomeArquivo);

    try {
        await deleteObject(imagemRef);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
};

module.exports = { deletarImagem }