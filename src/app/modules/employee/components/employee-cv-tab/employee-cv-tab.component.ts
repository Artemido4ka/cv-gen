import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/store/app.store';
import { CVFormatedInterface } from 'src/app/shared/types/cv.type';
import { selectCVs } from 'src/app/store/cv/cv.selectors';
import { getTechStackAction } from 'src/app/store/projects/project.actions';
import { FormatedTechStackItemT } from 'src/app/shared/types/project.types';
import { selectTechStack } from 'src/app/store/projects/projects.selectors';
import { employeeRequiredFieldValidator } from '../../constants/employees.constant';
import { MatAccordion } from '@angular/material/expansion';

interface CVTabFormInterface {
  cvsProjects: FormArray;
  employeeInfo: FormControl;
  language: FormControl;
  skills: FormControl;
  cvName: FormControl;
  id: FormControl;
  // language: FormControl<Array<string>>;
}
@UntilDestroy()
@Component({
  selector: 'cv-gen-employee-cv-tab',
  templateUrl: './employee-cv-tab.component.html',
  styleUrls: ['./employee-cv-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvTabComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  @Input() employeeId: number;
  @Input() editEmployeeForm: FormControl;

  cvs$: Observable<CVFormatedInterface[]> = this.store.pipe(select(selectCVs));
  selectedCVIndex = 0;

  employeeCVFormArray = new FormArray<FormGroup<CVTabFormInterface>>([]);
  skillsOptions$: Observable<FormatedTechStackItemT[]> = this.store.pipe(select(selectTechStack));

  @ViewChild(MatAccordion) accordion: MatAccordion;

  ngOnInit(): void {
    this.store.dispatch(getTechStackAction());

    this.cvs$.pipe(untilDestroyed(this)).subscribe(cvs => {
      this.employeeCVFormArray.clear();
      if (cvs && cvs.length) {
        cvs.forEach(({ cvsProjects, language, skills, cvName, id, ...restCVInfo }) => {
          const control = this.fb.group({
            id,
            cvName: [cvName, [employeeRequiredFieldValidator('cvName')]],
            language: [language],
            skills: [skills, [employeeRequiredFieldValidator('skills')]],
            cvsProjects: this.fb.array(cvsProjects),
            employeeInfo: restCVInfo,
          });

          return this.employeeCVFormArray.push(control);
        });
      }

      this.cdRef.markForCheck();
    });
  }

  handleDeleteCV(event: Event, id: number) {
    this.employeeCVFormArray.removeAt(id);

    this.selectedCVIndex = 0;
  }

  handleAddCV() {
    const control = this.fb.group({
      id: new FormControl(),
      cvName: new FormControl('New CV', [employeeRequiredFieldValidator('cvName')]),
      employeeInfo: this.editEmployeeForm,
      language: new FormControl(),
      skills: new FormControl([], [employeeRequiredFieldValidator('skills')]),
      cvsProjects: this.fb.array([]),
    });

    this.employeeCVFormArray.push(control);
  }

  handleSelectCV(id: number) {
    this.selectedCVIndex = id;
  }

  handleDeleteProject(removeProjIndex: number) {
    const projects = this.employeeCVFormArray.at(this.selectedCVIndex).controls.cvsProjects;
    projects.removeAt(removeProjIndex);
  }

  handleADDProject() {
    this.employeeCVFormArray
      .at(this.selectedCVIndex)
      .controls.cvsProjects.push(this.fb.control({ projectName: 'New Project' }));
  }

  get cvsProjects() {
    const group = this.employeeCVFormArray.at(this.selectedCVIndex);
    return group.controls.cvsProjects as FormArray<FormControl>;
  }

  // getSelectedCVFormGroup(): FormGroup<CVTabFormInterface> {
  //   return this.employeeCVFormArray.controls[this.selectedCVIndex];
  // }

  projectControlName(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  handleCVSave() {
    console.log(this.employeeCVFormArray.at(this.selectedCVIndex));
    this.employeeCVFormArray.at(this.selectedCVIndex).markAllAsTouched();
    this.accordion.openAll();
  }

  handleCancel() {
    console.log();
  }
}
