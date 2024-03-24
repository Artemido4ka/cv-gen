import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ERRORS } from '../../constants/errors';
import { TranslateModule } from '@ngx-translate/core';
import { FormatTranslationPipe } from '../../pipes/format-translation.pipe';

@Component({
  selector: 'cv-gen-error-message',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormatTranslationPipe],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input() errors: Record<string, string> | null;
  @Input() showError: boolean | null;
  @Input() translationPass: string;

  // errorMessages: Record<string, string> = ERRORS;

  // constructor(translate: TranslateService) {

  // }
}
