import { createSolver, getAllSolvers, getSolver, updateSolver, deleteSolver } from "../dao/solverDao.js"

// API handler for creating a solver
export async function createSolverHandler (req, res) {
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

// API handler for getting all solvers
export async function getAllSolversHandler (req, res) {
  try {
    const solvers = await getAllSolvers();
    res.json(solvers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// API handler for getting solver by id
export async function getSolverHandler (req, res) {
  try {
    const solver = await getSolver(req.params.id);
    if (!solver) return res.status(404).json({ message: 'Solver not found' });
    res.json(solver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// API handler for updating solver
export async function updateSolverHandler (req, res) {
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

// API handler for deleting solver
export async function deleteSolverHandler (req, res) {
  try {
    const message = await deleteSolver(req.params.id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
