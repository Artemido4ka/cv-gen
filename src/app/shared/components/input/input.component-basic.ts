import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'cv-gen-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // с помощью этого сюда можно отправить formControl или formControlname
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  imports: [ReactiveFormsModule],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  onChange: any;
  onTouch: any;
  control = new FormControl();

  constructor(private readonly changeDetector: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.control.valueChanges.subscribe(val => {
      console.log(this.control, 'control');
      if (this.onChange) {
        this.onChange(val);
      }
    });
  }

  //приходит value из родительского контролла
  writeValue(value: string): void {
    // this.changeDetector.detectChanges();
    this.control.setValue(value);
  }
  //1 раз вызывается, здесь происходит регистрация, крч при вызове onChange(val) в дальнейшем, в родительский control будет прилетать val
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  //1 раз вызывается, здесь происходит регистрация, крч при вызове onTouch() в дальнейшем, в родительский control будет прилетать touched true
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }
}
