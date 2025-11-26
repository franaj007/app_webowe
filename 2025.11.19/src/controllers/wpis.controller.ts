import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { Wpis } from '@prisma/client';

interface WpisRequestBody {
    tytul: string;
    tresc: string;
    kategoriaId: number;
}

interface WpisQuery {
    kategoriaId?: string;
}

// Typowanie dla żądań z typowanym ciałem
type TypedRequestBody<T> = Request<any, any, T>;

// Typowanie dla żądań z typowanymi parametrami URL i Query
type TypedRequest<P, Q, B> = Request<P, any, B, Q>;

interface ParamsId {
    id: string;
}

type WpisWithRelations = Wpis & {
    kategoria: any | null; // Zastąp typem Kategoria, jeśli zaimportowany
    komentarze: any[];     // Zastąp typem Komentarz, jeśli zaimportowany
};


// GET wszystkie wpisy (z opcjonalnym filtrem po kategorii)
const getAll = async (req: TypedRequest<{}, WpisQuery, {}>, res: Response): Promise<void> => {
    const kategoriaIdStr = req.query.kategoriaId;
    const kategoriaId = kategoriaIdStr ? parseInt(kategoriaIdStr) : undefined;

    // Walidacja ID, jeśli jest podane
    if (kategoriaIdStr !== undefined && isNaN(kategoriaId!)) {
        res.status(400).json({ error: 'Niepoprawny format kategoriaId' });
        return;
    }

    const where = kategoriaId !== undefined ? { kategoriaId: kategoriaId } : {};

    try {
        const wpisy: WpisWithRelations[] = await prisma.wpis.findMany({
            where,
            include: {
                kategoria: true,
                komentarze: { orderBy: { createdAt: 'desc' } }
            },
            orderBy: { createdAt: 'desc' }
        }) as WpisWithRelations[]; // Jawne rzutowanie typu

        res.status(200).json(wpisy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Coś poszło nie tak' });
    }
};


// GET jeden wpis po ID
const getById = async (req: TypedRequest<ParamsId, {}, {}>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        const wpis: WpisWithRelations | null = await prisma.wpis.findUnique({
            where: { id: id },
            include: {
                kategoria: true,
                komentarze: { orderBy: { createdAt: 'asc' } }
            }
        });

        if (!wpis) {
            res.status(404).json({ error: 'Nie znaleziono' });
            return;
        }

        res.status(200).json(wpis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Coś poszło nie tak' });
    }
};


// POST – tworzenie nowego wpisu
const create = async (req: TypedRequestBody<WpisRequestBody>, res: Response): Promise<void> => {
    const { tytul, tresc, kategoriaId } = req.body;

    // Prosta walidacja wymaganych pól
    if (!tytul || !tresc || !kategoriaId || isNaN(kategoriaId)) {
        res.status(400).json({ error: 'Pola tytul, tresc i kategoriaId (numer) są wymagane' });
        return;
    }

    try {
        const wpis: Wpis = await prisma.wpis.create({
            data: { tytul, tresc, kategoriaId: kategoriaId },
            include: { kategoria: true }
        });
        res.status(201).json(wpis);
    } catch (error: any) {
        // P2003: Naruszenie klucza obcego (kategoriaId nie istnieje)
        if (error.code === 'P2003') {
            res.status(404).json({ error: 'Kategoria o podanym ID nie istnieje' });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się utworzyć wpisu' });
    }
};


// PUT – aktualizacja wpisu
const update = async (req: TypedRequest<ParamsId, {}, Partial<WpisRequestBody>>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { tytul, tresc, kategoriaId } = req.body;

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    // Walidacja kategoriaId, jeśli jest podane
    if (kategoriaId !== undefined && isNaN(kategoriaId)) {
        res.status(400).json({ error: 'Niepoprawny format kategoriaId' });
        return;
    }

    try {
        const wpis: Wpis = await prisma.wpis.update({
            where: { id: id },
            data: {
                tytul,
                tresc,
                kategoriaId: kategoriaId
            }
        });
        res.status(200).json(wpis);
    } catch (error: any) {
        // P2025: Nie znaleziono rekordu do aktualizacji
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Wpis nie istnieje' });
            return;
        }
        // P2003: Naruszenie klucza obcego
        if (error.code === 'P2003') {
            res.status(404).json({ error: 'Kategoria o podanym ID nie istnieje' });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się zaktualizować wpisu' });
    }
};


// DELETE – usunięcie wpisu
const remove = async (req: TypedRequest<ParamsId, {}, {}>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Niepoprawny format ID' });
        return;
    }

    try {
        await prisma.wpis.delete({ where: { id: id } });
        res.status(204).send(); // HTTP 204: No Content
    } catch (error: any) {
        // P2025: Nie znaleziono rekordu do usunięcia
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Wpis nie istnieje' });
            return;
        }
        // P2003: Naruszenie klucza obcego (jeśli np. istnieje powiązany komentarz)
        if (error.code === 'P2003') {
            res.status(409).json({ error: 'Nie można usunąć – istnieją powiązane komentarze' });
            return;
        }
        console.error(error);
        res.status(500).json({ error: 'Nie udało się usunąć wpisu' });
    }
};

export { getAll, getById, create, update, remove };