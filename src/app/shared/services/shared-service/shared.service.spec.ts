import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import {
  CV_DATA,
  CV_DATA_FORMATED,
  EMPLOYEE_DATA,
  EMPLOYEE_DATA_FORMATED,
  PROJECT_TEST_DATA,
  PROJECT_TEST_DATA_WITH_FORMATED_DATE,
  PROJECT_TEST_FORMATED_DATA,
} from '../../constants/testing-mocks';
import { IProject } from '../../types/project.types';
import { CVInterface } from '../../types/cv.type';
import { IEmployee } from '../../types/employees.types';

describe('SharedService', () => {
  let sharedService: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService],
    });
    sharedService = TestBed.inject(SharedService);
  });

  it('SharedService service should be created', () => {
    expect(sharedService).toBeTruthy();
  });

  it('formatProject', () => {
    const fakeData: IProject = PROJECT_TEST_DATA;
    expect(sharedService.formatProject(fakeData)).toEqual(PROJECT_TEST_FORMATED_DATA);
  });

  it('formatProjectDate', () => {
    const fakeData: IProject = PROJECT_TEST_DATA;
    expect(sharedService.formatProjectDate(fakeData)).toEqual(PROJECT_TEST_DATA_WITH_FORMATED_DATE);
  });

  it('formatCV', () => {
    const fakeData: CVInterface = CV_DATA;
    expect(sharedService.formatCV(fakeData)).toEqual(CV_DATA_FORMATED);
  });

  it('formatEmployee', () => {
    const fakeData: IEmployee = EMPLOYEE_DATA;
    expect(sharedService.formatEmployee(fakeData)).toEqual(EMPLOYEE_DATA_FORMATED);
  });
});

