import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { LocalStorageService } from './services/local-storage.service';
import { UsersService } from './services/users.service';
import { Store } from '@ngxs/store';
import { LoginRequestSuccess } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lab-store';

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store,
    private usersService: UsersService,
    private settingsService: SettingsService // private store: Store<any>
  ) {}

  ngOnInit() {
    // Verifico si existe un token para recargar el perfil
    const token = this.localStorageService.getItem('token');

    if (token) {
      this.store.dispatch(new LoginRequestSuccess(token)).subscribe();
    }

    //   this.store.dispatch(setToken({ token: { access_token: token } }));
    //   zip(
    //     this.usersService.getApiUserMl()
    //     // this.settingsService.getSettings()
    //   ).subscribe();
  }
}
