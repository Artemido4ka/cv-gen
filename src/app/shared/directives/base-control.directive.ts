import { ChangeDetectorRef, Directive, DoCheck, OnInit, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[cvGenBaseControl]',
  standalone: true,
})
export class BaseControlDirective<T> implements ControlValueAccessor, OnInit, DoCheck {
  constructor(private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    // if (this.ngControl.control?.parent) {
    //   this.control.setParent(this.ngControl.control?.parent);
    // }
  }
  private readonly cdRef = inject(ChangeDetectorRef);
  onChange: (val: T) => void;
  onTouch: () => void;
  control = new FormControl();

  public ngOnInit(): void {
    // this.initErrors();
    this.initControlValueChanges();
  }
  public ngDoCheck(): void {
    if (this.ngControl.control?.errors !== this.control.errors) {
      this.initErrors();
    }
    if (this.ngControl.control?.touched) {
      this.control.markAsTouched();
      this.cdRef.markForCheck();
    } else {
      this.control.markAsPristine();
    }
  }

  writeValue(value: T): void {
    this.control.setValue(value);
    // this.cdRef.detectChanges();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  protected initErrors(): void {
    this.control.setErrors(this.ngControl.control.errors);
  }

  protected initControlValueChanges(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((value: T) => {
      this.onChange(value);
    });
  }
}
