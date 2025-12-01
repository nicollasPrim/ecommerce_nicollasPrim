const express = require('express')
const router = express.Router()

const { 
    criar, 
    listar, 
    atualizar, 
    atualizarCompleto, 
    buscarPorId, 
    apagar 
} = require('../controller/produto.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const isAdminMiddleware = require('../middleware/isAdmin.middleware')

// POST /produto  (ADMIN)
router.post(
    '/',
    authMiddleware,
    isAdminMiddleware,
    criar
)

// GET /produto — listar (qualquer um)
router.get(
    '/',
    listar
)

// GET /produto/:id — buscar por id
router.get(
    '/:id',
    buscarPorId
)

// PATCH /produto/:id — atualização parcial (ADMIN)
router.patch(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    atualizar
)

// PUT /produto/:id — atualização completa (ADMIN)
router.put(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    atualizarCompleto
)

// DELETE /produto/:id — deletar (ADMIN)
router.delete(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    apagar
)

module.exports = router
