import { Solver } from '../model/solverModel.js';

// Create a new solver
export const createSolver = async (data) => {
  const solver = new Solver(data);
  await solver.save();
  return solver;
};

// Get all solvers
export const getAllSolvers = async () => {
  return await Solver.find();
};

// Get a specific solver by ID
export const getSolverById = async (id) => {
  return await Solver.findById(id);
};

// Update a solver by ID
export const updateSolver = async (id, data) => {
  const solver = await Solver.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return solver;
};

// Delete a solver by ID
export const deleteSolver = async (id) => {
  const solver = await Solver.findByIdAndDelete(id);
  if (!solver) throw new Error('Solver not found');
  return 'Solver deleted';
};
