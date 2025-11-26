const prisma = require('../prisma/client');

const getAll = async (req, res) => {
    const kategorie = await prisma.kategoria.findMany({
        include: { _count: { select: { wpisy: true } } }
    });
    res.json(kategorie);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const kategoria = await prisma.kategoria.findUnique({
        where: { id: Number(id) },
        include: { wpisy: true }
    });
    if (!kategoria) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(kategoria);
};

const create = async (req, res) => {
    const { nazwa } = req.body;
    try {
        const kategoria = await prisma.kategoria.create({
            data: { nazwa }
        });
        res.status(201).json(kategoria);
    } catch (e) {
        if (e.code === 'P2002') {
            return res.status(400).json({ error: 'Kategoria o tej nazwie już istnieje' });
        }
        res.status(500).json({ error: e.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { nazwa } = req.body;
    try {
        const kategoria = await prisma.kategoria.update({
            where: { id: Number(id) },
            data: { nazwa }
        });
        res.json(kategoria);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.kategoria.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (e) {
        if (e.code === 'P2003') {
            return res.status(409).json({ error: 'Nie można usunąć – istnieją powiązane wpisy' });
        }
        res.status(400).json({ error: e.message });
    }
};

module.exports = { getAll, getById, create, update, remove };