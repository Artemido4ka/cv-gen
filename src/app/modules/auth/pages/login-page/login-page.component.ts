import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { requiredValidator } from 'src/app/shared/validators/required.validator';
import { AuthService } from '../../services/auth.service';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@Component({
  selector: 'cv-gen-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  isLoading = false;

  loginForm = this.fb.group({
    userName: ['', [requiredValidator('auth.login.password.errors.required')]],
    password: ['', [requiredValidator('auth.login.userName.errors.required')]],
    checkBox: [false],
  });

  private readonly cdRef = inject(ChangeDetectorRef);

  onSubmit(): void {
    const email = this.loginForm.value.userName;
    const password = this.loginForm.value.password;
    this.isLoading = true;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([RoutingPaths.HOME]);
      },
      error: errorMessage => {
        this.loginForm.setErrors({ error: errorMessage });
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }
}
