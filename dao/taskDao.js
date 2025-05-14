import { Task } from '../model/taskModel.js';

export const createTask = async (data) => {
  const task = new Task(data);
  return await task.save();
};

export const getAllTasks = async () => {
  return await Task.find().populate('solver');
};

export const getTask = async (id) => {
  return await Task.findById(id).populate('solver');
};

export const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('solver');
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};