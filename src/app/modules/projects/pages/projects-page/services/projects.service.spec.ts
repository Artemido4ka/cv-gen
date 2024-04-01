import { TestBed } from '@angular/core/testing';

import { ProjectsServiceTsService } from './projects.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ProjectsServiceTsService', () => {
  let service: ProjectsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ProjectsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
