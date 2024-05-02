import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,

    children: [
      {
        path: RoutingPaths.EMPLOYEES,
        loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule),
        data: {
          breadcrumb: 'employees',
        },
      },
      {
        path: RoutingPaths.PROJECTS,
        loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: 'projects',
        },
      },
      { path: '**', redirectTo: RoutingPaths.PROJECTS },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
