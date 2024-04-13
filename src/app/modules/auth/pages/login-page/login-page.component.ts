import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { loginRequiredFieldValidator } from '../../constants/auth.constants';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { loginUserAction } from 'src/app/store/user/user.actions';
import { Observable } from 'rxjs';
import { EReqStatus } from 'src/app/shared/constants/request.status';
import { selectUserReqStatus } from 'src/app/store/user/selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cv-gen-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<IAppState>
  ) {}

  reqStatus$: Observable<EReqStatus> = this.store.pipe(select(selectUserReqStatus));

  loginForm = this.fb.group({
    userName: ['', [loginRequiredFieldValidator('userName')]],
    password: ['', [loginRequiredFieldValidator('password')]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(loginUserAction({ user: this.loginForm.getRawValue() }));

    this.reqStatus$.pipe(untilDestroyed(this)).subscribe(reqStatus => {
      if (reqStatus === EReqStatus.SUCCESS) {
        this.router.navigate([RoutingPaths.HOME]);
      }
    });
  }
}
