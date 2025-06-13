const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para adicionar uma nova categoria
router.post('/categorias', categoriaController.criarCategoria);

// Rota para listar todas as categorias
router.get('/categorias', categoriaController.listarCategorias);

// Rota para atualizar uma categoria específica
router.put('/categorias/:id', categoriaController.atualizarCategoria);

// Rota para remover uma categoria
router.delete('/categorias/:id', categoriaController.removerCategoria);

module.exports = router;
