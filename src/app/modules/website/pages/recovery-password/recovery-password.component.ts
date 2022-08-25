import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthChangePasswordDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {
  loading = false;
  form: FormGroup;
  formChangePass: FormGroup;
  token: string | null = null;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['admin@integriprod.com', [Validators.required, Validators.email]],
    });
    this.formChangePass = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: MyValidators.matchPasswords,
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => (this.token = params['token'])
    );
  }

  recovery() {
    this.loading = true;
    console.log('recovery', this.form.value.email);
    this.authService.recoveryPassword(this.form.value.email).subscribe({
      next: () => {
        this._snackBar.open('Email enviado', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.loading = false;
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

  changePassword() {
    console.log('changePass', this.formChangePass);
    this.loading = true;

    const data: AuthChangePasswordDto = {
      token: this.token!,
      newPassword: this.formChangePass.value.password,
    };

    this.authService.changePassword(data).subscribe({
      next: () => {
        this._snackBar.open('Contraseña modificada', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.loading = false;
        this.router.navigate(['/login']);
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

  get emailValue() {
    return this.form.get('email');
  }

  get passwordValue() {
    return this.formChangePass.get('password');
  }

  get confirmPasswordValue() {
    return this.formChangePass.get('confirmPassword');
  }
}
