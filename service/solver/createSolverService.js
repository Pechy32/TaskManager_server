import { createSolver } from "../../dao/solverDao.js";

// API handler for creating a solver
export async function createSolverService (req, res) {
  try {
    const solver = await createSolver(req.body);
    res.status(201).json(solver);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
}