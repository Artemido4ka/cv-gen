import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { BaseControlDirective } from '../../../directives/base-control.directive';
import { LabelComponent } from '../../label/label.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cv-gen-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ErrorMessageComponent,
    LabelComponent,
    TranslateModule,
  ],
})
export class InputComponent extends BaseControlDirective<string> {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() id = 'inputId';
}
