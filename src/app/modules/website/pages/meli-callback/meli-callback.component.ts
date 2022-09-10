import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthMl } from '@models/index';
import { AuthService } from 'app/services/auth.service';

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
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      this.state = params['state'];
    });
    const nickname = this.state.split('-')[0];

    // this.authService.createUserMl(this.code, nickname).subscribe({
    //   next: (userMl) => {
    //     this._snackBar.open(
    //       `Usuario ${userMl.nickname} autorizado en Mercado Libre!`,
    //       'Cerrar',
    //       {
    //         duration: 3000,
    //         horizontalPosition: 'end',
    //         verticalPosition: 'top',
    //       }
    //     );
    //     this.router.navigate(['cms/dashboard']);
    //   },
    //   error: (err: string) => {
    //     console.log('ERRORRRRRRR', err);
    //     // this._snackBar.open(
    //     //   'El nickname no coincide con el usuario logueado en ML',
    //     //   'Cerrar',
    //     //   {
    //     //     duration: 3000,
    //     //     horizontalPosition: 'end',
    //     //     verticalPosition: 'top',
    //     //   }
    //     // );
    //     this.loading = false;
    //   },
    // });
  }
}
