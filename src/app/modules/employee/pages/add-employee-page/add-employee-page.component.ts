import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';

@Component({
  selector: 'cv-gen-add-employee-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeePageComponent {
  constructor(
    private fb: FormBuilder,
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

    console.log(sendData);

    // this.store.dispatch(addProjectEmployeeAction(sendData));
    // this.router.navigate([RoutingPaths.HOME, RoutingPaths.EMPLOYEES]);
  }

  handleCancel() {
    this.location.back();
  }
}
