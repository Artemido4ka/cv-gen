import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastService } from '../../services/toast-service/toast.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cv-gen-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toastTrigger', [
      transition(':enter', [
        style({ transform: 'translateY(-500%)' }),
        animate('900ms ease-out', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('900ms ease-in-out', style({ transform: 'translateY(-500%)' })),
      ]),
    ]),
  ],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  closeToast(toastId: number): void {
    this.toastService.closeToast(toastId);
  }
}
