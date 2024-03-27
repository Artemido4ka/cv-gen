import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { requiredValidator } from 'src/app/shared/validators/required.validator';

@Component({
  selector: 'cv-gen-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    userName: ['', [requiredValidator('auth.login.password.errors.required')]],
    password: ['', [requiredValidator('auth.login.userName.errors.required')]],
    checkBox: [false],
  });

  onSubmit(): void {
    console.log('Submitted !', this.loginForm.value);
  }
}
