import { ErrorMessageComponent } from './../error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cv-gen-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, ErrorMessageComponent],
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;

  onChange: (val: string) => void;
  onTouch: () => void;
  control = new FormControl();

  constructor(@Self() @Optional() public ngControl: NgControl) {
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

  public get showError(): boolean | null {
    const { dirty, touched, invalid } = this.control;
    return invalid && (dirty || touched);
  }

  ngOnInit(): void {
    if (this.ngControl.control) {
      const validators = this.ngControl.control.validator;
      this.control.setValidators(validators);
    }
  }

  writeValue(value: string): void {
    this.control.setValue(value);
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
