import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { LoginRequestAttempt } from 'app/store/auth/auth.actions';
import { AuthState } from 'app/store/auth/auth.state';
import { Roles } from '@core/data/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['admin@integriprod.com', [Validators.required, Validators.email]],
      password: ['integriprod', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.select(AuthState.role).subscribe((role) => {
      if (role === Roles.ADMIN || role === Roles.SUPERADMIN)
        return this.router.navigate(['cms']);
      if (role === Roles.CUSTOMER) return this.router.navigate(['home']);
      return;
    });
  }

  login() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store
      .dispatch(new LoginRequestAttempt({ email: email, password: password }))
      .subscribe();
  }
}
