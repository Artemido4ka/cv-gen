import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { BaseControlDirective } from '../../../directives/base-control.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../../label/label.component';

@Component({
  selector: 'cv-gen-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    ErrorMessageComponent,
    LabelComponent,
  ],
})
export class TextareaComponent extends BaseControlDirective<string> {
  @Input() label: string;
  @Input() placeholder: string;
}
