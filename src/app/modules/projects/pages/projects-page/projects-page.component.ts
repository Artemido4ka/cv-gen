import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

import { ProjectsServiceTsService } from '../../services/projects.service';
import { FormatedProject } from 'src/app/shared/types/project.types';
import { TableItemsCellComponent } from 'src/app/shared/components/cells/table-items-cell/table-items-cell.component';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';

@Component({
  selector: 'cv-gen-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsServiceTsService,
    private readonly cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isLoading = false;

  linkUrl = `${this.router.url}/${RoutingPaths.EDIT}`;
  projects: MatTableDataSource<FormatedProject, MatTableDataSourcePaginator>;

  columns = [
    {
      columnDef: 'id',
      header: 'home.projects.table.headers.id',
    },
    {
      columnDef: 'projectName',
      header: 'home.projects.table.headers.projectName',
    },
    {
      columnDef: 'description',
      header: 'home.projects.table.headers.description',
    },
    {
      columnDef: 'startDate',
      header: 'home.projects.table.headers.startDate',
    },
    {
      columnDef: 'endDate',
      header: 'home.projects.table.headers.endDate',
    },
    {
      columnDef: 'teamSize',
      header: 'home.projects.table.headers.teamSize',
    },
    {
      columnDef: 'responsibilities',
      header: 'home.projects.table.headers.responsibilities',
      cellComponent: TableItemsCellComponent,
    },
    {
      columnDef: 'teamRoles',
      header: 'home.projects.table.headers.teamRoles',
      cellComponent: TableItemsCellComponent,
    },
    {
      columnDef: 'techStack',
      header: 'home.projects.table.headers.techStack',
      cellComponent: TableItemsCellComponent,
    },
  ];

  //TODO: handle error
  ngOnInit(): void {
    this.isLoading = true;
    this.projectsService.getProjects().subscribe({
      next: projects => {
        this.projects = new MatTableDataSource(projects);
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.cdRef.markForCheck();
      },
    });
  }

  onSubmit() {
    this.router.navigate([RoutingPaths.ADD], { relativeTo: this.route });
  }
}
