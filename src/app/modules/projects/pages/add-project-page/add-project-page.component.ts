import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidator } from 'src/app/shared/validators/validators';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { projectRequiredFieldValidator } from '../../constants/projects.constant';

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

  handleSave() {
    // if (this.projectForm.invalid) {
    //   return;
    // }
    this.isLoading = true;

    this.projectsService.createProject(this.projectForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([RoutingPaths.HOME, RoutingPaths.PROJECTS]);
        this.cdRef.markForCheck();
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.projectForm.setErrors({ error: errorMessage });
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }
}
