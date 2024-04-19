import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { IAppState } from 'src/app/store/app.store';
import { addEmployeeAction } from 'src/app/store/employees/employees.actions';

@Component({
  selector: 'cv-gen-add-employee-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeePageComponent {
  constructor(
    private router: Router,
    private location: Location,
    private store: Store<IAppState>
  ) {}

  addEmployeeForm = new FormControl();

  handleSave() {
    if (this.addEmployeeForm.invalid) {
      this.addEmployeeForm.markAsTouched();
      return;
    }

    const sendData = { employee: this.addEmployeeForm.getRawValue() };

    this.store.dispatch(addEmployeeAction(sendData));
    this.router.navigate([RoutingPaths.HOME, RoutingPaths.EMPLOYEES]);
  }

  handleCancel() {
    this.location.back();
  }
}
