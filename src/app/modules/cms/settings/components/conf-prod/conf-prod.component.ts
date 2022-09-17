import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPicture, ISettingsState } from '@models/index';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingsState } from 'app/store/settings/settings.state';
import { SettingsUpdate } from 'app/store/settings/settings.actions';
import { AuthState } from 'app/store/auth/auth.state';
import { IAuthState } from '@models/index';

@Component({
  selector: 'app-conf-prod',
  templateUrl: './conf-prod.component.html',
  styleUrls: ['./conf-prod.component.scss'],
})
export class ConfProdComponent implements OnInit {
  user!: IAuthState;
  settings!: SettingsState;
  form: FormGroup;
  loading$: Observable<any> = new Observable();
  pictures: IPicture[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      status: [''],
      listing_type_id: [''],
      condition: [''],
      hintSku: [''],
      pictures: [[]],
      price_percent_ml: [''],
      price_percent_web: [''],
    });
  }

  ngOnInit(): void {
    this.store.select(SettingsState).subscribe((settings) => {
      this.form.patchValue(settings);
      this.pictures = JSON.parse(JSON.stringify(settings.pictures));
    });
    this.store.select(AuthState).subscribe((user) => {
      this.user = user;
    });
  }

  addPicture(picture: IPicture) {
    this.pictures = [...this.pictures, picture];
  }

  delPicture(name: string) {
    const pics = JSON.parse(JSON.stringify(this.pictures));
    const index = pics.findIndex((pic: IPicture) => pic.name === name);
    if (index !== -1) pics.splice(index, 1);
    this.pictures = pics;
  }

  handleChange() {
    const data: ISettingsState = {
      status: this.form.value.status,
      hintSku: this.form.value.hintSku,
      pictures: this.pictures,
      condition: this.form.value.condition,
      listing_type_id: this.form.value.listing_type_id,
      price_percent_ml: this.form.value.price_percent_ml,
      price_percent_web: this.form.value.price_percent_web,
    };

    // Dispatch
    console.log('this.user.id', this.user.id);
    if (this.user.id !== null)
      this.store
        .dispatch(new SettingsUpdate({ userId: this.user.id, settings: data }))
        .subscribe();
  }
}
