import express from 'express';
import { 
  createSolver, 
  getAllSolvers, 
  getSolverById, 
  updateSolver, 
  deleteSolver 
} from '../service/solverService.js';

const router = express.Router();

// Create a new solver
router.post('/', async (req, res) => {
  try {
    const solver = await createSolver(req.body);
    res.status(201).json(solver);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// Get all solvers
router.get('/', async (req, res) => {
  try {
    const solvers = await getAllSolvers();
    res.json(solvers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific solver
router.get('/:id', async (req, res) => {
  try {
    const solver = await getSolverById(req.params.id);
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json(solver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a solver
router.put('/:id', async (req, res) => {
  try {
    const solver = await updateSolver(req.params.id, req.body);
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json(solver);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete a solver
router.delete('/:id', async (req, res) => {
  try {
    const message = await deleteSolver(req.params.id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;