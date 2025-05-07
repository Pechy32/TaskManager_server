import { Task } from '../models/task.js';

export const createTask = async (data) => {
  const task = new Task(data);
  return await task.save();
};

export const getTasks = async () => {
  return await Task.find().populate('solverId');
};

export const getTaskById = async (id) => {
  return await Task.findById(id).populate('solverId');
};

export const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true }).populate('solverId');
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};