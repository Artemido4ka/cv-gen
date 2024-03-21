import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnInit,
  Optional,
  Self,
  inject,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { startWith, tap } from 'rxjs';
import { OptionType } from 'src/app/modules/components-examples/component-examples/component-examples.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'cv-gen-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor, OnInit, DoCheck {
  @Input() options: OptionType[];
  @Input() isMultiple: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() optionValue: keyof OptionType = 'id';
  @Input() optionTitle: keyof OptionType = 'name';

  onChange: (val: OptionType[] | OptionType) => void;
  onTouch: () => void;
  control = new FormControl();

  private readonly cdRef = inject(ChangeDetectorRef);

  constructor(private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    if (this.ngControl.control?.parent) {
      this.control.setParent(this.ngControl.control?.parent);
    }
  }

  // ngOnInit(): void {
  //   // console.log(this.control.errors, '1111');
  //   // console.log(this.ngControl.control.errors, '222');
  //   // if (this.ngControl.control) {
  //   //   const validators = this.ngControl.control.validator;
  //   //   this.control.setValidators(validators);
  //   // }
  //   this.ngControl.valueChanges?.pipe(untilDestroyed(this), startWith('')).subscribe(
  //     () => {
  //       if (this.ngControl.control.errors !== this.control.errors) {
  //         this.control.setErrors(this.ngControl.control?.errors);
  //       }
  //       this.cdRef.markForCheck();
  //       console.log(this.control.invalid, '1111');
  //       // console.log(this.ngControl.control.errors, '222');
  //     }
  //     // this.control.errors = this.ngControl.control?.errors
  //     // if() {}
  //   );

  //   this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
  //     if (this.onChange && this.onTouch) {
  //       this.onChange(val);
  //       this.onTouch();
  //     }
  //   });
  // }

  public ngOnInit(): void {
    this.initErrors();
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

  writeValue(value: OptionType[] | OptionType): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  protected initErrors(): void {
    this.control.setErrors(this.ngControl.control!.errors);
  }

  protected initControlValueChanges(): void {
    this.control.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: OptionType[] | OptionType) => {
        // this.onChange(value[this.optionValue]);
        this.onChange(value);
        // console.log(value);
      });
  }
}
