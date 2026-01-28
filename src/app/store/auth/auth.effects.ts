import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import * as TaskActions from '../tasks/task.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(({ email }) => TaskActions.loadTasksForUser({ email }))
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {})
      ),
    { dispatch: false }
  );
}
