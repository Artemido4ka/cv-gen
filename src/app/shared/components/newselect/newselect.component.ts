import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { OptionType } from 'src/app/modules/components-examples/component-examples/component-examples.component';
import { ERRORS } from '../../constants/errors';

@Component({
  selector: 'cv-gen-newselect',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './newselect.component.html',
  styleUrls: ['./newselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewselectComponent implements ControlValueAccessor, OnInit {
  private _destroy$ = new Subject<void>();
  @Input() options: OptionType[];
  @Input() isMultiple: boolean;

  onChange: (val: OptionType[] | OptionType) => void;
  onTouch: () => void;
  control = new FormControl();

  errorMessages: Record<string, string> = ERRORS;

  public get showError(): boolean | null {
    if (!this.ngControl) return false;
    const { dirty, touched, invalid } = this.ngControl;
    return invalid && (dirty || touched);
  }

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        tap(val => {
          if (this.onChange) {
            this.onChange(val);
          }
        })
      )
      .subscribe();
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
