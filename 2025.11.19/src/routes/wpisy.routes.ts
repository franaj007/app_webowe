import { Router } from 'express';
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/wpis.controller';

const router: Router = Router();

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

// Eksport domyślny routera
export default router;