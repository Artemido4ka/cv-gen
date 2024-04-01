import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectsServiceTsService } from './services/projects.service';

@Component({
  selector: 'cv-gen-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  constructor(private projectsService: ProjectsServiceTsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: val => {
        console.log(val);
      },
      error: errorMessage => {
        console.log(errorMessage);
      },
    });

    console.log('fdwef');
  }
}
