import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cv-gen-error-message',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input() errors: Record<string, string> | null;
  @Input() showError: boolean | null;
  @Input() translationPass: string;
}
