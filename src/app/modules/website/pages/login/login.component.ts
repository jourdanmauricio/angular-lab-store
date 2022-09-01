import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private message: MessageService
  ) {
    this.form = this.fb.group({
      email: ['admin@integriprod.com', [Validators.required, Validators.email]],
      password: ['integriprod', Validators.required],
    });
  }

  ngOnInit(): void {
    // Verifico si existe un token para recargar el perfil
    const token = this.tokenService.getItem('token');
    // Si hay Token se encuentra logueado, redirect
    if (token) {
      this.authService.getProfile().subscribe((res) => {
        if (res.role === 'admin' || res.role === 'superadmin') {
          this.router.navigate(['cms']);
        } else {
          this.router.navigate(['home']);
        }
      });
    }
  }

  login() {
    this.loading = true;
    const email = this.form.value.email;
    const password = this.form.value.password;
    console.log(email, password);
    // dispatch acction
    this.authService.loginAndGetProfile(email, password).subscribe({
      next: (user) => {
        console.log('user', user);
        this.message.showMsg('Bienvenido!', 'info');
        this.router.navigate(['home']);
      },
      error: () => {
        this.error();
      },
    });
  }

  error() {
    this._snackBar.open('Usuario o contraseña inválido', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
    this.loading = false;
    this.form.reset();
  }
}
