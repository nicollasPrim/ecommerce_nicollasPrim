const express = require('express')
const router = express.Router()

const { 
    criar, 
    listar, 
    atualizar, 
    atualizarCompleto, 
    apagar 
} = require('../controller/estoque.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const isAdminMiddleware = require('../middleware/isAdmin.middleware')

/**
 * POST /estoque
 * Criar registro de estoque (ADMIN)
 */
router.post(
    '/',
    authMiddleware,     // precisa estar logado
    isAdminMiddleware,  // precisa ser admin
    criar
)

/**
 * GET /estoque
 * Listar tudo (usuário logado)
 */
router.get(
    '/',
    authMiddleware,
    listar
)

/**
 * PATCH /estoque/:id
 * Atualização parcial (ADMIN)
 */
router.patch(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    atualizar
)

/**
 * PUT /estoque/:id
 * Atualização completa (ADMIN)
 */
router.put(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    atualizarCompleto
)

/**
 * DELETE /estoque/:id
 * Remover item do estoque (ADMIN)
 */
router.delete(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    apagar
)

module.exports = router
