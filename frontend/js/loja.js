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
        location.href = "login.html";
        return;
    }

    fetch(`http://localhost:3000/produto/${codProduto}`)
        .then(res => res.json())
        .then(prod => {
            let carrinho = JSON.parse(localStorage.getItem("produtos")) || [];

            const index = carrinho.findIndex(p => p.codProd === prod.codProduto);

            if (index !== -1) {
                carrinho[index].qtde++;
            } else {
                carrinho.push({
                    codProd: prod.codProduto,
                    nome: prod.nome,
                    artista: prod.nomeArtista,
                    preco: Number(prod.preco),
                    imagem: prod.imagem_url,
                    qtde: 1
                });
            }

            localStorage.setItem("produtos", JSON.stringify(carrinho));

            alert("Produto adicionado ao carrinho!");
        })
        .catch(err => console.error("Erro ao adicionar ao carrinho:", err));
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
