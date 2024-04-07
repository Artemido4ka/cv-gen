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
  });

  private readonly cdRef = inject(ChangeDetectorRef);

  onSubmit(): void {
    if (this.loginForm.invalid && this.loginForm.touched) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([RoutingPaths.HOME]);
        this.cdRef.markForCheck();
      },
      error: errorMessage => {
        this.loginForm.setErrors({ error: errorMessage });
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }
}
