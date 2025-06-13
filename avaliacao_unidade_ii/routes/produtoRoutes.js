const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para adicionar um novo produto
router.post('/produtos', produtoController.criarProduto);

// Rota para listar todos os produtos
router.get('/produtos', produtoController.listarProdutos);

// Rota para atualizar um produto específico
router.put('/produtos/:id', produtoController.atualizarProduto);

// Rota para remover um produto
router.delete('/produtos/:id', produtoController.removerProduto);

module.exports = router;
