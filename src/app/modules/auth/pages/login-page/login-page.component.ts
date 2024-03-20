import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cv-gen-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    // password: ['', [Validators.required]],
    checkBox: [false],
    textarea: ['textarea text', [Validators.required]],
  });

  onSubmit(): void {
    console.log(this.loginForm, 'FORm');
    console.log('Submitted !', this.loginForm.value);
  }
}
