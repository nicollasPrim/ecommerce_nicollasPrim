const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, '../.env') // ajuste conforme onde está seu .env
})

function gerarToken(payload) {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não definido no .env!")
    }

    if (!process.env.JWT_EXPIRES) {
        throw new Error("JWT_EXPIRES não definido no .env!")
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

module.exports = { gerarToken }
