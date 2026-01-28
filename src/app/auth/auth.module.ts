import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroSharedModule } from '../shared/ng-zorro.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgZorroSharedModule, LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {}

