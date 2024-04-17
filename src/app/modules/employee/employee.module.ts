import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { MatButtonModule } from '@angular/material/button';
import { CustomTableComponent } from 'src/app/shared/components/tables/custom-table/custom-table.component';
import { TableItemsCellComponent } from 'src/app/shared/components/cells/table-items-cell/table-items-cell.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmployeesPageComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatButtonModule,
    CustomTableComponent,
    TableItemsCellComponent,
    TranslateModule,
  ],
})
export class EmployeeModule {}
