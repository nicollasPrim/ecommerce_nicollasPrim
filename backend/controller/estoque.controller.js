const { criarEstoque, listarEstoques, atualizarEstoque, atualizarEstoqueCompleto, apagarEstoque } = require('../service/estoque.service')

async function criar(req, res) {
    try {
        const estoque = await criarEstoque(req.body)

        return res.status(201).json({
            mensagem: "Estoque criado com sucesso!",
            estoque
        })

    } catch (err) {
        return res.status(500).json({
            message: "Erro ao criar estoque!",
            err: err.message
        })
    }
}

async function listar(req, res) {
    try {
        const estoques = await listarEstoques()

        return res.status(200).json(estoques)

    } catch (err) {
        return res.status(500).json({
            message: "Erro ao listar estoques!",
            err: err.message
        })
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const estoqueAtualizado = await atualizarEstoque(id, dados)

        return res.status(200).json({
            mensagem: "Estoque atualizado com sucesso!",
            estoque: estoqueAtualizado
        })

    } catch (err) {
        return res.status(500).json({
            message: "Erro ao atualizar estoque!",
            err: err.message
        })
    }
}

async function atualizarCompleto(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const estoqueAtualizado = await atualizarEstoqueCompleto(id, dados)

        return res.status(200).json({
            mensagem: "Estoque atualizado com sucesso!",
            estoque: estoqueAtualizado
        })

    } catch (err) {
        return res.status(500).json({
            message: "Erro ao atualizar estoque!",
            err: err.message
        })
    }
}

async function apagar(req, res) {
    try {
        const { id } = req.params

        await apagarEstoque(id)

        return res.status(200).json({
            mensagem: "Estoque apagado com sucesso!"
        })

    } catch (err) {
        return res.status(500).json({
            message: "Erro ao apagar estoque!",
            err: err.message
        })
    }
}

module.exports = { criar, listar, atualizar, atualizarCompleto, apagar }
