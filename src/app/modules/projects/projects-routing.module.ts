import { NgModule } from '@angular/core';

import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPageComponent,
  },
  {
    path: RoutingPaths.ADD,
    component: AddProjectPageComponent,
  },
  {
    path: `${RoutingPaths.EDIT}/:id`,
    component: EditProjectPageComponent,
    data: {
      breadcrumb: ''
  }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
