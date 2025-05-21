import express from 'express';

import { createSolverService } from '../service/solver/createSolverService.js';
import { getAllSolversService } from '../service/solver/getAllSolversService.js';
import { getSolverService } from '../service/solver/getSolverService.js';
import { updateSolverService } from '../service/solver/updateSolverService.js';
import { deleteSolverService } from '../service/solver/deleteSolverService.js';

const router = express.Router();

router.post('/', createSolverService);
router.get('/', getAllSolversService);
router.get('/:id',getSolverService );
router.put('/:id', updateSolverService);
router.delete('/:id', deleteSolverService);

export default router;