import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ErrorMessageComponent } from '../error-message/error-message.component';
import { BaseControlDirective } from '../../directives/base-control.directive';

type OptionType = {
  [key: string]: number | string;
  id?: number;
  name?: string;
  abbrev?: string;
};

@Component({
  selector: 'cv-gen-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends BaseControlDirective implements OnInit {
  @Input() options: OptionType[];
  @Input() isMultiple: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() optionValue = 'id';
  @Input() optionName = 'name';

  // writeValue(value: OptionType[] | OptionType): void {
  // .subscribe((value: OptionType[] | OptionType) => {
}
