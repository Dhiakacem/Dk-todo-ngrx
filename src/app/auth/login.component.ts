import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../store/auth/auth.actions';
import { NgZorroSharedModule } from '../shared/ng-zorro.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgZorroSharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get email() {
    return this.form.controls.email;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const email = this.email.value.trim();
    this.store.dispatch(AuthActions.login({ email }));
    this.store.dispatch(AuthActions.setUser({ user: { email } }));
    this.router.navigate(['/tasks']);
  }
}

