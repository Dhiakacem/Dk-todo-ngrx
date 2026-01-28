import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { TaskPageComponent } from './tasks/task-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskPageComponent }
];
