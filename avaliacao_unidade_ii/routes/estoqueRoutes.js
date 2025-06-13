const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Rota para entrada de estoque
router.post('/estoque/entrada', estoqueController.entradaEstoque);

// Rota para saída de estoque
router.post('/estoque/saida', estoqueController.saidaEstoque);

// Rota para consultar o estoque
router.get('/estoque', estoqueController.consultarEstoque);

module.exports = router;
