// src/routes/komentarze.routes.ts

import { Router } from 'express'; // Import Router z modułu express
// Importowanie nazwane funkcji kontrolerów (z pliku .ts)
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/komentarz.controller';

// Inicjalizacja routera i typowanie
const router: Router = Router();

// Definicja tras API
// GET /api/komentarze
router.get('/', getAll);
// GET /api/komentarze/:id
router.get('/:id', getById);
// POST /api/komentarze
router.post('/', create);
// PUT /api/komentarze/:id
router.put('/:id', update);
// DELETE /api/komentarze/:id
router.delete('/:id', remove);

// Eksport domyślny routera (wymagany, aby index.ts mógł użyć: import komentarzeRoutes from '...')
export default router;