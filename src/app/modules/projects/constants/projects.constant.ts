import { Validators } from '@angular/forms';
import { DateCellComponent } from 'src/app/shared/components/cells/date-cell/date-cell.component';
import { TableItemsCellComponent } from 'src/app/shared/components/cells/table-items-cell/table-items-cell.component';
import { customValidator } from 'src/app/shared/validators/validators';

export const projectsTableColumns = [
  {
    columnDef: 'id',
    header: 'home.projects.table.headers.id',
  },
  {
    columnDef: 'projectName',
    header: 'home.projects.table.headers.projectName',
  },
  {
    columnDef: 'description',
    header: 'home.projects.table.headers.description',
  },
  {
    columnDef: 'startDate',
    header: 'home.projects.table.headers.startDate',
    cellComponent: DateCellComponent,
  },
  {
    columnDef: 'endDate',
    header: 'home.projects.table.headers.endDate',
    cellComponent: DateCellComponent,
  },
  {
    columnDef: 'teamSize',
    header: 'home.projects.table.headers.teamSize',
  },
  {
    columnDef: 'responsibilities',
    header: 'home.projects.table.headers.responsibilities',
    cellComponent: TableItemsCellComponent,
  },
  {
    columnDef: 'teamRoles',
    header: 'home.projects.table.headers.teamRoles',
    cellComponent: TableItemsCellComponent,
  },
  {
    columnDef: 'techStack',
    header: 'home.projects.table.headers.techStack',
    cellComponent: TableItemsCellComponent,
  },
];
