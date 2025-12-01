let nomeUsuario = document.getElementById('nomeUsuario')
let btnLogout = document.getElementById('btnLogout')
let btnPuxarProduto = document.getElementById('btnPuxarProduto')
let btnAtualizarProduto = document.getElementById('btnAtualizarProduto')
let resListar = document.getElementById('resListar')

let token = sessionStorage.getItem('token')

// Se não tiver token, volta para login
if (!token) location.href = '../index.html'

// ======================= LISTAR TODOS =======================
onload = () => {
    fetch(`http://localhost:3000/produto`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(resp => resp.json())
        .then(dados => {
            resListar.innerHTML = `<table>${gerarTabela(dados)}</table>`
        })
        .catch(err => {
            console.log('Falha ao listar os produtos!', err)
            resListar.innerHTML += err.message
        })
}

// ======================= PUXAR PRODUTO =======================
btnPuxarProduto.addEventListener('click', (e) => {
    e.preventDefault()

    const codProduto = Number(document.getElementById('codProduto').value)

    if (!codProduto || codProduto <= 0) {
        alert("Digite um código válido.")
        return
    }

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(resp => {
            if (!resp.ok) throw new Error("Produto não encontrado.")
            return resp.json()
        })
        .then(produto => {
            document.getElementById('nome').value = produto.nome
            document.getElementById('nomeArtista').value = produto.nomeArtista
            document.getElementById('tracklist').value = produto.tracklist
            document.getElementById('genero').value = produto.genero
            document.getElementById('preco').value = produto.preco
            document.getElementById('imagem_url').value = produto.imagem_url
        })
        .catch(err => {
            alert(err.message)
        })
})

// ======================= ATUALIZAR PRODUTO =======================
btnAtualizarProduto.addEventListener('click', (e) => {
    e.preventDefault()

    const codProduto = Number(document.getElementById('codProduto').value)

    if (!codProduto || codProduto <= 0) {
        alert("Puxe um produto válido antes de atualizar.")
        return
    }

    const dados = {
        nome: document.getElementById('nome').value,
        nomeArtista: document.getElementById('nomeArtista').value,
        tracklist: document.getElementById('tracklist').value,
        genero: document.getElementById('genero').value,
        preco: document.getElementById('preco').value,
        imagem_url: document.getElementById('imagem_url').value
    }

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(() => {
            alert('Produto atualizado com sucesso!')
        })
        .catch(err => {
            alert('Falha ao atualizar produto!')
            console.error(err)
        })
})

// ======================= TABELA =======================
function gerarTabela(dados) {
    let tab = `
        <thead>
            <th>Código</th>
            <th>Nome</th>
            <th>Artista</th>
            <th>Genêro</th>
            <th>Músicas</th>
            <th>Preço</th>
            <th>Imagem</th>
        </thead>
        <tbody>
    `
    dados.forEach(dad => {
        tab += `
            <tr>
                <td>${dad.codProduto}</td>
                <td>${dad.nome}</td>
                <td>${dad.nomeArtista}</td>
                <td>${dad.genero}</td>
                <td>${dad.tracklist}</td>
                <td>${dad.preco}</td>
                <td><img src="${dad.imagem_url}" style="width:120px"></td>
            </tr>
        `
    })
    tab += `</tbody>`
    return tab
}

// ======================= LOGOUT =======================
btnLogout.addEventListener('click', () => {
    sessionStorage.clear()
    location.href = '../index.html'
})
