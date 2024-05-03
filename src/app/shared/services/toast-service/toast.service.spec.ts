import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { TOAST_STATUS } from '../../constants/toasts';

describe('ToastService', () => {
  let toastService: ToastService;

  const fakeToastData = {
    toastId: 1,
    toastMsg: 'test Message',
    toastStatus: TOAST_STATUS.success,
  };
  const { toastId, toastMsg, toastStatus } = fakeToastData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    toastService = TestBed.inject(ToastService);
  });

  it('fill toast array with data', () => {
    toastService.showToast(toastMsg, toastStatus);
    expect(toastService.toastsArray$.getValue()).toEqual([fakeToastData]);
    expect(toastService.toastsCount).toEqual(1);
  });

  it('clear toast array if time paste(> 2s)', fakeAsync(() => {
    toastService.showToast(toastMsg, toastStatus);
    tick(5000);
    expect(toastService.toastsArray$.getValue()).toEqual([]);
    flush();
  }));

  it('closeToast', () => {
    toastService.showToast(toastMsg, toastStatus);
    toastService.closeToast(toastId);
    expect(toastService.getToasts()).toEqual([]);
  });
});
