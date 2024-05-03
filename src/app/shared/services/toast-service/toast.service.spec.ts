import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    toastService = TestBed.inject(ToastService);
  });

  it('toast service should be created', () => {
    expect(toastService).toBeTruthy();
  });
});
