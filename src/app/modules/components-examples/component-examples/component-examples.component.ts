import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export type OptionType = {
  [key: string]: number | string;
  id?: number;
  name?: string;
  abbrev?: string;
};

interface TableElement {
  id: number;
  name: string;
  surName: string;
  email: string;
}

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

  //-------------------TEXT FORMS-------------------------------
  textform = this.fb.group({
    userName: ['', [requiredValidator('inputIsRequired', 'shared')]],
    textarea: ['', [requiredValidator('textareaIsRequired', 'shared')]],
  });

  onTextSubmit(): void {
    console.log(this.textform, 'textform');
    console.log('Submitted !', this.textform.value);
  }
  //-------------------SELECT FORMS-------------------------------
  testOptions = [
    { id: 1, name: 'Arizona', abbrev: 'AZ' },
    { id: 2, name: 'California', abbrev: 'CA' },
    { id: 3, name: 'Colorado', abbrev: 'CO' },
    { id: 4, name: 'New York', abbrev: 'NY' },
    { id: 5, name: 'Pennsylvania', abbrev: 'PA' },
  ];

  selectForm = this.fb.group({
    selectedOption: ['', [requiredValidator('selectIsRequired', 'shared')]],
    multiSelectedOptions: [[], [requiredValidator('selectIsRequired', 'shared')]],
  });

  onSelectSubmit(): void {
    console.log(this.selectForm, 'selectForm');
    console.log('Submitted !', this.selectForm.value);
  }
  //--------------AUTOCOMPLETE FORMS-------------------------------

  autocompleteTestOptions = ['apple', 'orange', 'cherry'];

  autocompleteForm = this.fb.group({
    textValue: ['', [requiredValidator('selectIsRequired', 'shared')]],
  });
  onAutoCompleteSubmit(): void {
    console.log(this.autocompleteForm, 'autocompleteForm');
    console.log('Submitted !', this.autocompleteForm.value);
  }
  //--------------AUTOCOMPLETE WITH SELECT FORMS----------------------

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

  //-------------------------------TABLE-------------------------------
  TABLE_DATA: TableElement[] = [
    { id: 1, name: 'name1', surName: 'Test1', email: 'test@mail.com1' },
    { id: 2, name: 'Yeugenia2', surName: 'Test2', email: 'test@mail.com2' },
    { id: 3, name: 'Yeugenia3', surName: 'Test3', email: 'test@mail.com3' },
    { id: 4, name: 'Yeugenia4', surName: 'Test4', email: 'test@mail.com4' },
    { id: 5, name: 'Yeugenia5', surName: 'Test5', email: 'test@mail.com5' },
    { id: 6, name: 'Yeugenia6', surName: 'Test6', email: 'test@mail.com6' },
    { id: 7, name: 'Yeugenia7', surName: 'Test7', email: 'test@mail.com7' },
    { id: 8, name: 'Yeugenia8', surName: 'Test8', email: 'test@mail.com8' },
    { id: 9, name: 'Yeugenia9', surName: 'Test9', email: 'test@mail.com9' },
    { id: 10, name: 'Yeugenia10', surName: 'Test10', email: 'test@mail.com10' },
    { id: 11, name: 'Yeugenia11', surName: 'Test11', email: 'test@mail.com11' },
    { id: 12, name: 'Yeugenia12', surName: 'Test12', email: 'test@mail.com12' },
    { id: 13, name: 'Yeugenia13', surName: 'Test13', email: 'test@mail.com13' },
  ];

  columns = [
    {
      columnDef: 'id',
      header: 'No.',
      cell: (element: TableElement) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: TableElement) => `${element.name}`,
    },
    {
      columnDef: 'surName',
      header: 'Last Name',
      cell: (element: TableElement) => `${element.surName}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: TableElement) => `${element.email}`,
    },
  ];

  tableData = new MatTableDataSource(this.TABLE_DATA);

  linkUrl = '/home/projects';
}
