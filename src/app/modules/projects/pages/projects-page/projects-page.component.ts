import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsServiceTsService } from '../../services/projects.service';
import { FormatedProject } from 'src/app/shared/types/project.types';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { TableItemsCellComponent } from 'src/app/shared/components/cells/table-items-cell/table-items-cell.component';

@Component({
  selector: 'cv-gen-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsServiceTsService,
    private readonly cdRef: ChangeDetectorRef
  ) {}
  isLoading = false;

  //ToDo: change url
  linkUrl = '/home/projects';
  projects: MatTableDataSource<FormatedProject, MatTableDataSourcePaginator>;

  columns = [
    {
      columnDef: 'id',
      header: 'Project id',
    },
    {
      columnDef: 'projectName',
      header: 'Project name',
    },
    {
      columnDef: 'description',
      header: 'Project Description',
    },
    {
      columnDef: 'startDate',
      header: 'startDate',
    },
    {
      columnDef: 'endDate',
      header: 'endDate',
    },
    {
      columnDef: 'teamSize',
      header: 'teamSize',
    },
    {
      columnDef: 'responsibilities',
      header: 'responsibilities',
      cellComponent: TableItemsCellComponent,
    },
    {
      columnDef: 'teamRoles',
      header: 'teamRoles',
      cellComponent: TableItemsCellComponent,
    },
    {
      columnDef: 'techStack',
      header: 'techStack',
      cellComponent: TableItemsCellComponent,
    },
  ];

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
}
