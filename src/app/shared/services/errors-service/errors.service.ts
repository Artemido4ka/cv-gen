import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../toast-service/toast.service';
import { TOAST_STATUS } from '../../constants/toasts';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService implements ErrorHandler {
  constructor(private toastService: ToastService) {}

  handleError(error: HttpErrorResponse): void {
    this.toastService.showToast(error.error.message, TOAST_STATUS.danger);
  }
}
