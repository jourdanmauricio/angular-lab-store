import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyValidators } from 'src/app/utils/validators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  hide = true;
  hideConfirm = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private usersService: UsersService
  ) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: MyValidators.matchPasswords,
      }
    );
  }

  ngOnInit(): void {}

  get emailValue() {
    return this.form.get('email');
  }

  get passwordValue() {
    return this.form.get('password');
  }

  get confirmPasswordValue() {
    return this.form.get('confirmPassword');
  }

  register() {
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
      role: 'customer',
    };

    this.usersService.create(data).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.error(err);
      },
    });
  }

  error(err: string) {
    this._snackBar.open(err, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
    this.loading = false;
    this.form.reset();
  }
}
