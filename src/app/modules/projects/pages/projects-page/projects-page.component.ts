import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

import { IFormatedProject } from 'src/app/shared/types/project.types';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { projectsTableColumns } from '../../constants/projects.constant';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { selectProjectReqStatus, selectProjects } from 'src/app/store/projects/projects.selectors';
import { getProjectsAction } from 'src/app/store/projects/project.actions';
import { RequestStatusEnum } from 'src/app/shared/constants/request.status';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cv-gen-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  linkUrl = `${this.router.url}/${RoutingPaths.EDIT}`;
  projectsTableColumns = projectsTableColumns;
  projects: MatTableDataSource<IFormatedProject, MatTableDataSourcePaginator>;

  projects$: Observable<IFormatedProject[]> = this.store.pipe(select(selectProjects));
  reqStatus$: Observable<RequestStatusEnum> = this.store.pipe(select(selectProjectReqStatus));

  ngOnInit(): void {
    this.store.dispatch(getProjectsAction());

    this.projects$.pipe(untilDestroyed(this)).subscribe(projects => {
      if (!projects) return;
      this.projects = new MatTableDataSource(projects);
      this.cdRef.markForCheck();
    });
  }

  onSubmit() {
    this.router.navigate([RoutingPaths.ADD], { relativeTo: this.route });
  }
}
