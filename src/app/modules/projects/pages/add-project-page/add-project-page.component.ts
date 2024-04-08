import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {
  positiveNumberValidator,
  requiredValidator,
} from 'src/app/shared/validators/required.validator';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@Component({
  selector: 'cv-gen-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectPageComponent {
  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  isLoading = false;

  projectForm = this.fb.group({
    projectName: ['', [requiredValidator('home.project.projectName.errors.required')]],
    startDate: ['', requiredValidator('home.project.startDate.errors.required')],
    endDate: ['', requiredValidator('home.project.endDate.errors.required')],
    teamSize: [0, positiveNumberValidator('home.project.teamSize.errors.required')],
    description: ['', requiredValidator('home.project.description.errors.required')],
    techStack: [new FormArray([]), requiredValidator('home.project.teachStack.errors.required')],
    teamRoles: [new FormArray([]), requiredValidator('home.project.roles.errors.required')],
    responsibilities: [
      new FormArray([]),
      requiredValidator('home.project.responsibilities.errors.required'),
    ],
  });

  handleSave() {
    if (this.projectForm.invalid && this.projectForm.touched) {
      return;
    }
    this.isLoading = true;

    this.projectsService.createProject(this.projectForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([RoutingPaths.HOME, RoutingPaths.PROJECTS]);
        this.cdRef.markForCheck();
      },
      error: errorMessage => {
        this.projectForm.setErrors({ error: errorMessage });
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }
}
