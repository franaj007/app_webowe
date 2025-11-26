const prisma = require('../prisma/client');

const getAll = async (req, res) => {
    const { kategoriaId } = req.query;
    const where = kategoriaId ? { kategoriaId: Number(kategoriaId) } : {};

    const wpisy = await prisma.wpis.findMany({
        where,
        include: {
            kategoria: true,
            komentarze: { orderBy: { createdAt: 'desc' } }
        },
        orderBy: { createdAt: 'desc' }
    });
    res.json(wpisy);
};

const getById = async (req, res) => {
    const wpis = await prisma.wpis.findUnique({
        where: { id: Number(req.params.id) },
        include: {
            kategoria: true,
            komentarze: { orderBy: { createdAt: 'asc' } }
        }
    });
    if (!wpis) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(wpis);
};

const create = async (req, res) => {
    const { tytul, tresc, kategoriaId } = req.body;
    const wpis = await prisma.wpis.create({
        data: { tytul, tresc, kategoriaId: Number(kategoriaId) },
        include: { kategoria: true }
    });
    res.status(201).json(wpis);
};

const update = async (req, res) => {
    const { id } = req.params;
    const { tytul, tresc, kategoriaId } = req.body;
    const wpis = await prisma.wpis.update({
        where: { id: Number(id) },
        data: { tytul, tresc, kategoriaId: kategoriaId ? Number(kategoriaId) : undefined }
    });
    res.json(wpis);
};

const remove = async (req, res) => {
    await prisma.wpis.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
};

module.exports = { getAll, getById, create, update, remove };