const { Sequelize } = require('sequelize')
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, '.env')
})

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

sequelize.authenticate()
.then(() => {
    console.log('Conexão realizada com sucesso!')
})
.catch((err) => {
    console.error('Erro ao se conectar com banco de dados!', err)
})

module.exports = sequelize