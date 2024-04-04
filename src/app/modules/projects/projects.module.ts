import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AddProjectPageComponent } from './pages/add-project-page/add-project-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';
import { TableComponent } from 'src/app/shared/components/tables/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { CustomTableComponent } from 'src/app/shared/components/tables/custom-table/custom-table.component';
import { TableItemsCellComponent } from 'src/app/shared/components/cells/table-items-cell/table-items-cell.component';

@NgModule({
  declarations: [ProjectsPageComponent, AddProjectPageComponent, EditProjectPageComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    TableComponent,
    MatButtonModule,
    CustomTableComponent,
    TableItemsCellComponent
  ],
})
export class ProjectsModule {}
