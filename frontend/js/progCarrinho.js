// =========================
// PEGAR USUÁRIO LOGADO
// =========================
const userDisplay = document.getElementById("userDisplay");
const usuario = JSON.parse(localStorage.getItem("usuarioLogado")); 
const token = sessionStorage.getItem("token"); 
const idUsuario = sessionStorage.getItem("idUsuario");

if (usuario) userDisplay.textContent = usuario.nome;


// =========================
// CARRINHO
// =========================
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const areaCarrinho = document.getElementById("area-carrinho");
const totalEl = document.getElementById("total");

// Renderiza o carrinho na tela
function renderCarrinho() {
    areaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        areaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalEl.textContent = "Total: R$ 0,00";
        return;
    }

    let total = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.qtde;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-info">
                <p><strong>${item.nome}</strong></p>
                <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                <p>Quantidade: ${item.qtde}</p>
                <p><strong>Subtotal: R$ ${subtotal.toFixed(2)}</strong></p>
            </div>

            <button class="btn-remove" data-index="${index}">
                <i class="fa fa-trash"></i> Remover
            </button>
        `;
        areaCarrinho.appendChild(div);
    });

    totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}


// Remover item individual
document.addEventListener("click", function (e) {
    if (e.target.closest(".btn-remove")) {
        const index = e.target.closest(".btn-remove").dataset.index;
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        renderCarrinho();
    }
});


// Limpar carrinho
document.getElementById("btn-limpar").addEventListener("click", () => {
    carrinho = [];
    localStorage.setItem("carrinho", "[]");
    renderCarrinho();
});


// =========================
// VIACEP
// =========================
document.getElementById("cep").addEventListener("blur", async function () {
    const cep = this.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) return;

    document.getElementById("rua").value = data.logradouro;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("estado").value = data.uf;
});


// =========================
// FINALIZAR COMPRA
// =========================
document.getElementById("btn-finalizar").addEventListener("click", async () => {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    if (!token) {
        alert("Você precisa estar logado para finalizar a compra.");
        return;
    }

    // validar endereço
    const camposObrigatorios = ["cep", "rua", "bairro", "cidade", "estado", "numero"];

    for (let campo of camposObrigatorios) {
        if (document.getElementById(campo).value.trim() === "") {
            alert("Preencha todos os campos obrigatórios de endereço.");
            return;
        }
    }

    const endereco = {
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        localidade: document.getElementById("cidade").value,
        uf: document.getElementById("estado").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value
    };

    let subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.qtde), 0);
    let frete = 15;
    let valorTotal = subtotal + frete;

    const pedido = {
        idUsuario: idUsuario,
        valorSubtotal: subtotal,
        valorFrete: frete,
        valorTotal: valorTotal,
        itens: carrinho.map(item => ({
            idProduto: item.codProd,
            quantidade: item.qtde,
            precoUnitario: item.preco,
            valorTotalItem: item.preco * item.qtde
        })),
        entrega: endereco
    };

    try {
        const response = await fetch("http://localhost:3000/pedido/criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();

        if (data.sucesso) {
            alert("Compra finalizada com sucesso!");
            localStorage.setItem("carrinho", "[]");
            window.location.href = "index.html";
        } else {
            console.log(data);
            alert("Erro ao criar pedido.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao enviar pedido para o servidor.");
    }

});


// Voltar
document.getElementById("btn-voltar").addEventListener("click", () => {
    history.back();
});


// Renderizar no início
renderCarrinho();
