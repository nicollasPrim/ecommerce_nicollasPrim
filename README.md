🎵 Neon Disc Store — E-commerce de CDs, Vinis e Edições Especiais

A Neon Disc Store é uma plataforma completa de e-commerce desenvolvida para venda de discos, CDs, vinis e colecionáveis musicais, combinando uma estética moderna com uma identidade visual inspirada na internet dos anos 2000.

O projeto é dividido em Frontend + Backend, inclui sistema de autenticação, carrinho, catálogo, área do cliente e um painel administrativo onde é possível cadastrar, editar e gerenciar produtos.

🚀 Tecnologias Utilizadas
Frontend

HTML5 + CSS3 (tema dark Y2K neon)

JavaScript Vanilla

Fetch API para comunicação com o backend

LocalStorage para carrinho

Layout modular com componentes reutilizáveis

Backend

Node.js + Express

Sequelize ORM

MySQL

JWT para autenticação via Bearer Token

Bcrypt para hashing seguro

Arquitetura MVC

📀 Funcionalidades Principais
👤 Usuários

Cadastro e login com validação

Autenticação JWT com persistência

Perfil do usuário (edição futura)

Proteção de rotas privadas

Exibição dinâmica do nome do usuário no menu

🛒 Loja (Cliente)

Página inicial estilizada com banner Y2K

Busca de produtos por nome

Listagem dinâmica de CDs/vinis

Adicionar itens ao carrinho

Carrinho persistente no LocalStorage

Resumo do pedido com subtotal, frete e total

Finalização da compra integrada ao backend

Interface totalmente adaptada ao estilo Neon Disc Store

🛠️ Painel Administrativo

A página home.html oferece um dashboard elegante inspirado em portais de CMS dos anos 2000.

Recursos:

Cadastrar CDs (nome, artista, tracklist, preço, capa, gênero etc.)

Editar e atualizar produtos existentes

Gerenciar catálogo completo

Controle de estoque (1:1 com produtos)

Autenticação obrigatória para acessar o painel

📦 Pedidos & Entrega

Criação de pedidos com itens (1:N)

Cálculo de subtotal, total e frete

Armazenamento de dados do cliente

Endereço preenchido automaticamente via API ViaCEP

Status progressivo de entrega (em trânsito, entregue etc.)

🔐 Segurança

O backend utiliza:

✔ Token JWT em rotas protegidas
✔ Hash seguro de senhas com Bcrypt
✔ Middleware para validação de token
✔ Controle de acesso para administrador

Rotas como:

/pedido
/usuario/me
/entrega
/produto/cadastrar


exigem autenticação válida.

📂 Estrutura do Projeto
/ecommerce_nicollasPrim
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   ├── db/
│   └── sync.js
│
├── frontend/
│   ├── html/
│   │   ├── login.html
│   │   ├── carrinho.html
│   │   ├── home.html   (painel admin)
│   │   ├── cadastrarProduto.html
│   │   └── manipuladorProduto.html
│   ├── css/
│   │   ├── style.css   (tema principal)
│   │   ├── menu.css
│   │   └── páginas específicas
│   ├── js/
│   └── index.html      (loja inicial)

📌 Como Rodar o Backend
1. Instale dependências
cd backend
npm install

2. Configure o arquivo .env
DB_NAME=db_ecom
DB_USER=root
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES=3h
BCRYPT_SALT_ROUNDS=10

PORT=3000

3. Sincronize as tabelas
node sync.js

4. Inicie o servidor
node index.js
