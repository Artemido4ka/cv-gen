import { NgModule } from '@angular/core';

import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPageComponent,
  },
  {
    path: 'add',
    component: AddProjectPageComponent,
  },
  {
    path: 'edit',
    component: EditProjectPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
