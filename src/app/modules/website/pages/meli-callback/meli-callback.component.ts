import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { AuthMl } from 'src/app/models/ML/authMl.model';
import { AuthMlService } from 'src/app/services-ml/auth-ml.service';
import { UserMlService } from 'src/app/services-ml/user-ml.service';
import { User } from 'src/app/models/user.model';
import { createUseMlDto, UserMl } from 'src/app/models/ML/userMl.model';

@Component({
  selector: 'app-meli-callback',
  templateUrl: './meli-callback.component.html',
  styleUrls: ['./meli-callback.component.scss'],
})
export class MeliCallbackComponent implements OnInit {
  loading = true;
  code = '';
  state = '';
  credentials!: AuthMl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authMlService: AuthMlService,
    private userMlService: UserMlService,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      this.state = params['state'];
    });
    console.log(this.code, this.state);
    const nickname = this.state.split('-')[0];

    this.authMlService
      .changeCodeForToken(this.code)
      .pipe(
        switchMap((res) => {
          this.credentials = res;
          console.log('credentials ML', this.credentials);
          let headers = new HttpHeaders();
          headers = headers.set('content-type', 'application/json');
          headers = headers.set(
            'Authorization',
            `Bearer ${this.credentials.access_token}`
          );
          return this.userMlService.getUserMl(res.user_id);
        }),
        switchMap((resUserMl) => {
          if (nickname !== resUserMl.nickname) {
            this._snackBar.open(
              'El nickname no coincide con el usuario logueado en ML',
              'Cerrar',
              {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              }
            );
            this.loading = false;
            return 'Error';
          }
          this.tokenService.saveItem('tokenMl', this.credentials.access_token);
          this.tokenService.saveItem(
            'refreshTokenMl',
            this.credentials.refresh_token
          );
          const userMl: createUseMlDto = {
            id: resUserMl.id,
            nickname: resUserMl.nickname,
            permalink: resUserMl.permalink,
            access_token: this.credentials.access_token,
            token_type: this.credentials.token_type,
            expires_in: this.credentials.expires_in,
            scope: this.credentials.scope,
            refresh_token: this.credentials.refresh_token,
            site_id: resUserMl.site_id,
          };
          console.log('userML', userMl);
          return this.userMlService.createUserMl(userMl);
        })
      )
      .subscribe((userMl) => {
        this._snackBar.open(
          `Usuario ${userMl} autorizado en Mercado Libre!`,
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          }
        );
        this.router.navigate(['cms/dashboard']);
      });
    // .subscribe((res) => {
    //   this.credentials = res;
    //   console.log('credentials ML', this.credentials);
    //   let headers = new HttpHeaders();
    //   headers = headers.set('content-type', 'application/json');
    //   headers = headers.set(
    //     'Authorization',
    //     `Bearer ${this.credentials.access_token}`
    //   );
    //   this.userMlService.getMlUser(res.user_id).subscribe((userMl) => {
    //     console.log('userML', userMl);
    //     if (nickname !== userMl.nickname) {
    //       this._snackBar.open(
    //         'El nickname no coincide con el usuario logueado en ML',
    //         'Cerrar',
    //         {
    //           duration: 3000,
    //           horizontalPosition: 'end',
    //           verticalPosition: 'top',
    //         }
    //       );
    //     } else {
    //       this.tokenService.saveItem(
    //         'tokenMl',
    //         this.credentials!.access_token
    //       );
    //       this.tokenService.saveItem(
    //         'refreshTokenMl',
    //         this.credentials!.refresh_token
    //       );
    //       this._snackBar.open(
    //         'Usuario autorizado en Mercado Libre!',
    //         'Cerrar',
    //         {
    //           duration: 3000,
    //           horizontalPosition: 'end',
    //           verticalPosition: 'top',
    //         }
    //       );
    //       // post MLuser
    //       // id: 652092206
    //       // nickname: "TESTL3VLZH0R"
    //       // permalink: "http://perfil.mercadolibre.com.ar/TESTL3VLZH0R"
    //       // access_token: xxxxx
    //       // refres_token: xxxxx
    //       this.router.navigate(['cms/dashboard']);
    //     }
    //   });
    // });

    // const dataCredentials = await replaceCode(code);

    //

    // .pipe(
    //   tap((response) =>
    //     this.tokenService.saveItem('tokenMl', response.access_token)
    //   )
    // )
    // .pipe(
    //   tap((response) =>
    //     this.tokenService.saveItem('refreshTokenMl', response.access_token)
    //   )
    // );
  }
}
