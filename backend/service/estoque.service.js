const Estoque = require('../models/Estoque')

async function criarEstoque(dados) {

    const { idProduto, quantidade_atual, quantidade_minima } = dados

    // Validações simples
    if (!idProduto) {
        throw new Error("O campo 'idProduto' é obrigatório!")
    }

    // Criar registro no estoque
    const novoEstoque = await Estoque.create({
        idProduto,
        quantidade_atual: quantidade_atual ?? 0,
        quantidade_minima: quantidade_minima ?? 0
    })

    return novoEstoque
}

async function listarEstoques() {
    const estoques = await Estoque.findAll()
    return estoques
}

async function atualizarEstoque(id, dados) {

    const estoque = await Estoque.findByPk(id)

    if (!estoque) {
        throw new Error("Estoque não encontrado!")
    }

    await estoque.update(dados)

    return estoque
}

async function atualizarEstoqueCompleto(id, dados) {

    const estoque = await Estoque.findByPk(id)

    if (!estoque) {
        throw new Error("Estoque não encontrado!")
    }

    const { idProduto, quantidade_atual, quantidade_minima } = dados

    if (!idProduto) {
        throw new Error("O campo 'idProduto' é obrigatório!")
    }

    await estoque.update({
        idProduto,
        quantidade_atual: quantidade_atual ?? 0,
        quantidade_minima: quantidade_minima ?? 0
    })

    return estoque
}

async function apagarEstoque(id) {

    const estoque = await Estoque.findByPk(id)

    if (!estoque) {
        throw new Error("Estoque não encontrado!")
    }

    await estoque.destroy()

    return true
}

module.exports = { criarEstoque, listarEstoques, atualizarEstoque, atualizarEstoqueCompleto, apagarEstoque }
