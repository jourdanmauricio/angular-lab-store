import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { SettingsService } from './services/settings.service';
import { LocalStorageService } from './services/local-storage.service';
import { UsersService } from './services/users.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from './state/actions/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lab-store';

  constructor(
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    private settingsService: SettingsService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    // Verifico si existe un token para recargar el perfil
    const token = this.localStorageService.getItem('token');

    if (token) {
      this.store.dispatch(
        loginSuccess({ token: { access_token: token, loading: true } })
      );

      // Necesitamos que se ejecute el subscribe
      zip(
        // this.usersService.getProfile(),
        this.usersService.getApiUserMl(),
        this.settingsService.getSettings()
      ).subscribe();
    }
  }
}
