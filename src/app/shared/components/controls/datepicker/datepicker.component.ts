import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BaseControlDirective } from '../../../directives/base-control.directive';
import { LabelComponent } from '../../label/label.component';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cv-gen-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    LabelComponent,
    ErrorMessageComponent,
    TranslateModule,
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent extends BaseControlDirective<Date> {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id = 'datepickerId';
}
