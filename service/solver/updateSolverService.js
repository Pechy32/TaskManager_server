import { updateSolver } from "../../dao/solverDao.js";
import mongoose from 'mongoose';

// API handler for updating solver
export async function updateSolverService (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid solver ID' });
  }
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
}