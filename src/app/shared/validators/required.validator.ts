import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function requiredValidator(messageRoot: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = Validators.required(control);
    return forbidden ? { required: messageRoot } : null;
  };
}
