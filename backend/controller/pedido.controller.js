const pedidoService = require('../service/pedido.service');

module.exports = {
    
    async criarPedido(req, res) {
        try {
            const dadosPedido = req.body;
            const usuarioId = req.usuario.id; 

            const resultado = await pedidoService.criarPedidoCompleto(usuarioId, dadosPedido);

            return res.status(201).json({ sucesso: true, pedido: resultado });
        } catch (erro) {
            console.error("Erro ao criar pedido:", erro);
            return res.status(500).json({ erro: "Erro ao criar pedido." });
        }
    },

    async listarMeusPedidos(req, res) {
        try {
            const usuarioId = req.usuario.id;

            const pedidos = await pedidoService.listarPedidosUsuario(usuarioId);
            return res.json(pedidos);

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro ao listar pedidos." });
        }
    },

    async buscarPedido(req, res) {
        try {
            const pedidoId = req.params.id;

            const pedido = await pedidoService.buscarPedidoCompleto(pedidoId);
            return res.json(pedido);

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro ao buscar pedido." });
        }
    },

    async listarTodosPedidos(req, res) {
        try {
            const pedidos = await pedidoService.listarTodosPedidos();
            return res.json(pedidos);

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro ao listar todos os pedidos." });
        }
    }

};
