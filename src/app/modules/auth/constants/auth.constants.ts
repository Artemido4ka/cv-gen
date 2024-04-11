import { Validators } from '@angular/forms';
import { customValidator } from 'src/app/shared/validators/validators';

export const loginRequiredFieldValidator = (translationKey: string) =>
  customValidator(Validators.required, `auth.login.${translationKey}.errors.required`, 'required');
