import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasksForUser = createAction(
  '[Tasks] Load Tasks For User',
  props<{ email: string }>()
);

export const setTasks = createAction(
  '[Tasks] Set Tasks',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Omit<Task, 'id' | 'createdAt'> }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);

export const toggleTaskCompleted = createAction(
  '[Tasks] Toggle Task Completed',
  props<{ id: string }>()
);

