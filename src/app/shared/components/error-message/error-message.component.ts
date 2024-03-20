import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ERRORS } from '../../constants/errors';

@Component({
  selector: 'cv-gen-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input() errors: Record<string, string> | null;
  @Input() showError: boolean | null;

  errorMessages: Record<string, string> = ERRORS;
}
