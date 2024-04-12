import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOAST_POSITION } from '../constants/toasts';

type toastType = {
  toastId: number;
  toastMsg: string;
  toastStatus: string;
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastsCount: 0;

  public toastsArray$: BehaviorSubject<toastType[]> = new BehaviorSubject<toastType[]>([]);
  public showToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toastPosition$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public toastStatus$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  showToast(
    toastMsg: string,
    toastStatus: string,
    position = TOAST_POSITION.topRight,
    autoClose = true
  ): void {
    this.showToast$.next(true);
    this.toastPosition$.next(position);

    const toasts = this.getToasts();
    const newToastId = (this.toastsCount += 1);
    toasts.push({ toastId: newToastId, toastMsg, toastStatus });

    this.setToasts(toasts);

    if (!autoClose) return;

    setTimeout(() => {
      this.closeToast(newToastId);
    }, 2000);
  }

  closeToast(toastId: number): void {
    const toasts = this.getToasts();
    toasts.splice(toastId, 1);
    this.setToasts(toasts);
  }

  getToasts(): toastType[] {
    return this.toastsArray$.getValue();
  }

  setToasts(toasts: toastType[]) {
    return this.toastsArray$.next(toasts);
  }
}
