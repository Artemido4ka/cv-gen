import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { customValidator, projectRequiredFieldValidator } from './validators';

describe('customValidator', () => {
  const mockValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control.value === 'test' ? { forbidden: true } : null;
  };

  it('should return null if validatorFn returns null', () => {
    const validator = customValidator(mockValidatorFn, 'Message');

    const result = validator(new FormControl('valid'));

    expect(result).toBeNull();
  });

  it('should return an object with the errorKey if validatorFn returns an error', () => {
    const validator = customValidator(mockValidatorFn, 'Message', 'customError');

    const result = validator(new FormControl('test'));

    expect(result).toEqual({ customError: 'Message' });
  });

  it('should return the validation error object if the control value is empty', () => {
    const translationKey = 'translationKey';
    const control = new FormControl('');

    const result = projectRequiredFieldValidator(translationKey)(control);

    expect(result).toEqual({
      required: 'home.project.translationKey.errors.required',
    });
  });
});
