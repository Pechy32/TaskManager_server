import express from 'express';
import { createTaskService } from '../service/task/createTaskService.js';
import { getAllTasksService } from '../service/task/getAllTasksService.js';
import { getTaskService } from '../service/task/getTaskService.js';
import { updateTaskService } from '../service/task/updateTaskService.js';
import { deleteTaskService } from '../service/task/deleteTaskService.js';

const router = express.Router();

router.post('/', createTaskService);
router.get('/', getAllTasksService);
router.get('/:id', getTaskService);
router.put('/:id', updateTaskService);
router.delete('/:id', deleteTaskService);

export default router;