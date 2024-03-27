import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingPaths } from './shared/constants/routing-paths';

const routes: Routes = [
  {
    path: RoutingPaths.AUTH,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: RoutingPaths.HOME,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: RoutingPaths.STORY_BOOK,
    loadChildren: () =>
      import('./modules/components-examples/components-examples.module').then(
        m => m.ComponentsExamplesModule
      ),
  },
  { path: '**', redirectTo: RoutingPaths.AUTH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
