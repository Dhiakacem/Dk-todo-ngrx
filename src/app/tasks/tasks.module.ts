import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroSharedModule } from '../shared/ng-zorro.module';
import { TaskPageComponent } from './task-page.component';
import {TaskFormComponent} from './task-form/task-form.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgZorroSharedModule, TaskPageComponent, TaskFormComponent],
  exports: [TaskPageComponent]
})
export class TasksModule {}

