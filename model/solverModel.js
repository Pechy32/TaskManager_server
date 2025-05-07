import mongoose from 'mongoose';

const solverSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

export const Solver = mongoose.model('Solver', solverSchema);