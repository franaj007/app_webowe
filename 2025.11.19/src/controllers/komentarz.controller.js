// src/controllers/komentarz.controller.js
const prisma = require('../prisma/client');

// GET wszystkie komentarze (z paginacją i opcjonalnym filtrem po wpisie)
const getAll = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const wpisId = req.query.wpisId ? Number(req.query.wpisId) : undefined;
    const where = wpisId ? { wpisId } : {};

    try {
        const [komentarze, total] = await Promise.all([
            prisma.komentarz.findMany({
                where,
                skip,
                take: limit,
                include: {
                    wpis: {
                        select: {
                            id: true,
                            tytul: true,
                            kategoria: { select: { nazwa: true } }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.komentarz.count({ where })
        ]);

        res.json({
            data: komentarze,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Coś poszło nie tak' });
    }
};

// GET jeden komentarz
const getById = async (req, res) => {
    try {
        const komentarz = await prisma.komentarz.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                wpis: { select: { id: true, tytul: true } }
            }
        });

        if (!komentarz) {
            return res.status(404).json({ error: 'Komentarz nie istnieje' });
        }

        res.json(komentarz);
    } catch (error) {
        res.status(500).json({ error: 'Coś poszło nie tak' });
    }
};

// POST – nowy komentarz
const create = async (req, res) => {
    const { tresc, wpisId } = req.body;

    if (!tresc || !wpisId) {
        return res.status(400).json({ error: 'Pole tresc i wpisId są wymagane' });
    }

    try {
        const komentarz = await prisma.komentarz.create({
            data: {
                tresc,
                wpisId: Number(wpisId)
            },
            include: {
                wpis: { select: { id: true, tytul: true } }
            }
        });

        res.status(201).json(komentarz);
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(404).json({ error: 'Wpis o podanym ID nie istnieje' });
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się dodać komentarza' });
    }
};

// PUT – edycja komentarza
const update = async (req, res) => {
    const { tresc } = req.body;

    if (!tresc) {
        return res.status(400).json({ error: 'Pole tresc jest wymagane' });
    }

    try {
        const komentarz = await prisma.komentarz.update({
            where: { id: Number(req.params.id) },
            data: { tresc },
            include: { wpis: { select: { tytul: true } } }
        });

        res.json(komentarz);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Komentarz nie istnieje' });
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się zaktualizować komentarza' });
    }
};

// DELETE – usunięcie komentarza
const remove = async (req, res) => {
    try {
        await prisma.komentarz.delete({
            where: { id: Number(req.params.id) }
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Komentarz nie istnieje' });
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się usunąć komentarza' });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};