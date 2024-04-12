import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { IFormatedProject } from 'src/app/shared/types/project.types';
import { Location } from '@angular/common';

@Component({
  selector: 'cv-gen-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectPageComponent {
  constructor(
    private projectsService: ProjectsService,
    private readonly cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  isLoading = false;
  project: IFormatedProject;

  addForm = this.fb.group({
    addProjectForm: [],
  });

  handleSave() {
    if (this.addForm.invalid) {
      this.addForm.controls.addProjectForm.markAsTouched();
      return;
    }
    this.isLoading = true;

    this.projectsService
      .createProject(this.addForm.controls.addProjectForm.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate([RoutingPaths.HOME, RoutingPaths.PROJECTS]);
          this.cdRef.markForCheck();
        },
        error: errorMessage => {
          // this.projectForm.setErrors({ error: errorMessage });
          this.isLoading = false;
          this.cdRef.markForCheck();
        },
      });
  }

  handleCancel() {
    this.location.back();
  }
}
