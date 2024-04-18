import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { MatButtonModule } from '@angular/material/button';
import { CustomTableComponent } from 'src/app/shared/components/tables/custom-table/custom-table.component';

import { TranslateModule } from '@ngx-translate/core';
import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';
import { EditEmployeePageComponent } from './pages/edit-employee-page/edit-employee-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeInfoFormComponent } from 'src/app/shared/components/controls/employee-form/employee-form.component';

@NgModule({
  declarations: [EmployeesPageComponent, AddEmployeePageComponent, EditEmployeePageComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatButtonModule,
    CustomTableComponent,
    TranslateModule,
    ReactiveFormsModule,
    EmployeeInfoFormComponent,
  ],
})
export class EmployeeModule {}
