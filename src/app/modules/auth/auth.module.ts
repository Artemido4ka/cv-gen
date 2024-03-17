import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';

@NgModule({
  declarations: [AuthPageComponent, LoginPageComponent, RegistrationPageComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, InputComponent, TextareaComponent],
})
export class AuthModule {}
