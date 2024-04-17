import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { InputComponent } from 'src/app/shared/components/controls/input/input.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AuthPageComponent, LoginPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputComponent,
    TranslateModule,
    MatCheckboxModule,
    MatButtonModule,
    ErrorMessageComponent,
    MatProgressSpinnerModule,
  ],
})
export class AuthModule {}
