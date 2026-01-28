import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_I18N, fr_FR } from 'ng-zorro-antd/i18n';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { tasksReducer } from './store/tasks/task.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { TaskEffects } from './store/tasks/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    { provide: NZ_I18N, useValue: fr_FR },
    provideStore({
      auth: authReducer,
      tasks: tasksReducer
    }),
    provideEffects([AuthEffects, TaskEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
