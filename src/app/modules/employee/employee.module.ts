import { MatExpansionModule } from '@angular/material/expansion';
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
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeInfoTabComponent } from './components/employee-info-tab/employee-info-tab.component';
import { EmployeeCvTabComponent } from './components/employee-cv-tab/employee-cv-tab.component';
import { ProjectFormComponent } from 'src/app/shared/components/controls/project-form/project-form.component';
import { InputComponent } from 'src/app/shared/components/controls/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteSelectComponent } from 'src/app/shared/components/controls/autocomplete-select/autocomplete-select.component';

@NgModule({
  declarations: [
    EmployeesPageComponent,
    AddEmployeePageComponent,
    EditEmployeePageComponent,
    EmployeeInfoTabComponent,
    EmployeeCvTabComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatButtonModule,
    CustomTableComponent,
    TranslateModule,
    ReactiveFormsModule,
    EmployeeInfoFormComponent,
    MatTabsModule,
    ProjectFormComponent,
    InputComponent,
    MatIconModule,
    AutocompleteSelectComponent,
    MatExpansionModule,
  ],
})
export class EmployeeModule {}
