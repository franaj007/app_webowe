import { Router } from 'express';
import {
    getAll,
    getById,
    create,
    update,
    remove
} from '../controllers/komentarz.controller';

const router: Router = Router();

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

// Eksport domyślny routera
export default router;