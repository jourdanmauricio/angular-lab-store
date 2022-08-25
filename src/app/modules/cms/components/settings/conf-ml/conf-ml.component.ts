import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conf-ml',
  templateUrl: './conf-ml.component.html',
  styleUrls: ['./conf-ml.component.scss'],
})
export class ConfMlComponent implements OnInit {
  loading = false;
  nicknameField = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}

  handleAuth() {
    console.log('Handle', this.nicknameField.value);
    const state =
      this.nicknameField.value + '-' + Math.floor(Math.random() * 1000000);
    const uri = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${environment.ML_APP_ID}&redirect_uri=${environment.FRONT_END_URI}/settings/meli-callbac&state=${state}`;
    window.open(uri);
  }
}
