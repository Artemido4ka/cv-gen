import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { loginRequiredFieldValidator } from '../../constants/auth.constants';

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
    userName: ['', [loginRequiredFieldValidator('userName')]],
    password: ['', [loginRequiredFieldValidator('password')]],
  });

  private readonly cdRef = inject(ChangeDetectorRef);

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([RoutingPaths.HOME]);
        this.cdRef.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }
}
