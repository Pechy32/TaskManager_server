import express from 'express';

import { createSolverService } from '../service/solver/createSolverService.js';
import { getAllSolversService } from '../service/solver/getAllSolversService.js';
import { getSolverService } from '../service/solver/getSolverService.js';
import { updateSolverService } from '../service/solver/updateSolverService.js';
import { deleteSolverService } from '../service/solver/deleteSolverService.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Solver:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /solvers:
 *   get:
 *     summary: Retrieve all solvers
 *     responses:
 *       200:
 *         description: A list of solvers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solver'
 */
router.get('/', getAllSolversService);

/**
 * @swagger
 * /solvers:
 *   post:
 *     summary: Create a new solver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solver'
 *     responses:
 *       201:
 *         description: Solver created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solver'
 */
router.post('/', createSolverService);

/**
 * @swagger
 * /solvers/{id}:
 *   get:
 *     summary: Get a solver by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Solver details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solver'
 */
router.get('/:id', getSolverService);

/**
 * @swagger
 * /solvers/{id}:
 *   put:
 *     summary: Update a solver by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solver'
 *     responses:
 *       200:
 *         description: Solver updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solver'
 */
router.put('/:id', updateSolverService);

/**
 * @swagger
 * /solvers/{id}:
 *   delete:
 *     summary: Delete a solver by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Solver deleted successfully
 */
router.delete('/:id', deleteSolverService);

export default router;