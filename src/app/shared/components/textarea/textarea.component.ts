import { ChangeDetectionStrategy, Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cv-gen-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true },
  ],
  imports: [ReactiveFormsModule],
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  onChange: (val: string) => void;
  onTouch: () => void;
  control = new FormControl();

  ngOnInit(): void {
    this.control.valueChanges.subscribe(val => {
      if (this.onChange) {
        this.onChange(val);
      }
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
