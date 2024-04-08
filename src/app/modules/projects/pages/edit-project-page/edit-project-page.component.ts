import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {
  positiveNumberValidator,
  requiredValidator,
} from 'src/app/shared/validators/required.validator';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatedProject } from 'src/app/shared/types/project.types';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

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
    private router: Router
  ) {}

  isLoading = false;
  project: FormatedProject;
  projectId: number;

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

  getProject() {
    this.isLoading = true;
    this.projectsService.getProjectById(this.projectId).subscribe({
      next: project => {
        this.project = project;
        this.isLoading = false;

        this.projectForm.patchValue(project);

        this.cdRef.markForCheck();
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProject();

    console.log(this.project);
  }

  handleSaveChanges() {
    console.log(this.projectForm.getRawValue());
    if (this.projectForm.invalid && this.projectForm.touched) {
      return;
    }
    this.isLoading = true;

    this.projectsService.updateProject(this.projectId, this.projectForm.getRawValue()).subscribe({
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
