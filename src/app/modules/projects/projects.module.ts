import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';

@NgModule({
  declarations: [ProjectsPageComponent, AddProjectPageComponent, EditProjectPageComponent],
  imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
