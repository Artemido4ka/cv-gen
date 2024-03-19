import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ERRORS } from 'src/app/shared/constants/errors';

export type OptionType = {
  id: number;
  name: string;
  abbrev: string;
};

export function requiredValidator(name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = Validators.required(control);
    return forbidden ? { [name]: true } : null;
  };
}

@Component({
  selector: 'cv-gen-component-examples',
  templateUrl: './component-examples.component.html',
  styleUrls: ['./component-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentExamplesComponent {
  constructor(private fb: FormBuilder) {}

  textform = this.fb.group({
    userName: ['', [requiredValidator('inputIsRequired')]],
    textarea: ['textarea text', [Validators.required]],
  });

  onTextSubmit(): void {
    console.log(this.textform, 'textform');
    console.log('Submitted !', this.textform.value);
  }

  testOptions = [
    { id: 1, name: 'Arizona', abbrev: 'AZ' },
    { id: 2, name: 'California', abbrev: 'CA' },
    { id: 3, name: 'Colorado', abbrev: 'CO' },
    { id: 4, name: 'New York', abbrev: 'NY' },
    { id: 5, name: 'Pennsylvania', abbrev: 'PA' },
  ];

  selectForm = this.fb.group({
    selectedOption: [this.testOptions[0], [Validators.required]],
    // options: [this.testOptions],
  });

  onSelectSubmit(): void {
    console.log(this.selectForm, 'selectForm');
    console.log('Submitted !', this.selectForm.value);
  }
}
