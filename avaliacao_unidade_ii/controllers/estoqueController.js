const {Produto} = require('../models/produto');
const {Categoria} = require('../models/categoria');
const {Estoque} = require('../models/estoque');

const entradaEstoque = async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;
        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        // Adiciona quantidade ao estoque
        let estoque = await Estoque.findOne({ where: { produtoId } });
        if (estoque) {
            estoque.quantidade += quantidade;
            await estoque.save();
        } else {
            estoque = await Estoque.create({ produtoId, quantidade });
        }
        res.status(201).json(estoque);
    } catch (error) {
        res.status(400).json({ error: 'Erro na entrada de estoque', details: error.message });
    }
};

const saidaEstoque = async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;
        const estoque = await Estoque.findOne({ where: { produtoId } });
        if (!estoque) {
            return res.status(404).json({ error: 'Produto não encontrado no estoque' });
        }
        if (estoque.quantidade < quantidade) {
            return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
        }
        estoque.quantidade -= quantidade;
        await estoque.save();
        res.status(200).json(estoque);
    } catch (error) {
        res.status(400).json({ error: 'Erro na saída de estoque', details: error.message });
    }
};

const consultarEstoque = async (req, res) => {
    try {
        const estoques = await Estoque.findAll({
            include: [
                {
                    model: Produto,
                    attributes: ['nome'],
                    include: [
                        {
                            model: Categoria, // Use a variável importada
                            attributes: ['nome'],
                        }
                    ]
                },
            ],
        });
        res.status(200).json(estoques);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao consultar estoque', details: error.message });
    }
};

module.exports = {
    entradaEstoque,
    saidaEstoque,
    consultarEstoque,
};
