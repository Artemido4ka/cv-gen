import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

import { ProjectsService } from '../../services/projects.service';
import { FormatedProject } from 'src/app/shared/types/project.types';
import { RoutingPaths } from 'src/app/shared/constants/routing-paths';
import { projectsTableColumns } from '../../constants/projects.constant';

@Component({
  selector: 'cv-gen-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private readonly cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isLoading = false;

  linkUrl = `${this.router.url}/${RoutingPaths.EDIT}`;
  projects: MatTableDataSource<FormatedProject, MatTableDataSourcePaginator>;

  projectsTableColumns = projectsTableColumns;

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
