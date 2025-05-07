import express from 'express';
import { Task } from '../model/taskModel.js';
import { validate, taskSchema } from '../validation/ajvSchemas.js';

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  const { valid, errors } = validate(taskSchema, req.body);
  if (!valid) return res.status(400).json({ errors });
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('solverId');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('solverId');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { valid, errors } = validate(taskSchema, req.body);
  if (!valid) return res.status(400).json({ errors });
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('solverId');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
