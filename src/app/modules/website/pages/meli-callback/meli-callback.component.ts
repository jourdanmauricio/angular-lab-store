import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthMl } from 'src/app/models/ML/authMl.model';
import { AuthMlService } from 'src/app/services-ml/auth-ml.service';
import { UserMlService } from 'src/app/services-ml/user-ml.service';

@Component({
  selector: 'app-meli-callback',
  templateUrl: './meli-callback.component.html',
  styleUrls: ['./meli-callback.component.scss'],
})
export class MeliCallbackComponent implements OnInit {
  loading = false;
  code = '';
  state = '';
  credentials: AuthMl | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authMlService: AuthMlService,
    private userMlService: UserMlService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      this.state = params['state'];
    });
    console.log(this.code, this.state);
    const nickname = this.state.split('-')[0];

    this.authMlService.changeCodeForToken(this.code).subscribe((res) => {
      this.credentials = res;
      this.userMlService.getMlUser(res.user_id).subscribe((userMl) => {
        console.log('userML', userMl);
        // if (nickname !== dataMlUser.nickname)
        // throw "No coincide el nickname ingresado con la autorización de Mercado Libre";
      });
    });

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
