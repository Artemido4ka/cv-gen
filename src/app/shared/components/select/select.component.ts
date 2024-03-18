import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { OptionType } from 'src/app/modules/components-examples/component-examples/component-examples.component';
import { Subject, startWith, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'cv-gen-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  private _destroy$ = new Subject<void>();

  @Input() options: OptionType[];
  @Input() selectId = '';

  onChange: (val: OptionType) => void;
  onTouch: () => void;
  control = new FormControl();

  ngOnInit(): void {
    console.log(this.control);
    this.control.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(this.control.value),
        tap(val => {
          if (this.onChange) {
            const selectedOption = this.options.find(option => option.id === Number(val));
            selectedOption && this.onChange(selectedOption);
          }
        })
      )
      .subscribe(() => {
        this.control?.markAsUntouched();
      });
  }

  writeValue(value: OptionType): void {
    this.control.setValue(value.id);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
