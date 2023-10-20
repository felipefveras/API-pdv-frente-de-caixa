require('dotenv').config()

const app = require('./servidor.js');
const PORTA = process.env.PORT | 3000;



app.listen(PORTA);