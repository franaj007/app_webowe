// src/routes/kategorie.routes.ts

import { Router } from 'express';
// Importowanie nazwane funkcji kontrolerów z pliku .ts (eksport nazwany)
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/kategoria.controller';

// Inicjalizacja routera i typowanie
const router: Router = Router();

// Definicja tras API dla zasobu 'kategorie'
// GET /api/kategorie
router.get('/', getAll);
// GET /api/kategorie/:id
router.get('/:id', getById);
// POST /api/kategorie
router.post('/', create);
// PUT /api/kategorie/:id
router.put('/:id', update);
// DELETE /api/kategorie/:id
router.delete('/:id', remove);

// Eksport domyślny routera (wymagany, aby index.ts mógł użyć: import kategoriaRoutes from '...')
export default router;