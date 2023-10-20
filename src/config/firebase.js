const { initializeApp } = require("firebase/app");
require("dotenv").config();
const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: process.env.DOMAIN,
  projectId: process.env.PROJECT,
  storageBucket: process.env.BUCKET,
  messagingSenderId: process.env.SENDER,
  appId: process.env.APPID,
};

const app = initializeApp(firebaseConfig);

module.export = { app };
