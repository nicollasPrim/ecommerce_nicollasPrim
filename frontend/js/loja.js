// ===================== LOGIN INFO =====================
const nome = sessionStorage.getItem("nome");
const tipo = sessionStorage.getItem("tipo_usuario");
const token = sessionStorage.getItem("token");

const userDisplay = document.getElementById("userDisplay");
const adminLink = document.getElementById("adminLink");

// Mostrar nome
if (nome) userDisplay.innerHTML = `Olá, ${nome}`;

// Mostrar botão Admin
if (tipo === "ADMIN") adminLink.style.display = "inline-block";

// ===================== PRODUTOS =====================
const grid = document.getElementById("productsGrid");

async function carregarProdutos() {
    try {
        const resp = await fetch("http://localhost:3000/produto");
        const produtos = await resp.json();

        grid.innerHTML = "";

        produtos.forEach(prod => {
            grid.innerHTML += `
                <div class="cartao-produto">
                    <img src="${prod.imagem_url}" alt="${prod.nome}">
                    <h3>${prod.nome}</h3>
                    <p>${prod.nomeArtista}</p>
                    <p><b>Preço:</b> R$ ${Number(prod.preco).toFixed(2)}</p>
                    <button class="btn-add" onclick="adicionarAoCarrinho(${prod.codProduto})">
                        Adicionar ao carrinho
                    </button>
                </div>
            `;
        });

    } catch (err) {
        console.error("Erro ao carregar produtos", err);
        grid.innerHTML = "<p>Falha ao carregar produtos.</p>";
    }
}

carregarProdutos();

// ===================== ADICIONAR AO CARRINHO =====================
function adicionarAoCarrinho(codProduto) {
    if (!token) {
        alert("Faça login para adicionar ao carrinho!");
        location.href = "./html/login.html"; // AJUSTADO
        return;
    }

    fetch("http://localhost:3000/carrinho", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ codProduto })
    })
    .then(r => r.json())
    .then(() => alert("Produto adicionado ao carrinho!"))
    .catch(err => console.error("Erro:", err));
}

// ===================== BUSCA =====================
document.getElementById("searchBtn").addEventListener("click", () => {
    const termo = document.getElementById("searchInput").value.toLowerCase();

    const cards = document.querySelectorAll(".cartao-produto");

    cards.forEach(card => {
        const nome = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = nome.includes(termo) ? "block" : "none";
    });
});
