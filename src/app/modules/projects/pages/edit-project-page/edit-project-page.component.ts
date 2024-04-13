import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { IFormatedProject } from 'src/app/shared/types/project.types';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { IAppState } from 'src/app/store/app.store';
import { editProjectAction, getProjectAction } from 'src/app/store/projects/project.actions';
import { selectProject } from 'src/app/store/projects/selectors';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private store: Store<IAppState>
  ) {}

  projectId: number;

  editForm = this.fb.group({
    editProjectForm: [],
  });

  project$: Observable<IFormatedProject> = this.store.pipe(select(selectProject));

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(getProjectAction({ id: this.projectId }));

    this.project$.pipe(untilDestroyed(this)).subscribe(project => {
      this.editForm.controls.editProjectForm.setValue(project);
      //TODO: markAsUntouched() can be deleted later
      this.editForm.controls.editProjectForm.markAsUntouched();
    });
  }

  handleSaveChanges() {
    if (this.editForm.invalid) {
      this.editForm.controls.editProjectForm.markAllAsTouched();
      return;
    }

    const sendData = {
      id: this.projectId,
      project: this.editForm.controls.editProjectForm.getRawValue(),
    };

    this.store.dispatch(editProjectAction(sendData));
    this.router.navigate([RoutingPaths.HOME, RoutingPaths.PROJECTS]);
  }

  handleCancel() {
    this.location.back();
  }
}
