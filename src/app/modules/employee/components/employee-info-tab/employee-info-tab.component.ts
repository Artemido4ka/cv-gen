import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { IAppState } from 'src/app/store/app.store';
import { editEmployeeAction } from 'src/app/store/employees/employees.actions';

@UntilDestroy()
@Component({
  selector: 'cv-gen-employee-info-tab',
  templateUrl: './employee-info-tab.component.html',
  styleUrls: ['./employee-info-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoTabComponent {
  constructor(
    private router: Router,
    private location: Location,
    private store: Store<IAppState>
  ) {}

  @Input() employeeId: number;
  @Input() editEmployeeForm: FormControl;

  handleEmployeeSave() {
    if (this.editEmployeeForm.invalid) {
      this.editEmployeeForm.markAsTouched();
      return;
    }

    const sendData = {
      id: this.employeeId,
      employee: this.editEmployeeForm.getRawValue(),
    };

    this.store.dispatch(editEmployeeAction(sendData));
    this.router.navigate([RoutingPaths.HOME, RoutingPaths.EMPLOYEES]);
  }

  handleEmployeeCancel() {
    this.location.back();
  }
}
