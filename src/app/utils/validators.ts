import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static matchPasswords(control: AbstractControl) {
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;
    let currentErrors = control.get('confirmPassword')?.errors;
    const confirmControl = control.get('confirmPassword');

    if (compare(password, confirmPassword)) {
      confirmControl?.setErrors({ ...currentErrors, not_matching: true });
    } else {
      removeFormControlError(confirmControl!, 'not_matching');
    }
  }
  static validDocumentType(control: AbstractControl) {
    const values: string[] = ['DNI', 'LE', 'CUIT', 'CUIL', 'LC'];
    const value = control.value;
    if (!values?.includes(value)) {
      return { document_type_invalid: true };
    }
    return null;
  }
}

function removeFormControlError(control: AbstractControl, errorName: string) {
  if (control?.errors && control?.errors[errorName]) {
    delete control.errors[errorName];
    if (Object.keys(control.errors).length === 0) {
      control.setErrors(null);
    }
  }
}

function compare(password: string, confirmPassword: string) {
  return password !== confirmPassword && confirmPassword !== '';
}
