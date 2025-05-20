import { Task } from '../model/taskModel.js';

export const createTask = async (data) => {
  const task = new Task(data);
  return await task.save();
};

export const getAllTasks = async (filters = {}, options = {}) => {
  const { sort = [] } = options;

  const aggregation = [{ $match: filters }];
  let addedPriorityOrder = false;
  const finalSort = {};

  for (const { field, order } of sort) {
    if (field === 'priority') {
      if (!addedPriorityOrder) {
        aggregation.push({
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
        addedPriorityOrder = true;
      }
      finalSort['priorityOrder'] = order === 'desc' ? -1 : 1;
    } else {
      finalSort[field] = order === 'desc' ? -1 : 1;
    }
  }

  // If no sort fields are provided, default to sorting by created date in descending order
  if (Object.keys(finalSort).length === 0) {
    finalSort['created'] = -1;
  }

  aggregation.push({ $sort: finalSort });

  if (options.skip) {
    aggregation.push({ $skip: options.skip });
  }
  if (options.limit) {
    aggregation.push({ $limit: options.limit });
  }

  return await Task.aggregate(aggregation);
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