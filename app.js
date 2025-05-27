import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // ← správný import
import taskController from './controller/taskController.js';
import solverController from './controller/solverController.js';
import { setupSwagger } from './swagger/swagger.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors()); // ← umožní požadavky z jiného původu (např. localhost:3000)

// Database connection
mongoose.connect('mongodb://localhost:27017/task-solver', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Controllers
app.use('/tasks', taskController);
app.use('/solvers', solverController);

// Swagger documentation setup
setupSwagger(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});