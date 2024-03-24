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

export function requiredValidator(name: string, messageRoot: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = Validators.required(control);
    return forbidden ? { [name]: messageRoot } : null;
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
    userName: ['', [requiredValidator('inputIsRequired', 'shared')]],
    textarea: ['', [requiredValidator('textareaIsRequired', 'shared')]],
  });

  onTextSubmit(): void {
    console.log(this.textform, 'textform');
    console.log('Submitted !', this.textform.value);
  }
  // SELECT FORMS
  testOptions = [
    { id: 1, name: 'Arizona', abbrev: 'AZ' },
    { id: 2, name: 'California', abbrev: 'CA' },
    { id: 3, name: 'Colorado', abbrev: 'CO' },
    { id: 4, name: 'New York', abbrev: 'NY' },
    { id: 5, name: 'Pennsylvania', abbrev: 'PA' },
  ];

  simpleSelectForm = this.fb.group({
    selectedOption: [this.testOptions[0], [Validators.required]],
    // options: [this.testOptions],
  });

  onSimpleSelectSubmit(): void {
    console.log(this.simpleSelectForm, 'simple selectForm');
    console.log('Submitted !', this.simpleSelectForm.value);
  }
  //SELECT FORMS
  selectForm = this.fb.group({
    selectedOption: ['', [requiredValidator('selectIsRequired', 'shared')]],
    multiSelectedOptions: [[], [requiredValidator('selectIsRequired', 'shared')]],
  });

  onSelectSubmit(): void {
    console.log(this.selectForm, 'selectForm');
    console.log('Submitted !', this.selectForm.value);
  }
  //AUTOCOMPLETE FORMS
  autocompleteTestOptions = ['apple', 'orange', 'cherry'];

  autocompleteForm = this.fb.group({
    textValue: ['', [requiredValidator('selectIsRequired', 'shared')]],
  });
  onAutoCompleteSubmit(): void {
    console.log(this.autocompleteForm, 'autocompleteForm');
    console.log('Submitted !', this.autocompleteForm.value);
  }

  //AUTOCOMPLETE WITH SELECT FORMS
  autocompleteSelectForm = this.fb.group({
    multiSelectedOptionsAndNewOptions: [
      [this.autocompleteTestOptions[0]],
      [requiredValidator('selectIsRequired', 'shared')],
    ],
  });
  onAutoCompleteSelectSubmit(): void {
    console.log(this.autocompleteForm, 'autocompleteForm');
    console.log('Submitted !', this.autocompleteForm.value);
  }
}
