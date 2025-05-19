import express from 'express';
import { 
  createSolverService, 
  getAllSolversService, 
  getSolverService, 
  updateSolverService, 
  deleteSolverService 
} from '../service/solverService.js';

const router = express.Router();

router.post('/', createSolverService);
router.get('/', getAllSolversService);
router.get('/:id',getSolverService );
router.put('/:id', updateSolverService);
router.delete('/:id', deleteSolverService);

export default router;