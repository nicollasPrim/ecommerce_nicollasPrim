// Referências aos elementos
const areaCarrinho = document.getElementById('area-carrinho')
const totalTexto = document.getElementById('total')
const btnLimpar = document.getElementById('btn-limpar')
const btnFinalizar = document.getElementById('btn-finalizar')
const btnVoltar = document.getElementById('btn-voltar')

// Recupera os produtos do localStorage
let produtos = JSON.parse(localStorage.getItem('produtos')) || []

// Renderiza a tabela do carrinho
function mostrarCarrinho() {
    if (produtos.length === 0) {
        areaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
        totalTexto.textContent = 'Total: R$ 0,00'
        return
    }

    let total = 0
    let tabelaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Preço (R$)</th>
                    <th>Qtde</th>
                    <th>Subtotal (R$)</th>
                </tr>
            </thead>
            <tbody>
    `

    produtos.forEach(p => {
        const subtotal = p.preco * p.qtde
        total += subtotal

        tabelaHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.preco.toFixed(2)}</td>
                <td>${p.qtde}</td>
                <td>${subtotal.toFixed(2)}</td>
            </tr>
        `
    })

    tabelaHTML += `</tbody></table>`
    areaCarrinho.innerHTML = tabelaHTML
    totalTexto.textContent = `Total: R$ ${total.toFixed(2)}`
}

// Finalizar compra — ENVIA PARA /pedido CORRETAMENTE
btnFinalizar.addEventListener('click', () => {
    if (produtos.length === 0) {
        alert('Seu carrinho está vazio!')
        return
    }

    // Prepara payload no formato dos models (Pedido + ItemPedido)
    const itens = produtos.map((p) => ({
        idProduto: p.codProd,       // compatível com modelo Produto
        quantidade: p.qtde,
        precoUnitario: p.preco,
        valorTotalItem: p.qtde * p.preco
    }))

    const pedido = {
        itens,
        valorSubtotal: itens.reduce((acc, item) => acc + item.valorTotalItem, 0),
        valorFrete: 0, // Ajuste depois
        valorTotal: itens.reduce((acc, item) => acc + item.valorTotalItem, 0),
    }

    fetch('http://localhost:3000/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    })
    .then(res => res.json())
    .then(dados => {
        console.log('Pedido criado:', dados)
        alert('Compra finalizada com sucesso!')
        localStorage.removeItem('produtos')
        produtos = []
        mostrarCarrinho()
    })
    .catch(err => {
        console.error('Erro ao enviar dados:', err)
        alert('Erro ao enviar dados ao servidor.')
    })
})

// Limpar carrinho
btnLimpar.addEventListener('click', () => {
    areaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
    totalTexto.textContent = 'Total: R$ 0,00'
    localStorage.removeItem('produtos')
})

// Voltar à loja
btnVoltar.addEventListener('click', () => {
    location.href = 'index.html'
})

mostrarCarrinho()
