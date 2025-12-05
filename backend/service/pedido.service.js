const Pedido = require('../models/Pedido');
const ItemPedido = require('../models/ItemPedido');
const Entrega = require('../models/Entrega');
const Produto = require('../models/Produto');

module.exports = {

    async criarPedidoCompleto(idUsuario, dados) {
        const { valorSubtotal, valorFrete, valorTotal, itens, entrega } = dados;

        // 1 — Criar Pedido
        const pedidoCriado = await Pedido.create({
            idUsuario,
            valorSubtotal,
            valorFrete,
            valorTotal
        });

        // 2 — Criar Itens do Pedido
        for (let item of itens) {
            await ItemPedido.create({
                idPedido: pedidoCriado.codPedido,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
                valorTotalItem: item.valorTotalItem
            });
        }

        // 3 — Criar Entrega
        await Entrega.create({
            idPedido: pedidoCriado.codPedido,
            cep: entrega.cep,
            logradouro: entrega.logradouro,
            bairro: entrega.bairro,
            localidade: entrega.localidade,
            uf: entrega.uf,
            numero: entrega.numero,
            complemento: entrega.complemento || null
        });

        // 4 — Retornar pacote completo
        return {
            pedido: pedidoCriado,
            itens,
            entrega
        };
    },

    async listarPedidosUsuario(idUsuario) {
        return await Pedido.findAll({
            where: { idUsuario },
            include: [
                { model: ItemPedido },
                { model: Entrega }
            ]
        });
    },

    async buscarPedidoCompleto(idPedido) {
        return await Pedido.findOne({
            where: { codPedido: idPedido },
            include: [
                { model: ItemPedido, include: Produto },
                { model: Entrega }
            ]
        });
    },

    async listarTodosPedidos() {
        return await Pedido.findAll({
            include: [
                { model: ItemPedido, include: Produto },
                { model: Entrega }
            ]
        });
    }

};
