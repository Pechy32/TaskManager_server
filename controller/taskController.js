import express from 'express';
import { 
  createTaskService, 
  getAllTasksService, 
  getTaskService, 
  updateTaskService, 
  deleteTaskService 
} from '../service/taskService.js';

const router = express.Router();

router.post('/', createTaskService);
router.get('/', getAllTasksService);
router.get('/:id', getTaskService);
router.put('/:id', updateTaskService);
router.delete('/:id', deleteTaskService);

export default router;