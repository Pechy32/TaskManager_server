import express from 'express';
import { 
  createSolverHandler, 
  getAllSolversHandler, 
  getSolverHandler, 
  updateSolverHandler, 
  deleteSolverHandler 
} from '../service/solverService.js';

const router = express.Router();

router.post('/', createSolverHandler);
router.get('/', getAllSolversHandler);
router.get('/:id',getSolverHandler );
router.put('/:id', updateSolverHandler);
router.delete('/:id', deleteSolverHandler);

export default router;