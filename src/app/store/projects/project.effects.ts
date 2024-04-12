import { ProjectsService } from './../../modules/projects/services/projects.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  getProjectsAction,
  getProjectsFailedAction,
  getProjectsSuccessAction,
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
}
