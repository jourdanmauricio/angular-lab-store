import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
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
    private userMlService: UserMlService
  ) {}

  ngOnInit() {
    // Verifico si existe un token para recargar el perfil
    const token = this.tokenService.getItem('token');
    if (token) {
      // Necesitamos que se ejecute el subscribe
      this.authService.getProfile().subscribe();
      this.userMlService.getApiUserMl().subscribe();
    }
  }
}
