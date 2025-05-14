import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, validate: {
    validator: (value) => !value || value >= new Date(),
    message: 'Due date must be today or in the future',
  }},
  created: { type: Date, default: Date.now },
  priority: { type: String, enum: ['Low', 'Medium', 'High', "NotSet"], default: 'NotSet' },
  isCompleted: { type: Boolean, default: false },
  parentTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  notes: [{ timestamp: { type: Date, default: Date.now }, note: { type: String } }],
  solver: { type: mongoose.Schema.Types.ObjectId, ref: 'Solver' }
});

export const Task = mongoose.model('Task', taskSchema);