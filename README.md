# 🎵 Neon Disc Store — E-commerce de CDs, Vinis e Edições Especiais

A **Neon Disc Store** é uma plataforma completa de e-commerce desenvolvida para venda de **discos, vinis e colecionáveis musicais**, combinando um tema moderno com uma estética inspirada nos anos 2000.

O sistema possui **cliente + admin**, incluindo catálogo, carrinho, autenticação, gerenciamento de CDs, controle de estoque e painel administrativo.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- HTML5 + CSS3 (tema dark Y2K neon)
- JavaScript Vanilla
- Fetch API
- LocalStorage para carrinho
- Layout responsivo e modular

### **Backend**
- Node.js + Express
- Sequelize ORM
- MySQL
- JWT (autenticação segura)
- Bcrypt (hash de senhas)
- Arquitetura MVC

---

## 📀 Funcionalidades

### 👤 **Usuário**
- Cadastro e login com validação
- Autenticação via JWT (Bearer Token)
- Exibição dinâmica do usuário no menu
- Acesso ao carrinho e páginas autenticadas

---

### 🛒 **Loja (Cliente)**
- Página inicial estilizada com tema neon/Y2K  
- Busca de produtos
- Catálogo dinâmico de discos
- Cards interativos
- Adicionar produtos ao carrinho
- Carrinho salvo no LocalStorage
- Cálculo automático de subtotal e total

---

### 🛠️ **Painel Administrativo**
Arquivo: `home.html`

- Cadastrar novos CDs  
- Editar e atualizar produtos  
- Gerenciar catálogo completo  
- Ajustar preços, capas e tracklists  
- Controle de estoque (relação 1:1 entre produto e estoque)

---

### 📦 **Pedidos & Entrega**
- Criação de pedido com múltiplos itens  
- Associação ao usuário autenticado  
- Cálculo de subtotal, total e frete  
- Endereço automático via **API ViaCEP**  
- Status de entrega (em trânsito, entregue, extraviado, etc.)  

---

## 🔐 Segurança

Rotas protegidas utilizam **Bearer Token** (JWT).  
Sem token → acesso negado.

Rotas seguras incluem:

/usuario/me
/pedido
/entrega
/produto/cadastrar
/produto/alterar

yaml
Copiar código

Senhas são armazenadas via **bcrypt** com salt.

---

## 📂 Estrutura do Projeto

ecommerce_nicollasPrim/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── db/
│ ├── index.js
│ └── sync.js
│
├── frontend/
│ ├── css/
│ ├── js/
│ ├── assets/
│ ├── html/
│ │ ├── login.html
│ │ ├── carrinho.html
│ │ ├── cadastrarProduto.html
│ │ ├── manipularProduto.html
│ │ └── home.html (Painel Admin)
│ └── index.html (Página da loja)
│
└── README.md

yaml
Copiar código

---

## 📌 Como Executar o Backend

### 1. Instale as dependências

```bash
cd backend
npm install

2. Crie o arquivo .env
Copiar código
DB_NAME=db_ecom
DB_USER=root
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES=3h
BCRYPT_SALT_ROUNDS=10

PORT=3000

3. Sincronize o banco de dados
bash
Copiar código
node sync.js
4. Inicie o servidor
bash
Copiar código
node index.js
🌐 Rodando o Frontend
Basta abrir:

bash
Copiar código
frontend/index.html
Ou utilizar um servidor local (Live Server recomendado).

O frontend já está configurado para consumir:

arduino
Copiar código
http://localhost:3000
