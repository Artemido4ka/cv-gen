import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { IFormatedProject } from 'src/app/shared/types/project.types';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { addProjectAction } from 'src/app/store/projects/project.actions';

@Component({
  selector: 'cv-gen-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectPageComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private store: Store<IAppState>
  ) {}

  project: IFormatedProject;

  addForm = this.fb.group({
    addProjectForm: [],
  });

  handleSave() {
    if (this.addForm.invalid) {
      this.addForm.controls.addProjectForm.markAllAsTouched();
      return;
    }

    const sendData = { project: this.addForm.controls.addProjectForm.getRawValue() };

    this.store.dispatch(addProjectAction(sendData));
    this.router.navigate([RoutingPaths.HOME, RoutingPaths.PROJECTS]);
  }

  handleCancel() {
    this.location.back();
  }
}
