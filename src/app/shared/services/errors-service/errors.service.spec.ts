import { TestBed } from '@angular/core/testing';
import { ErrorsService } from './errors.service';

describe('ErrorsService', () => {
  let errorsService: ErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    errorsService = TestBed.inject(ErrorsService);
  });

  it('toast service should be created', () => {
    expect(errorsService).toBeTruthy();
  });
});
