import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

//old validator
export function requiredValidator(messageRoot: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = Validators.required(control);
    return forbidden ? { required: messageRoot } : null;
  };
}

//old validator
export function positiveNumberValidator(messageRoot: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const forbidden = value < 1;
    return forbidden ? { required: messageRoot } : null;
  };
}

export function customValidator(
  validatorFn: ValidatorFn,
  messageRoot: string,
  errorKey = 'errorMessage'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    //TODO: delete this if ok
    // const forbidden = !!Object.keys(validatorFn(control)).length;
    // return forbidden ? { [errorKey]: messageRoot } : null;
    const forbidden = validatorFn(control);
    return forbidden ? { [errorKey]: messageRoot } : null;
  };
}
