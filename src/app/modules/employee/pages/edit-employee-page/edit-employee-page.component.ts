import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFormatedEmployee } from 'src/app/shared/types/employees.types';
import { IAppState } from 'src/app/store/app.store';
import { getDepartmentsAction, getSpecializationsAction } from 'src/app/store/core/core.actions';
import { selectEmployee } from 'src/app/store/employees/employees-selectors';
import { getEmployeeAction } from 'src/app/store/employees/employees.actions';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-employee-page',
  templateUrl: './edit-employee-page.component.html',
  styleUrls: ['./edit-employee-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<IAppState>,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  employeeId: number;
  editEmployeeForm = new FormControl();
  employee$: Observable<IFormatedEmployee> = this.store.pipe(select(selectEmployee));

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(getEmployeeAction({ id: this.employeeId }));
    this.store.dispatch(getDepartmentsAction());
    this.store.dispatch(getSpecializationsAction());

    this.employee$.pipe(untilDestroyed(this)).subscribe(employee => {
      this.editEmployeeForm.setValue(employee);
    });
  }

  handleCancel() {
    this.location.back();
  }
}
