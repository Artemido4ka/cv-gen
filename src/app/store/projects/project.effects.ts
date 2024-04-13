import { ProjectsService } from './../../modules/projects/services/projects.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  addProjectFailedAction,
  addProjectAction,
  getProjectAction,
  getProjectFailedAction,
  getProjectSuccessAction,
  getProjectsAction,
  getProjectsFailedAction,
  getProjectsSuccessAction,
  editProjectAction,
  addProjectSuccessAction,
  editProjectSuccessAction,
  editProjectFailedAction,
} from './project.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProjectsAction),
      switchMap(() => {
        return this.projectsService.getProjects().pipe(
          map(projects => getProjectsSuccessAction({ projects })),
          catchError((error: HttpErrorResponse) => of(getProjectsFailedAction(error)))
        );
      })
    )
  );

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProjectAction),
      switchMap(action => {
        return this.projectsService.getProjectById(action.id).pipe(
          map(project => getProjectSuccessAction({ project })),
          catchError((error: HttpErrorResponse) => of(getProjectFailedAction(error)))
        );
      })
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectAction),
      switchMap(action => {
        return this.projectsService.createProject(action.project).pipe(
          map(project => addProjectSuccessAction({ project })),
          catchError((error: HttpErrorResponse) => of(addProjectFailedAction(error)))
        );
      })
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProjectAction),
      switchMap(action => {
        return this.projectsService.updateProject(action.id, action.project).pipe(
          map(project => editProjectSuccessAction({ project })),
          catchError((error: HttpErrorResponse) => of(editProjectFailedAction(error)))
        );
      })
    )
  );
}
