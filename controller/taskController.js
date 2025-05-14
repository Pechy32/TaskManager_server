import express from 'express';
import { 
  createTaskHandler, 
  getAllTasksHandler, 
  getTaskHandler, 
  updateTaskHandler, 
  deleteTaskHandler 
} from '../service/taskService.js';

const router = express.Router();

router.post('/', createTaskHandler);
router.get('/', getAllTasksHandler);
router.get('/:id', getTaskHandler);
router.put('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;