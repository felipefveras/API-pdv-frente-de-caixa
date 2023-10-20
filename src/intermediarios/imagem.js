const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { app } = require("../config/firebase");
const storage = getStorage(app);

const salvarImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const nomeArquivo = `${Date.now()}-${req.file.originalname}`;
  const storageRef = ref(storage, nomeArquivo);
  const snapshot = await uploadBytes(storageRef, req.file.buffer, {
    contentType: req.file.mimetype,
  });

  req.file.firebaseUrl = await getDownloadURL(snapshot.ref);

  next();
};

module.exports = {
  salvarImage,
};
