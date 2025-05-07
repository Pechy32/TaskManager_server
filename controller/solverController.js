import express from 'express';
import { Solver } from '../model/solverModel.js';

const router = express.Router();

// Create a new solver
router.post('/', async (req, res) => {
  try {
    const solver = new Solver(req.body);
    await solver.save();
    res.status(201).json(solver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all solvers
router.get('/', async (req, res) => {
  try {
    const solvers = await Solver.find();
    res.json(solvers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific solver
router.get('/:id', async (req, res) => {
  try {
    const solver = await Solver.findById(req.params.id);
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json(solver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a solver
router.put('/:id', async (req, res) => {
  try {
    const solver = await Solver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json(solver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a solver
router.delete('/:id', async (req, res) => {
  try {
    const solver = await Solver.findByIdAndDelete(req.params.id);
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json({ message: 'Solver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;