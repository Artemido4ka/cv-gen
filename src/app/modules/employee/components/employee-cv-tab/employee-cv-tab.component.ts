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
import { selectLanguages, selectLevels } from 'src/app/store/core/core.selectors';
import { getLanguagesAction, getLevelsAction } from 'src/app/store/core/core.actions';
import { addCVAction, deleteCVAction, editCVAction } from 'src/app/store/cv/cv.actions';
import { Location } from '@angular/common';

interface CVTabFormInterface {
  cvsProjects: FormArray;
  employeeInfo: FormControl;
  language: FormArray;
  skills: FormControl;
  cvName: FormControl;
  id: FormControl;
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
    private readonly cdRef: ChangeDetectorRef,
    private location: Location
  ) {}

  @Input() employeeId: number;
  @Input() editEmployeeForm: FormControl;

  cvs$: Observable<CVFormatedInterface[]> = this.store.pipe(select(selectCVs));
  selectedCVIndex = 0;

  employeeCVFormArray = new FormArray<FormGroup<CVTabFormInterface>>([]);
  skillsOptions$: Observable<FormatedTechStackItemT[]> = this.store.pipe(select(selectTechStack));

  languages$: Observable<string[]> = this.store.pipe(select(selectLanguages));
  levels$: Observable<string[]> = this.store.pipe(select(selectLevels));

  @ViewChild(MatAccordion) accordion: MatAccordion;

  ngOnInit(): void {
    this.store.dispatch(getTechStackAction());
    this.store.dispatch(getLevelsAction());
    this.store.dispatch(getLanguagesAction());

    this.cvs$.pipe(untilDestroyed(this)).subscribe(cvs => {

      const isCVFormArrayLength = this.employeeCVFormArray.length;
      const isCVArrayLength = cvs.length;

      if (cvs && !isCVArrayLength && isCVFormArrayLength) {
        this.employeeCVFormArray.clear();
      }

      if (cvs && isCVArrayLength && isCVFormArrayLength) {
        const newIdOfCreatedCV = cvs[cvs.length - 1].id;
        this.employeeCVFormArray.at(this.selectedCVIndex).patchValue({
          id: newIdOfCreatedCV,
        });
      }

      if (cvs && isCVArrayLength && !isCVFormArrayLength) {
        cvs.forEach(({ cvsProjects, language, skills, cvName, id, ...restCVInfo }) => {
          const langArray = language.length
            ? language.map(({ name, level }) =>
                this.fb.group({
                  name: [name.name, employeeRequiredFieldValidator('language')],
                  level: [level.name, employeeRequiredFieldValidator('level')],
                })
              )
            : [];

          const control = this.fb.group({
            id,
            cvName: [cvName, [employeeRequiredFieldValidator('cvName')]],
            skills: [skills, [employeeRequiredFieldValidator('skills')]],
            cvsProjects: this.fb.array(cvsProjects),
            language: this.fb.array(langArray),
            employeeInfo: restCVInfo,
          });

          return this.employeeCVFormArray.push(control);
        });
      }

      this.cdRef.markForCheck();
    });
  }

  handleDeleteCV(index: number) {
    const cvId = this.employeeCVFormArray.at(index).value.id;
    if (cvId) {
      this.store.dispatch(deleteCVAction({ id: cvId }));
    }

    this.selectedCVIndex = 0;
    this.employeeCVFormArray.removeAt(index);
  }

  handleAddCV() {
    const control = this.fb.group({
      id: new FormControl(),
      cvName: new FormControl('New CV', [employeeRequiredFieldValidator('cvName')]),
      employeeInfo: this.editEmployeeForm,
      language: this.fb.array([]),
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

  handleDeleteLanguage(removeLangIndex: number) {
    const languages = this.employeeCVFormArray.at(this.selectedCVIndex).controls.language;
    languages.removeAt(removeLangIndex);
  }

  handleAddLanguage() {
    this.employeeCVFormArray.at(this.selectedCVIndex).controls.language.push(
      this.fb.group({
        name: ['', employeeRequiredFieldValidator('language')],
        level: ['', employeeRequiredFieldValidator('level')],
      })
    );
  }

  get cvsProjects() {
    const group = this.employeeCVFormArray.at(this.selectedCVIndex);
    return group.controls.cvsProjects as FormArray<FormControl>;
  }

  get language() {
    const group = this.employeeCVFormArray.at(this.selectedCVIndex);
    return group.controls.language as FormArray<
      FormGroup<{ name: FormControl; level: FormControl }>
    >;
  }

  // getSelectedCVFormGroup(): FormGroup<CVTabFormInterface> {
  //   return this.employeeCVFormArray.controls[this.selectedCVIndex];
  // }

  projectControlName(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  handleCVSave() {
    const selectedCV = this.employeeCVFormArray.at(this.selectedCVIndex);
    if (selectedCV.invalid) {
      selectedCV.markAllAsTouched();
      this.accordion.openAll();
      return;
    }

    const rawValue = selectedCV.getRawValue();

    const formatSendingLangArray = rawValue.language.length
      ? rawValue.language.map(({ name, level }) => {
          return { name: { name: name }, level: { name: level } };
        })
      : [];

    const cvBody = {
      cvName: rawValue.cvName,
      language: formatSendingLangArray,
      skills: rawValue.skills,
      projects: rawValue.cvsProjects,
      employeeId: this.employeeId,
      ...rawValue.employeeInfo,
    };

    const cvId = rawValue.id;

    cvId
      ? this.store.dispatch(editCVAction({ id: cvId, cv: cvBody }))
      : this.store.dispatch(addCVAction({ cv: cvBody }));
  }

  handleCancel() {
    this.location.back();
  }
}
