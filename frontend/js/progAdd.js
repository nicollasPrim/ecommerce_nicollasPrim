// Botões e inputs
const b1 = document.getElementById('btn1')
const b2 = document.getElementById('btn2')
const b3 = document.getElementById('btn3')
const b4 = document.getElementById('btn4')

const q1 = document.getElementById('qtde1')
const q2 = document.getElementById('qtde2')
const q3 = document.getElementById('qtde3')
const q4 = document.getElementById('qtde4')

// Carrega carrinho
let produtos = JSON.parse(localStorage.getItem('produtos')) || []

function adicionarProduto(botao, inputQtde) {
    const nome = botao.dataset.nome
    const preco = Number(botao.dataset.preco)
    const codProd = Number(botao.dataset.codprod)
    const qtde = Number(inputQtde.value)

    if (qtde <= 0) {
        alert("Informe uma quantidade válida!")
        return
    }

    // Verifica se já existe no carrinho
    const existente = produtos.find(p => p.codProd === codProd)

    if (existente) {
        existente.qtde += qtde
    } else {
        produtos.push({
            nome,
            preco,
            codProd,   // usado depois como idProduto
            qtde
        })
    }

    localStorage.setItem('produtos', JSON.stringify(produtos))
    alert(`${qtde}x ${nome} adicionado(s) ao carrinho!`)
}

// Eventos individuais
b1.addEventListener('click', () => adicionarProduto(b1, q1))
b2.addEventListener('click', () => adicionarProduto(b2, q2))
b3.addEventListener('click', () => adicionarProduto(b3, q3))
b4.addEventListener('click', () => adicionarProduto(b4, q4))
