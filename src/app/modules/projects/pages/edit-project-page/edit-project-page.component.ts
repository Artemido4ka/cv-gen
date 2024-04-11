import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatedProject } from 'src/app/shared/types/project.types';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { Location } from '@angular/common';

@Component({
  selector: 'cv-gen-edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private readonly cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  isLoading = false;
  project: FormatedProject;
  projectId: number;

  editForm = this.fb.group({
    editProjectForm: [],
  });

  getProject() {
    this.isLoading = true;

    this.projectsService.getProjectById(this.projectId).subscribe({
      next: project => {
        this.project = project;
        this.isLoading = false;
        this.editForm.controls.editProjectForm.setValue(project);
        this.editForm.controls.editProjectForm.markAsUntouched();
        this.cdRef.markForCheck();
      },
      error: error => {
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProject();
  }

  handleSaveChanges() {
    if (this.editForm.invalid) {
      this.editForm.controls.editProjectForm.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.projectsService
      .updateProject(this.projectId, this.editForm.controls.editProjectForm.getRawValue())
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
