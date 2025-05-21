import { getAllSolvers } from "../../dao/solverDao.js";

// API handler for getting all solvers
export async function getAllSolversService (req, res) {
  try {
    const solvers = await getAllSolvers();
    res.json(solvers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}