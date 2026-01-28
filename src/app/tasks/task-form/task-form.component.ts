import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgZorroSharedModule} from '../../shared/ng-zorro.module';
import {Task, TaskPriority} from '../../models/task.model';
import {fr_FR, NZ_I18N} from 'ng-zorro-antd/i18n';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgZorroSharedModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    DatePipe
  ]
})
export class TaskFormComponent implements OnChanges {
  @Input() editingTask: Task | null = null;
  @Output() create = new EventEmitter<Omit<Task, 'id' | 'createdAt'>>();
  @Output() update = new EventEmitter<Task>();
  @Output() cancelEdit = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  readonly priorities: TaskPriority[] = [1, 2, 3, 4, 5];

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    priority: 3 as TaskPriority,
    dueDate: null as Date | null,
    completed: false
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingTask']) {
      const task = this.editingTask;
      if (task) {
        this.form.reset({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate ? new Date(task.dueDate) : null,
          completed: task.completed
        });
      } else {
        this.form.reset({
          title: '',
          description: '',
          priority: 3,
          dueDate: null,
          completed: false
        });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const dueDate =
      value.dueDate instanceof Date
        ? value.dueDate.toISOString()
        : (value.dueDate as unknown as string);

    const base = {
      title: value.title.trim(),
      description: value.description?.trim() ?? '',
      priority: value.priority,
      dueDate,
      completed: value.completed
    };

    if (this.editingTask) {
      this.update.emit({
        ...this.editingTask,
        ...base
      });
    } else {
      this.create.emit(base);
      this.form.reset({
        title: '',
        description: '',
        priority: 3,
        dueDate: null,
        completed: false
      });
    }
  }
}

