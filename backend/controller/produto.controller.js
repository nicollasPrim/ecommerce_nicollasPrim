const { criarProduto, listarProdutos, atualizarProduto, atualizarProdutoCompleto, apagarProduto } = require('../service/produto.service')

async function criar(req, res) {
    try {
        const produto = await criarProduto(req.body)

        return res.status(201).json({
            mensagem: "Produto criado com sucesso!", produto
        })

    } catch (err) {
        return res.status(500).json({ 
            message: "Erro ao criar!", err
        })
    }
}

async function listar(req, res) {
    try {
        const produtos = await listarProdutos()

        return res.status(200).json(produtos)

    } catch (err) {
        return res.status(500).json({ 
            message: "Erro ao listar produtos!", err
        })
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProduto(id, dados)

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            produto: produtoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ 
            message: "Erro ao atualizar produto!", err
        })
    }

}

async function atualizarCompleto(req, res) {
    try {
        const id = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProdutoCompleto(id, dados)

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            produto: produtoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ 
            message: "Erro ao atualizar produto!", err
        })
    }
}

async function apagar(req, res) {
    try {
        const id = req.params

        await apagarProduto(id)

        return res.status(200).json({ 
            mensagem: "Produto apagado com sucesso!"
        })

    } catch (err) {
        return res.status(500).json({ 
            message: "Erro ao apagar produto!", err
        })
    }
}

module.exports = { criar, listar, atualizar, atualizarCompleto, apagar }