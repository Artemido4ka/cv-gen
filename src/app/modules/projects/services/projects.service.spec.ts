import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IFormatedProject } from 'src/app/shared/types/project.types';
import {
  PROJECT_CREATE_TEST_DATA,
  PROJECT_TEST_DATA,
  PROJECT_TEST_FORMATED_DATA,
} from 'src/app/shared/constants/testing-mocks';

describe('ProjectsService', () => {
  let projectsService: ProjectsService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    projectsService = TestBed.inject(ProjectsService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should be created', () => {
    expect(projectsService).toBeTruthy();
  });

  it('should get all projects', () => {
    projectsService.getProjects().subscribe((projects: IFormatedProject[]) => {
      expect(projects).toBeTruthy();
      expect(projects).toEqual([PROJECT_TEST_FORMATED_DATA]);
    });

    const mockReq = testingController.expectOne('http://localhost:3000/api/projects');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush([PROJECT_TEST_DATA]);
  });

  it('should get project by id', () => {
    projectsService.getProjectById(1).subscribe((project: IFormatedProject) => {
      expect(project).toBeTruthy();
      expect(project).toEqual(PROJECT_TEST_FORMATED_DATA);
    });

    const mockReq = testingController.expectOne('http://localhost:3000/api/projects/1');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(PROJECT_TEST_DATA);
  });

  it('should create a projects', () => {
    projectsService
      .createProject(PROJECT_CREATE_TEST_DATA)
      .subscribe((project: IFormatedProject) => {
        expect(project).toBeTruthy();
        expect(project).toEqual(PROJECT_TEST_FORMATED_DATA);
      });

    const mockReq = testingController.expectOne('http://localhost:3000/api/projects');
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.body).toEqual(PROJECT_CREATE_TEST_DATA);
    mockReq.flush(PROJECT_TEST_DATA);
  });

  it('should update a project', () => {
    projectsService
      .updateProject(1, PROJECT_CREATE_TEST_DATA)
      .subscribe((project: IFormatedProject) => {
        expect(project).toBeTruthy();
        expect(project).toEqual(PROJECT_TEST_FORMATED_DATA);
      });

    const mockReq = testingController.expectOne('http://localhost:3000/api/projects/1');
    expect(mockReq.request.method).toEqual('PUT');
    expect(mockReq.request.body).toEqual(PROJECT_CREATE_TEST_DATA);
    mockReq.flush(PROJECT_TEST_DATA);
  });

  it('should throw an error if request fails', () => {
    projectsService.createProject(PROJECT_CREATE_TEST_DATA).subscribe({
      next: () => {
        fail('Success should not be called');
      },
      error: (err: HttpErrorResponse) => {
        expect(err.status).toEqual(400);
        expect(err.statusText).toEqual('Failed to create object');
      },
    });
    const mockReq = testingController.expectOne('http://localhost:3000/api/projects');
    mockReq.flush('Server error', {
      status: 400,
      statusText: 'Failed to create object',
    });
  });

  //TODO:move it
  // describe('formating methods', () => {
  //   it('should format project', () => {
  //     const project: IProject = PROJECT_TEST_DATA;
  //     expect(projectsService.formatProject(project)).toEqual(PROJECT_TEST_FORMATED_DATA);
  //   });
  // });
});
