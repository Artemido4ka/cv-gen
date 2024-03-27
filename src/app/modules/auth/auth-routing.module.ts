import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: RoutingPaths.AUTH_LOGIN,
        component: LoginPageComponent,
      },
      {
        path: RoutingPaths.AUTH_REGISTRATION,
        component: RegistrationPageComponent,
      },
      { path: '**', redirectTo: RoutingPaths.AUTH_LOGIN },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
