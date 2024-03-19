import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { ERRORS } from '../../constants/errors';

@Component({
  selector: 'cv-gen-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;

  onChange: (val: string) => void;
  onTouch: () => void;
  control = new FormControl();
  private _destroy$ = new Subject<void>();
  errorMessages: Record<string, string> = ERRORS;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        distinctUntilChanged(),
        tap(val => this.onChange(val as string))
      )
      .subscribe();
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
