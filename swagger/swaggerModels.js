/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the task
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Optional description of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Due date for the task (must be today or in the future)
 *         created:
 *           type: string
 *           format: date-time
 *           description: Date when the task was created
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *           description: Task priority
 *         isCompleted:
 *           type: boolean
 *           description: Whether the task has been completed
 *         parentTaskId:
 *           type: string
 *           description: Reference to the parent task (if any)
 *         notes:
 *           type: array
 *           description: List of notes associated with the task
 *           items:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *               note:
 *                 type: string
 *         solver:
 *           type: string
 *           description: ID of the assigned solver
 *       required:
 *         - title
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Solver:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the solver
 *         name:
 *           type: string
 *           description: Name of the solver
 *       required:
 *         - name
 */