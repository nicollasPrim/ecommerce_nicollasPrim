const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedido.controller');
const autenticar = require('../middleware/auth.middleware'); // caso tenha auth

// Criar pedido
router.post('/criar', autenticar, pedidoController.criarPedido);

// Listar pedidos do usuário
router.get('/meus', autenticar, pedidoController.listarMeusPedidos);

// Buscar pedido completo
router.get('/:id', autenticar, pedidoController.buscarPedido);

// Listar todos (ADMIN)
router.get('/', autenticar, pedidoController.listarTodosPedidos);

module.exports = router;
