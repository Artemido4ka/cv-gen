import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { TextareaComponent } from '../textarea/textarea.component';
import {
  ControlValueAccessor,
  FormBuilder,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteSelectComponent } from '../autocomplete-select/autocomplete-select.component';
import { projectRequiredFieldValidator } from 'src/app/modules/projects/constants/projects.constant';
import { customValidator } from 'src/app/shared/validators/validators';
import { FormatedTechStackItemT, IFormatedProject } from 'src/app/shared/types/project.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import {
  selectResponsibilities,
  selectTeamRoles,
  selectTechStack,
} from 'src/app/store/projects/selectors';
import {
  getResponsibilitiesAction,
  getTeamRolesAction,
  getTechStackAction,
} from 'src/app/store/projects/project.actions';

@UntilDestroy()
@Component({
  selector: 'cv-gen-project-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    DatepickerComponent,
    AutocompleteSelectComponent,
    TextareaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements ControlValueAccessor, DoCheck, OnInit {
  projectForm = this.fb.group({
    projectName: ['', [projectRequiredFieldValidator('projectName')]],
    startDate: ['', projectRequiredFieldValidator('startDate')],
    endDate: ['', projectRequiredFieldValidator('endDate')],
    teamSize: [
      0,
      customValidator(Validators.min(1), 'home.project.teamSize.errors.required', 'minTeamSize'),
    ],
    description: ['', projectRequiredFieldValidator('description')],
    techStack: [Array<string>(), projectRequiredFieldValidator('teachStack')],
    teamRoles: [Array<string>(), projectRequiredFieldValidator('roles')],
    responsibilities: [Array<string>(), projectRequiredFieldValidator('responsibilities')],
  });

  teachStackOptions$: Observable<FormatedTechStackItemT[]> = this.store.pipe(
    select(selectTechStack)
  );
  rolesOptions$: Observable<FormatedTechStackItemT[]> = this.store.pipe(select(selectTeamRoles));
  responsibilitiesOptions$: Observable<FormatedTechStackItemT[]> = this.store.pipe(
    select(selectResponsibilities)
  );

  onChange: (val: Partial<IFormatedProject>) => void;
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
    this.store.dispatch(getTeamRolesAction());
    this.store.dispatch(getResponsibilitiesAction());
    this.store.dispatch(getTechStackAction());
    this.initFormValuesChanges();
  }

  public ngDoCheck(): void {
    if (this.ngControl.control.invalid !== this.projectForm.invalid) {
      const projectFormControls = this.projectForm.controls;
      const projectFormErrors = Object.keys(projectFormControls)
        .map(key => this.projectForm.controls[key as keyof typeof projectFormControls].errors)
        .filter(p => p);

      this.ngControl.control.setErrors(projectFormErrors.length ? projectFormErrors : null);
      // this.ngControl.control.setErrors({ formError: 'form is invalid !' });
    }
    //TODO: check when should children and parent touched
    // if (this.ngControl.control?.touched) {
    //   this.projectForm.markAllAsTouched();
    //   this.cdRef.markForCheck();
    // } else {
    //   this.projectForm.markAsPristine();
    // }
  }

  protected initFormValuesChanges(): void {
    this.projectForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: Partial<IFormatedProject>) => {
        this.onTouch();
        this.onChange(value);
      });
  }

  writeValue(project: IFormatedProject | null): void {
    if (project) {
      this.projectForm.patchValue(project);
      this.projectForm.markAsUntouched();
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
