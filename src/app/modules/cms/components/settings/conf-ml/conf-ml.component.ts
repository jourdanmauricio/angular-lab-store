import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { UsersService } from 'app/services/users.service';
import { UserMl } from '@models/userMl.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-conf-ml',
  templateUrl: './conf-ml.component.html',
  styleUrls: ['./conf-ml.component.scss'],
})
export class ConfMlComponent implements OnInit {
  loading = false;
  nicknameField = new FormControl('', Validators.required);
  userMl: UserMl | null = null;

  constructor(
    private usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usersService.getApiUserMl().subscribe({
      next: (userMl) => {
        this.userMl = userMl;
        this.nicknameField.setValue(userMl.nickname);
        this.nicknameField.disable();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delMlUser() {
    this.usersService.deleteApiUserMl(this.userMl!.id).subscribe({
      next: () => {
        this._snackBar.open('Usuario desvinculado', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.userMl = null;
        this.nicknameField.setValue('');
        this.nicknameField.enable();
      },
      error: (err) => console.log('err', err),
    });
  }

  handleAuth() {
    const state =
      this.nicknameField.value + '-' + Math.floor(Math.random() * 1000000);
    const uri = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${environment.ML_APP_ID}&redirect_uri=${environment.FRONT_END_URI}/meli-callback&state=${state}`;
    window.open(uri);
  }
}
