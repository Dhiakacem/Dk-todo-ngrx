import { Injectable, inject } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom, filter } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { selectTasks } from './task.reducer';
import { selectUser } from '../auth/auth.reducer';

const STORAGE_KEY_PREFIX = 'todo-ngrx-tasks-';

@Injectable()
export class TaskEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  loadTasksOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      withLatestFrom(this.store.select(selectUser)),
      filter(([, user]) => !!user),
      map(([, user]) =>
        TaskActions.loadTasksForUser({ email: (user as any).email })
      )
    )
  );

  loadTasksForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasksForUser),
      map(({ email }) => {
        const key = STORAGE_KEY_PREFIX + email;
        const raw = localStorage.getItem(key);
        if (!raw) return TaskActions.setTasks({ tasks: [] });

        try {
          return TaskActions.setTasks({ tasks: JSON.parse(raw) });
        } catch {
          return TaskActions.setTasks({ tasks: [] });
        }
      })
    )
  );

  persistTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TaskActions.addTask,
          TaskActions.updateTask,
          TaskActions.deleteTask,
          TaskActions.toggleTaskCompleted,
          TaskActions.setTasks
        ),
        withLatestFrom(
          this.store.select(selectTasks),
          this.store.select(selectUser)
        ),
        tap(([, tasks, user]) => {
          if (!user) return;
          const key = STORAGE_KEY_PREFIX + user.email;
          localStorage.setItem(key, JSON.stringify(tasks));
        })
      ),
    { dispatch: false }
  );
}
