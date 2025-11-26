import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { Kategoria } from '@prisma/client';
// Możemy zaimportować typ błędu z Prismy dla lepszej kontroli, jeśli chcemy
import { Prisma } from '@prisma/client';

interface KategoriaRequestBody {
    nazwa: string;
}

interface ParamsId {
    id: string;
}

type TypedRequest<T> = Request<ParamsId, any, T>;

// Typ kategorii z relacją do wpisów
type KategoriaWithWpisy = Kategoria & { wpisy: any[] };
// Typ dla licznika (Prisma's AggregateType)
type KategoriaWithCount = Kategoria & { _count: { wpisy: number } };


// GET /api/kategorie
// Pobiera listę wszystkich kategorii z licznikiem powiązanych wpisów.
const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const kategorie: KategoriaWithCount[] = await prisma.kategoria.findMany({
            include: { _count: { select: { wpisy: true } } }
        }) as KategoriaWithCount[];

        res.status(200).json(kategorie);
    } catch (e) {
        // Poprawne typowanie błędu
        res.status(500).json({ error: (e as Error).message });
    }
};


// GET /api/kategorie/:id
// Pobiera kategorię po ID wraz z listą powiązanych wpisów.
const getById = async (req: Request<ParamsId>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        const kategoria: KategoriaWithWpisy | null = await prisma.kategoria.findUnique({
            where: { id: id },
            include: { wpisy: true }
        }) as KategoriaWithWpisy | null;

        if (!kategoria) {
            res.status(404).json({ error: 'Nie znaleziono' });
            return;
        }
        res.status(200).json(kategoria);
    } catch (e) {
        res.status(500).json({ error: (e as Error).message });
    }
};

// POST /api/kategorie
// Tworzy nową kategorię.
const create = async (req: TypedRequest<KategoriaRequestBody>, res: Response): Promise<void> => {
    const { nazwa } = req.body;
    try {
        const kategoria: Kategoria = await prisma.kategoria.create({
            data: { nazwa }
        });
        res.status(201).json(kategoria);
    } catch (e) {
        // Użycie Prisma.PrismaClientKnownRequestError do bezpiecznego odczytu kodu błędu
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // Obsługa błędu unikalności (kod 'P2002' z Prismy)
            if (e.code === 'P2002') {
                res.status(400).json({ error: 'Kategoria o tej nazwie już istnieje' });
                return;
            }
        }
        res.status(500).json({ error: (e as Error).message });
    }
};

// PUT /api/kategorie/:id
// Aktualizuje istniejącą kategorię.
const update = async (req: TypedRequest<KategoriaRequestBody>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { nazwa } = req.body;

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        const kategoria: Kategoria = await prisma.kategoria.update({
            where: { id: id },
            data: { nazwa }
        });
        res.status(200).json(kategoria);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // P2025: Nie znaleziono rekordu
            if (e.code === 'P2025') {
                res.status(404).json({ error: 'Nie znaleziono kategorii do aktualizacji' });
                return;
            }
        }
        res.status(400).json({ error: (e as Error).message });
    }
};

// DELETE /api/kategorie/:id
// Usuwa kategorię.
const remove = async (req: Request<ParamsId>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        await prisma.kategoria.delete({ where: { id: id } });
        res.status(204).send(); // HTTP 204: No Content, brak ciała odpowiedzi
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // P2003: Naruszenie klucza obcego (istnieją powiązane wpisy)
            if (e.code === 'P2003') {
                res.status(409).json({ error: 'Nie można usunąć – istnieją powiązane wpisy' });
                return;
            }
            // P2025: Nie znaleziono rekordu do usunięcia
            if (e.code === 'P2025') {
                res.status(404).json({ error: 'Nie znaleziono kategorii do usunięcia' });
                return;
            }
        }
        res.status(400).json({ error: (e as Error).message });
    }
};

export { getAll, getById, create, update, remove };