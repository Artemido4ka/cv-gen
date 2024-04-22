import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { IFormatedEmployee } from 'src/app/shared/types/employees.types';
import { IAppState } from 'src/app/store/app.store';
import { editEmployeeAction, getEmployeeAction } from 'src/app/store/employees/employees.actions';

import { getAllCVsAction } from 'src/app/store/cv/cv.actions';
import { CVFormatedInterface } from 'src/app/shared/types/cv.type';
import { selectCVs } from 'src/app/store/cv/cv.selectors';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'cv-gen-employee-cv-tab',
  templateUrl: './employee-cv-tab.component.html',
  styleUrls: ['./employee-cv-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvTabComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  @Input() employeeId: number;
  @Input() editEmployeeForm: FormControl;

  cvs$: Observable<CVFormatedInterface[]> = this.store.pipe(select(selectCVs));
  selectedCVId = 0;

  employeeCVFormArray = new FormArray<
    FormGroup<{
      cvsProjects: FormArray;
      employeeInfo: FormControl;
      language: FormControl;
      skills: FormControl;
      cvName: FormControl;
      id: FormControl;
    }>
  >([]);

  ngOnInit(): void {
    this.cvs$.pipe(untilDestroyed(this)).subscribe(cvs => {
      if (cvs) {
        cvs.forEach(({ cvsProjects, language, skills, cvName, id, ...restCVInfo }) => {
          const control = this.fb.group({
            id,
            cvName,
            language,
            skills,
            cvsProjects: this.fb.array(cvsProjects),
            employeeInfo: restCVInfo,
          });
          this.selectedCVId = 1;
          return this.employeeCVFormArray.push(control);
        });
      }

      this.cdRef.markForCheck();
    });
  }

  handleDeleteCV(event: Event, id: number) {
    const index = this.employeeCVFormArray.value.findIndex(cv => cv.id === id);

    if (index !== -1) this.employeeCVFormArray.removeAt(index);

    this.selectedCVId = 0;
  }

  handleAddCV() {
    const control = this.fb.group({
      id: new FormControl(uuidv4()),
      cvName: new FormControl('new CV'),
      employeeInfo: this.editEmployeeForm,
      language: new FormControl(),
      skills: new FormControl(),
      cvsProjects: this.fb.array([]),
    });

    this.employeeCVFormArray.push(control);
  }

  handleSelectCV(id: number) {
    this.selectedCVId = id;
  }

  getSelectedCVFormGroup(): FormGroup<{
    cvsProjects: FormArray;
    employeeInfo: FormControl;
    language: FormControl;
    skills: FormControl;
    cvName: FormControl;
    id: FormControl;
  }> | null {
    const selectedCV = this.employeeCVFormArray.controls.find(
      cv => cv.controls.id.value === this.selectedCVId
    );

    return selectedCV ? selectedCV : null;
  }

  handleDeleteProject(removeProjIndex: number) {
    const group = this.getSelectedCVFormGroup();

    const index = this.employeeCVFormArray.value.findIndex(cv => cv.id === group.controls.id.value);
    if (index !== -1) {
      const projects = this.employeeCVFormArray.at(index).controls.cvsProjects;
      projects.removeAt(removeProjIndex);
    }
  }

  get cvsProjects() {
    const group = this.getSelectedCVFormGroup();
    const res = group.controls['cvsProjects'] as FormArray;
    // console.log(res);
    return res;
  }

  projectControlName(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  handleADDProject() {
    const group = this.getSelectedCVFormGroup();

    const index = this.employeeCVFormArray.value.findIndex(cv => cv.id === group.controls.id.value);

    if (index !== -1)
      this.employeeCVFormArray.at(index).controls.cvsProjects.push(this.fb.control(''));
  }
}
