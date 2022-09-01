import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { TokenService } from './services/token.service';
import { UserMlService } from './services/user-ml.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lab-store';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private userMlService: UserMlService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    // Verifico si existe un token para recargar el perfil
    const token = this.tokenService.getItem('token');
    if (token) {
      // Necesitamos que se ejecute el subscribe
      zip(
        this.authService.getProfile(),
        this.userMlService.getApiUserMl(),
        this.settingsService.getSettings()
      ).subscribe();
    }
  }
}
