// src/controllers/komentarz.controller.ts

import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { Komentarz } from '@prisma/client';

// --- Interfejsy dla typowania danych wejściowych ---

// Interfejs dla danych w req.body
interface KomentarzRequestBody {
    tresc: string;
    wpisId?: number; // Wymagane dla POST, opcjonalne dla PUT
}

// Interfejs dla zapytań (req.query)
interface KomentarzQuery {
    page?: string;
    limit?: string;
    wpisId?: string;
}

// Ogólny typ dla żądań z typowanym ciałem
type TypedRequestBody<T> = Request<any, any, T>;
// Ogólny typ dla żądań z typowanymi parametrami URL i Query
type TypedRequest<P, Q, B> = Request<P, any, B, Q>;

// Typ komentarza z relacją do wpisu (używany w Prisma.findMany/findUnique)
type KomentarzWithWpis = Komentarz & {
    wpis: {
        id: number;
        tytul: string;
        kategoria?: { nazwa: string; } | null;
    } | null;
};

// =========================================================================
// GET wszystkie komentarze (z paginacją i opcjonalnym filtrem po wpisie)
// =========================================================================
const getAll = async (req: TypedRequest<{}, KomentarzQuery, {}>, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const wpisIdStr = req.query.wpisId;
    const wpisId = wpisIdStr ? parseInt(wpisIdStr) : undefined;

    if (wpisIdStr !== undefined && isNaN(wpisId!)) {
        res.status(400).json({ error: 'Niepoprawny format wpisId' });
        return;
    }

    const where = wpisId !== undefined ? { wpisId: wpisId } : {};

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
            }) as Promise<KomentarzWithWpis[]>,
            prisma.komentarz.count({ where })
        ]);

        res.status(200).json({
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

// =========================================================================
// GET jeden komentarz
// =========================================================================
const getById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        const komentarz: KomentarzWithWpis | null = await prisma.komentarz.findUnique({
            where: { id: id },
            include: {
                wpis: { select: { id: true, tytul: true } }
            }
        });

        if (!komentarz) {
            res.status(404).json({ error: 'Komentarz nie istnieje' });
            return;
        }

        res.status(200).json(komentarz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Coś poszło nie tak' });
    }
};

// =========================================================================
// POST – nowy komentarz
// =========================================================================
const create = async (req: TypedRequestBody<KomentarzRequestBody>, res: Response): Promise<void> => {
    const { tresc, wpisId } = req.body;

    // Walidacja danych
    if (!tresc || wpisId === undefined || isNaN(wpisId)) {
        res.status(400).json({ error: 'Pole tresc i wpisId są wymagane i muszą być poprawne' });
        return;
    }

    try {
        const komentarz: Komentarz = await prisma.komentarz.create({
            data: {
                tresc,
                wpisId: wpisId
            },
            include: {
                wpis: { select: { id: true, tytul: true } }
            }
        });

        res.status(201).json(komentarz);
    } catch (error: any) {
        // P2003: Naruszenie klucza obcego (wpisId nie istnieje)
        if (error.code === 'P2003') {
            res.status(404).json({ error: 'Wpis o podanym ID nie istnieje' });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się dodać komentarza' });
    }
};

// =========================================================================
// PUT – edycja komentarza
// =========================================================================
const update = async (req: TypedRequestBody<KomentarzRequestBody>, res: Response): Promise<void> => {
    const { tresc } = req.body;
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    if (!tresc) {
        res.status(400).json({ error: 'Pole tresc jest wymagane' });
        return;
    }

    try {
        const komentarz: Komentarz = await prisma.komentarz.update({
            where: { id: id },
            data: { tresc },
            include: { wpis: { select: { tytul: true } } }
        });

        res.status(200).json(komentarz);
    } catch (error: any) {
        // P2025: Nie znaleziono rekordu do aktualizacji/usunięcia
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Komentarz nie istnieje' });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się zaktualizować komentarza' });
    }
};

// =========================================================================
// DELETE – usunięcie komentarza
// =========================================================================
const remove = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        await prisma.komentarz.delete({
            where: { id: id }
        });

        res.status(204).send(); // HTTP 204: No Content, brak ciała odpowiedzi
    } catch (error: any) {
        // P2025: Nie znaleziono rekordu do usunięcia
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Komentarz nie istnieje' });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się usunąć komentarza' });
    }
};

// Eksport nazwany (wymagany przez komentarze.routes.ts)
export {
    getAll,
    getById,
    create,
    update,
    remove
};