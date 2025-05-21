import { getSolver } from "../../dao/solverDao.js";
import mongoose from 'mongoose';

// API handler for getting solver by id
export async function getSolverService (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid solver ID' });
  }
  try {
    const solver = await getSolver(req.params.id);
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json(solver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}