import { ChangeDetectionStrategy, Component, Injector, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'cv-gen-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true },
  ],
  imports: [ReactiveFormsModule],
})
// как-будто все работает 
export class InputComponent implements ControlValueAccessor, OnInit {
  onChange: (val: string) => void;
  onTouch: any;
  control = new FormControl();

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    this.control = this.injector.get(FormGroupDirective).getControl(ngControl as FormControlName);
  }

  writeValue(value: string): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
