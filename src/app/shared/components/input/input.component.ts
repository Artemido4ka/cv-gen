import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'cv-gen-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true },
  ],
  imports: [ReactiveFormsModule, CommonModule],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;

  onChange: (val: string) => void;
  onTouch: () => void;
  control = new FormControl();
  private _destroy$ = new Subject<void>();

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.control = this.injector.get(FormGroupDirective).getControl(ngControl);
    } else {
      this.control = (ngControl as FormControlDirective).form as FormControl;
    }

    this.control.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap(this.onChange)
      )
      .subscribe(() => {
        this.control?.markAsUntouched();
      });
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
