import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';
import { EditEmployeePageComponent } from './pages/edit-employee-page/edit-employee-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPageComponent,
  },
  {
    path: RoutingPaths.ADD,
    component: AddEmployeePageComponent,
  },
  {
    path: `${RoutingPaths.EDIT}/:id`,
    component: EditEmployeePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
