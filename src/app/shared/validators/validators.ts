import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function customValidator(
  validatorFn: ValidatorFn,
  messageRoot: string,
  errorKey = 'errorMessage'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = validatorFn(control);
    return forbidden ? { [errorKey]: messageRoot } : null;
  };
}

export const projectRequiredFieldValidator = (translationKey: string) =>
  customValidator(
    Validators.required,
    `home.project.${translationKey}.errors.required`,
    'required'
  );
