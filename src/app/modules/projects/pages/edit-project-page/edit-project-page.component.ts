import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidator } from 'src/app/shared/validators/validators';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatedProject } from 'src/app/shared/types/project.types';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { projectRequiredFieldValidator } from '../../constants/projects.constant';

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

  getProject() {
    this.isLoading = true;
    this.projectsService.getProjectById(this.projectId).subscribe({
      next: project => {
        this.project = project;
        this.isLoading = false;

        this.projectForm.patchValue(project);
        this.projectForm.markAsUntouched();
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
  }

  handleSaveChanges() {
    if (this.projectForm.invalid) {
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
