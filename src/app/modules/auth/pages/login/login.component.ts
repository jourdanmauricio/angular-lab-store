import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'app/services/message.service';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Store } from '@ngrx/store';
import { login, setToken } from 'app/state/actions/user.actions'; // loginSuccess
import { loading } from 'app/state/actions/application.actions';
import {
  getErrorMessage,
  selectLoading,
} from 'app/state/selectors/application.selector';
import { Observable } from 'rxjs';
import { getUser } from 'app/state/selectors/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  loading$: Observable<boolean> = new Observable();
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private message: MessageService,
    private store: Store<any>,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['admin@integriprod.com', [Validators.required, Validators.email]],
      password: ['integriprod', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.store.select(getErrorMessage).subscribe((error) => {
      if (error.length > 0) this.message.showMsg(error, 'error');
    });

    this.store.select(getUser).subscribe((user) => {
      if (user?.id) {
        this.message.showMsg('Bienvenido!', 'success');
        if (user!.role === 'admin' || user!.role === 'superadmin') {
          this.router.navigate(['cms']);
        } else {
          this.router.navigate(['home']);
        }
      }
    });

    const token = this.localStorageService.getItem('token');
    if (token) {
      // this.store.dispatch(loginSuccess({ token: { access_token: token } }));
      this.store.dispatch(setToken({ token: { access_token: token } }));
    }
  }

  login() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(loading({ status: true }));
    this.store.dispatch(login({ username: email, password: password }));
  }
}
