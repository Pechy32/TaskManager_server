import { Task } from '../model/taskModel.js';

export const getAllTasks = async (filters = {}, options = {}) => {
  const { sort = [] } = options;

  const aggregation = [{ $match: filters }];
  const finalSort = {};
  let needsPriorityOrder = false;

  // Helper function to add priorityOrder field
  const addPriorityOrderField = () => ({
    $addFields: {
      priorityOrder: {
        $switch: {
          branches: [
            { case: { $eq: ['$priority', 'Low'] }, then: 1 },
            { case: { $eq: ['$priority', 'Medium'] }, then: 2 },
            { case: { $eq: ['$priority', 'High'] }, then: 3 },
          ],
          default: 4,
        },
      },
    },
  });

  // priorityOrder field is added to the aggregation pipeline
  for (const { field, order } of sort) {
    if (field === 'priority') {
      needsPriorityOrder = true;
      finalSort['priorityOrder'] = order === 'desc' ? -1 : 1;
    } else {
      finalSort[field] = order === 'desc' ? -1 : 1;
    }
  }

  // Default sorting if no sort is provided
  // dueDate form nost recent to oldest, priority from highest to lowest, created from most recent to oldest
  if (Object.keys(finalSort).length === 0) {
    needsPriorityOrder = true;
    Object.assign(finalSort, {
      dueDate: 1,
      priorityOrder: -1,
      created: -1,
    });
  }

  // Add priorityOrder field to the aggregation pipeline if needed
  if (needsPriorityOrder) {
    aggregation.push(addPriorityOrderField());
  }

  // Pagination
  aggregation.push({ $sort: finalSort });

  if (options.skip) {
    aggregation.push({ $skip: options.skip });
  }

  if (options.limit) {
    aggregation.push({ $limit: options.limit });
  }

  return await Task.aggregate(aggregation);
};

export const createTask = async (data) => {
  const task = new Task(data);
  return await task.save();
};

export const getTask = async (id) => {
  return await Task.findById(id).populate('solver');
};

export const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('solver');
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};