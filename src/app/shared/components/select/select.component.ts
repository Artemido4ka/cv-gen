import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { tap } from 'rxjs';
import { OptionType } from 'src/app/modules/components-examples/component-examples/component-examples.component';
import { ERRORS } from '../../constants/errors';


@Component({
  selector: 'cv-gen-newselect',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: OptionType[];
  @Input() isMultiple: boolean;
  @Input() label: string;
  @Input() placeholder: string;

  onChange: (val: OptionType[] | OptionType) => void;
  onTouch: () => void;
  control = new FormControl();

  errorMessages: Record<string, string> = ERRORS;

  public get showError(): boolean | null {
    if (!this.ngControl) return false;
    const { dirty, touched, invalid } = this.ngControl;
    return invalid && (dirty || touched);
  }

  constructor(@Self() @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap(val => {
          if (this.onChange && this.onTouch) {
            this.onChange(val);
            this.onTouch();
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    if (this.ngControl.control) {
      const validators = this.ngControl.control.validator;
      this.control.setValidators(validators);
    }
  }

  writeValue(value: OptionType[] | OptionType): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
