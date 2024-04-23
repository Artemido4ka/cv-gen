import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFormatedEmployee } from 'src/app/shared/types/employees.types';
import { ControlValueAccessor, FormBuilder, NgControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { InputComponent } from '../input/input.component';
import { employeeRequiredFieldValidator } from 'src/app/modules/employee/constants/employees.constant';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { selectDepartments, selectSpecializations } from 'src/app/store/core/core.selectors';

@UntilDestroy()
@Component({
  selector: 'cv-gen-employee-info-form',
  standalone: true,
  imports: [CommonModule, InputComponent, AutocompleteComponent, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoFormComponent implements ControlValueAccessor, OnInit, DoCheck {
  employeeForm = this.fb.group({
    firstName: ['', [employeeRequiredFieldValidator('firstName')]],
    lastName: ['', [employeeRequiredFieldValidator('lastName')]],
    email: ['', [employeeRequiredFieldValidator('email')]],
    specialization: ['', [employeeRequiredFieldValidator('specialization')]],
    department: ['', [employeeRequiredFieldValidator('department')]],
  });

  departmentOptions$: Observable<string[]> = this.store.pipe(select(selectDepartments));
  specializationOptions$: Observable<string[]> = this.store.pipe(select(selectSpecializations));
  @Input() id: number | string = 'employeeFormId';

  onChange: (val: Partial<IFormatedEmployee>) => void;
  onTouch: () => void;

  constructor(
    private fb: FormBuilder,
    private ngControl: NgControl,
    private cdRef: ChangeDetectorRef,
    private store: Store<IAppState>
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.initFormValuesChanges();
  }

  public ngDoCheck(): void {
    if (this.ngControl.control.invalid !== this.employeeForm.invalid) {
      this.ngControl.control.setErrors(
        this.employeeForm.invalid ? { employeeFormError: 'form is invalid !' } : null
      );
    }

    //TODO: check when should children and parent touched
    if (this.ngControl.control?.touched) {
      this.employeeForm.markAllAsTouched();
      this.cdRef.markForCheck();
    } else {
      this.employeeForm.markAsPristine();
    }
  }

  protected initFormValuesChanges(): void {
    this.employeeForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: Partial<IFormatedEmployee>) => {
        // this.onTouch();
        this.onChange(value);
      });
  }

  writeValue(employee: IFormatedEmployee | null): void {
    this.employeeForm.reset();
    if (employee) {
      this.employeeForm.patchValue(employee);
    }

    this.employeeForm.markAsUntouched();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
