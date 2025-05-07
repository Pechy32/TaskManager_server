import { Task } from '../models/taskModel.js';

// Create a new task
export const createTask = async (data) => {
  const task = new Task(data);
  await task.save(); // Mongoose handles validation here
  return task;
};

// Get all tasks
export const getAllTasks = async () => {
  return await Task.find().populate('solverId');
};

// Get a specific task by ID
export const getTaskById = async (id) => {
  return await Task.findById(id).populate('solverId');
};

// Update a task by ID
export const updateTask = async (id, data) => {
  const task = await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true, // Ensure validation runs on update
  }).populate('solverId');
  return task;
};

// Delete a task by ID
export const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new Error('Task not found');
  return 'Task deleted';
};