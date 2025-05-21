import { deleteSolver } from "../../dao/solverDao.js";
import mongoose from 'mongoose';

// API handler for deleting solver
export async function deleteSolverService (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid solver ID' });
  }
  try {
    const message = await deleteSolver(req.params.id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
