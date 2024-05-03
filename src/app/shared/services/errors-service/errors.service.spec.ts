import { TestBed } from '@angular/core/testing';
import { ErrorsService } from './errors.service';
import { ToastService } from '../toast-service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorsService', () => {
  let errorsService: ErrorsService;
  const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsService, { provide: ToastService, useValue: toastServiceSpy }],
    });
    errorsService = TestBed.inject(ErrorsService);
  });

  it('errors service should be created', () => {
    expect(errorsService).toBeTruthy();
  });

  it('handleError should call showToast from ToastsService once', () => {
    //use spyOn()
    // const fakeError = new HttpErrorResponse({ status: 400, error: { error: { message: '!!' } } });
    // const toastService = new ToastService();
    // spyOn(toastService, 'showToast');
    // const errorService = new ErrorsService(toastService);
    // const res = errorService.handleError(fakeError);
    // expect(toastService.showToast).toHaveBeenCalled();

    //use createSpyObj without beforeeach declaration
    // const fakeError = new HttpErrorResponse({ status: 400, error: { error: { message: '!!' } } });
    // const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);
    // const errorService = new ErrorsService(toastServiceSpy);
    // errorService.handleError(fakeError);
    // expect(toastServiceSpy.showToast).toHaveBeenCalled();
    // expect(toastServiceSpy.showToast.calls.count()).toBe(1);

    const fakeError = new HttpErrorResponse({
      status: 400,
      error: { error: { message: 'some error' } },
    });
    errorsService.handleError(fakeError);
    expect(toastServiceSpy.showToast).toHaveBeenCalled();
    expect(toastServiceSpy.showToast.calls.count()).toBe(1);
  });
});
