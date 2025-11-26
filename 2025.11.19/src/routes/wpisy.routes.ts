// src/routes/wpisy.routes.ts

import { Router } from 'express'; // Import Router z modułu express
// Importowanie nazwane funkcji kontrolerów z pliku .ts
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/wpis.controller';

// Inicjalizacja routera i typowanie
const router: Router = Router();

// Definicja tras API dla zasobu 'wpisy'
// GET /api/wpisy
router.get('/', getAll);
// GET /api/wpisy/:id
router.get('/:id', getById);
// POST /api/wpisy
router.post('/', create);
// PUT /api/wpisy/:id
router.put('/:id', update);
// DELETE /api/wpisy/:id
router.delete('/:id', remove);

// Eksport domyślny routera (wymagany, aby index.ts mógł użyć: import wpisyRoutes from '...')
export default router;