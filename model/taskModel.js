import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: {
    type: Date,
    validate: {
      // Custom validator to ensure dueDate is today or in the future
      validator: (value) => {
        if (!value) return true; 
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const dueDateWithoutTime = new Date(value);
        dueDateWithoutTime.setHours(0, 0, 0, 0);
        return dueDateWithoutTime >= today;
      },
      message: 'Due date must be today or in the future',
    },
  },
  created: { type: Date, default: Date.now },
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  isCompleted: { type: Boolean, default: false },
  parentTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  notes: [{ timestamp: { type: Date, default: Date.now }, note: { type: String, required: true } }],
  solver: { type: mongoose.Schema.Types.ObjectId, ref: 'Solver' }
});

export const Task = mongoose.model('Task', taskSchema);