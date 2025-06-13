const {Categoria} = require('../models/categoria');

// Cria uma nova categoria
const criarCategoria = async (req, res) => {
    try {
        const { nome } = req.body;
        
        // Verifica se a categoria já existe
        const categoriaExistente = await Categoria.findOne({ where: { nome } });
        if (categoriaExistente) {
            return res.status(400).json({ error: 'Categoria já existe' });
        }

        // Cria a nova categoria
        const categoria = await Categoria.create({ nome });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar categoria', details: error.message });
    }
};

// Lista todas as categorias
const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar categorias', details: error.message });
    }
};

// Atualiza uma categoria existente
const atualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        // Verifica se a categoria existe
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        // Atualiza a categoria
        await categoria.update({ nome });
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar categoria', details: error.message });
    }
};

// Remove uma categoria
const removerCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se a categoria existe
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        // Remove a categoria
        await categoria.destroy();
        res.status(204).send(); // Retorna sem conteúdo (no content)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover categoria', details: error.message });
    }
};

module.exports = {
    criarCategoria,
    listarCategorias,
    atualizarCategoria,
    removerCategoria,
};
