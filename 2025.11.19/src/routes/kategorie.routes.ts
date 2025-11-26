import { Router } from 'express';
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/kategoria.controller';

const router: Router = Router();

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

// Eksport domyślny routera
export default router;