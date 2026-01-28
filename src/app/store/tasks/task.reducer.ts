import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialState,
    on(TaskActions.setTasks, (state, { tasks }) => ({ ...state, tasks })),
    on(TaskActions.addTask, (state, { task }) => {
      const now = new Date().toISOString();
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: now
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      };
    }),
    on(TaskActions.updateTask, (state, { task }) => ({
      ...state,
      tasks: state.tasks.map(t => (t.id === task.id ? task : t))
    })),
    on(TaskActions.deleteTask, (state, { id }) => ({
      ...state,
      tasks: state.tasks.filter(t => t.id !== id)
    })),
    on(TaskActions.toggleTaskCompleted, (state, { id }) => ({
      ...state,
      tasks: state.tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    }))
  )
});

export const {
  name: tasksFeatureKey,
  reducer: tasksReducer,
  selectTasksState,
  selectTasks
} = tasksFeature;

