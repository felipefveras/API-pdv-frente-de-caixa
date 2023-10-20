require('dotenv').config();


const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB,
        password: process.env.DB_PASSWORD,
        ssl: { rejectUnauthorized: false } || false
    },

});


module.exports = knex;