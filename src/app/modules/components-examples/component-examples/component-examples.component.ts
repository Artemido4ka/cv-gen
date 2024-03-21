import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export type OptionType = {
  [key: string]: number | string;
  id?: number;
  name?: string;
  abbrev?: string;
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
    textarea: ['', [requiredValidator('textareaIsRequired')]],
  });

  onTextSubmit(): void {
    console.log(this.textform, 'textform');
    console.log('Submitted !', this.textform.value);
  }

  testOptions = [
    { id1: 1, name1: 'Arizona', abbrev: 'AZ' },
    { id1: 2, name1: 'California', abbrev: 'CA' },
    { id1: 3, name1: 'Colorado', abbrev: 'CO' },
    { id1: 4, name1: 'New York', abbrev: 'NY' },
    { id1: 5, name1: 'Pennsylvania', abbrev: 'PA' },
  ];

  simpleSelectForm = this.fb.group({
    selectedOption: [this.testOptions[0], [Validators.required]],
    // options: [this.testOptions],
  });

  onSimpleSelectSubmit(): void {
    console.log(this.simpleSelectForm, 'simple selectForm');
    console.log('Submitted !', this.simpleSelectForm.value);
  }

  selectForm = this.fb.group({
    selectedOption: ['', [requiredValidator('selectIsRequired')]],
    multiSelectedOptions: [[], [requiredValidator('selectIsRequired')]],
  });

  onSelectSubmit(): void {
    console.log(this.selectForm, 'selectForm');
    console.log('Submitted !', this.selectForm.value);
  }
}
