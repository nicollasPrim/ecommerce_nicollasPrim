const Produto = require('../models/Produto')

async function criarProduto(dados) {

    const { nome, nomeArtista, tracklist, genero, preco, imagem_url, ativo } = dados

    // Validações simples antes de salvar
    if (!nome || !nomeArtista || !tracklist || !preco) {
        throw new Error('Nome, genêro e preço são obrigatórios!')
    }

    const novoProduto = await Produto.create({ nome, nomeArtista, tracklist, genero, preco, imagem_url, ativo })

    return novoProduto
}

async function listarProdutos() {
    const produtos = await Produto.findAll()
    return produtos
}

async function buscarProdutoPorId(id) {
    const produto = await Produto.findByPk(id)
    return produto
}


async function atualizarProduto(id, dados) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    await produto.update(dados)

    return produto
}

async function atualizarProdutoCompleto(id, dados) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    const { nome, nomeArtista, tracklist, genero, preco, imagem_url, ativo } = dados

    if (!nome || !nomeArtista || !tracklist || !preco) {
        throw new Error('Nome, modelo e preço são obrigatórios!')
    }

    await produto.update({ nome, nomeArtista, tracklist, genero, preco, imagem_url, ativo })

    return produto
}

async function apagarProduto(id) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado!')
    }

    await produto.destroy()

    return true
}


module.exports = { criarProduto, listarProdutos, atualizarProduto, atualizarProdutoCompleto, apagarProduto, buscarProdutoPorId }
