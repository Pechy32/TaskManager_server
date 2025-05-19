import { createTask, getAllTasks, getTask, updateTask, deleteTask } from '../dao/taskDao.js';

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

// API handler for getting all tasks
export async function getAllTasksService (req, res) {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// API handler for getting task by id
export async function getTaskService (req, res) {
  try {
    const task = await getTask(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// API handler for updating task
export async function updateTaskService (req, res) {
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
export async function deleteTaskService (req, res) {
  try {
    const message = await deleteTask(req.params.id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}