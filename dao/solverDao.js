import { Solver } from '../model/solverModel.js';

export const createSolver = async (data) => {
  const solver = new Solver(data);
  return await solver.save();
};

export const getSolvers = async () => {
  return await Solver.find();
};

export const getSolverById = async (id) => {
  return await Solver.findById(id);
};

export const updateSolver = async (id, data) => {
  return await Solver.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSolver = async (id) => {
  return await Solver.findByIdAndDelete(id);
};