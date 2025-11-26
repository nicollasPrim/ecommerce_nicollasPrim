const { DataTypes } = require('sequelize')
const db = require('../db/conn') 

const Produto = db.define('produto',{
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nomeArtista: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    tracklist: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    imagem_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: true,
    tableName: 'produtos'
})

module.exports = Produto