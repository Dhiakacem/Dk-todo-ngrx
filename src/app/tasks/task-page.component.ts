import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroSharedModule } from '../shared/ng-zorro.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectUser } from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';
import { selectTasks } from '../store/tasks/task.reducer';
import * as TaskActions from '../store/tasks/task.actions';
import { Task } from '../models/task.model';
import {TaskFormComponent} from './task-form/task-form.component';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, NgZorroSharedModule, TaskFormComponent],
  templateUrl:'./task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  user$ = this.store.select(selectUser);
  tasks$ = this.store.select(selectTasks);
  pendingCount$: Observable<number> = this.tasks$.pipe(
    map(tasks => tasks.filter(t => !t.completed).length)
  );

  editingTask: Task | null = null;

  protected logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  protected handleCreate(task: Omit<Task, 'id' | 'createdAt'>): void {
    this.store.dispatch(TaskActions.addTask({ task }));
  }

  protected handleUpdate(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
    this.editingTask = null;
  }

  protected startEdit(task: Task): void {
    this.editingTask = task;
  }

  protected cancelEdit(): void {
    this.editingTask = null;
  }

  protected toggleCompleted(task: Task): void {
    this.store.dispatch(TaskActions.toggleTaskCompleted({ id: task.id }));
  }

  protected delete(task: Task): void {
    this.store.dispatch(TaskActions.deleteTask({ id: task.id }));
  }
}

