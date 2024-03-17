import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cv-gen-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [],
  imports: [ReactiveFormsModule, CommonModule],
})

//Здесь работает, в ngControl есть доступ к errors, возможно их как-то юзать
export class InputComponent implements ControlValueAccessor, OnInit {
  onChange: (val: string) => void;
  onTouch: any;
  control = new FormControl();

  constructor(@Self() @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
