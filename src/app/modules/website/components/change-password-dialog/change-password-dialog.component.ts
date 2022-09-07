import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyValidators } from 'src/app/utils/validators';
import { UsersService } from 'src/app/services/users.service';
import { UpdatePassDto, User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/state/selectors/user.selector';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
  form: FormGroup;
  hideOldPassword = true;
  hidePassword = true;
  hideConfirmPassword = true;
  user: User | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private _snackBar: MatSnackBar,
    private store: Store<any>
  ) {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: MyValidators.matchPasswords,
      }
    );
  }

  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => (this.user = user));
  }

  changePassword() {
    this.loading = true;

    const data: UpdatePassDto = {
      id: this.user!.id,
      email: this.user!.email,
      password: this.form.value.oldPassword,
      newPassword: this.form.value.password,
    };

    this.usersService.changePassword(this.user!.id, data).subscribe({
      next: () => {
        this._snackBar.open('Constraseña modificada', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.dialogRef.close();
      },
      error: (err) => {
        this._snackBar.open(err, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.loading = false;
      },
    });
  }

  get oldPasswordValue() {
    return this.form.get('oldPassword');
  }

  get passwordValue() {
    return this.form.get('password');
  }

  get confirmPasswordValue() {
    return this.form.get('confirmPassword');
  }
}
