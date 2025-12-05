// ===================== LOGIN INFO =====================
const nome = sessionStorage.getItem("nome");
const tipo = sessionStorage.getItem("tipo_usuario");
const token = sessionStorage.getItem("token");

const userDisplay = document.getElementById("userDisplay");
const adminLink = document.getElementById("adminLink");

if (nome) userDisplay.innerHTML = `Olá, ${nome}`;
if (tipo === "ADMIN") adminLink.style.display = "inline-block";

// ===================== PEGAR USUÁRIO LOGADO (AQUI!!!) =====================
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
console.log("UsuarioLogado:", usuario);

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
    if (!usuario) {
        alert("Faça login para adicionar ao carrinho!");
        window.location.href = "login.html";
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    fetch(`http://localhost:3000/produto/${codProduto}`)
        .then(r => r.json())
        .then(prod => {

            const existente = carrinho.find(p => p.codProd === prod.codProduto);

            if (existente) {
                existente.qtde++;
            } else {
                carrinho.push({
                    codProd: prod.codProduto,
                    nome: prod.nome,
                    preco: Number(prod.preco),
                    qtde: 1
                });
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            alert("Produto adicionado ao carrinho!");
        })
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
