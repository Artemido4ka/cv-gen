import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ProjectsServiceTsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
