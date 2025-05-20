import { createTask, getAllTasks, getTask, updateTask, deleteTask } from '../dao/taskDao.js';
import mongoose from 'mongoose';

// API handler for creating a task
export async function createTaskService(req, res) {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
}

// API handler for getting all tasks including filters and sorting
export async function getAllTasksService(req, res) {
  try {
    const filters = {};

    // --- isCompleted ---
    if (req.query.isCompleted !== undefined) {
      if (req.query.isCompleted !== 'true' && req.query.isCompleted !== 'false') {
        return res.status(400).json({ message: "Invalid value for isCompleted. Use 'true' or 'false'." });
      }
      filters.isCompleted = req.query.isCompleted === 'true';
    }

    // --- priority ---
    const validPriorities = ['Low', 'Medium', 'High'];
    if (req.query.priority) {
      if (!validPriorities.includes(req.query.priority)) {
        return res.status(400).json({ message: "Invalid priority. Use 'Low', 'Medium', or 'High'." });
      }
      filters.priority = req.query.priority;
    }

    // --- dueBefore / dueAfter ---
    if (req.query.dueBefore && isNaN(Date.parse(req.query.dueBefore))) {
      return res.status(400).json({ message: "Invalid date format for dueBefore." });
    }
    if (req.query.dueAfter && isNaN(Date.parse(req.query.dueAfter))) {
      return res.status(400).json({ message: "Invalid date format for dueAfter." });
    }
    if (req.query.dueBefore) {
      filters.dueDate = filters.dueDate || {};
      filters.dueDate.$lte = new Date(req.query.dueBefore);
    }
    if (req.query.dueAfter) {
      filters.dueDate = filters.dueDate || {};
      filters.dueDate.$gte = new Date(req.query.dueAfter);
    }

    // --- Sorting ---
    const options = {
      limit: parseInt(req.query.limit) || 0,
      skip: ((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.limit) || 0),
      sort: req.query.sort
        ? req.query.sort.split(',').map(part => {
            const [field, order = 'asc'] = part.split(':');
            const validOrders = ['asc', 'desc'];
            if (!validOrders.includes(order.toLowerCase())) {
              throw new Error(`Invalid sort order for field '${field}': use 'asc' or 'desc'`);
            }
            return { field, order: order.toLowerCase() };
          })
        : [],
    };

    const tasks = await getAllTasks(filters, options);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// API handler for getting task by id
export async function getTaskService(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  try {
    const task = await getTask(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// API handler for updating task
export async function updateTaskService(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  try {
    const task = await updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
}

// API handler for deleting task
export async function deleteTaskService(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  try {
    const message = await deleteTask(req.params.id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}