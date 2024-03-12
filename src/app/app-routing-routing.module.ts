import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME } from './shared/constants/routes.constants';

const routes: Routes = [
  { path: HOME.path, loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: HOME.path },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
