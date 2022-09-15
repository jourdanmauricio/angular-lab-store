import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Picture } from '@models/index';
import { Settings } from '@models/index';
import { User } from '@models/index';
import { SettingsService } from 'app/services/settings.service';
import { MessageService } from 'app/services/message.service';
import { Store } from '@ngxs/store';
// import { getUser } from 'app/state/selectors/user.selector';
// import { getSettings } from 'app/state/selectors/settings.selectors';
// import { updateSettings } from 'app/state/actions/settings.actions';
// import { loading } from 'app/state/actions/application.actions';
import { Observable } from 'rxjs';
// import { selectLoading } from 'app/state/selectors/application.selector';

@Component({
  selector: 'app-conf-prod',
  templateUrl: './conf-prod.component.html',
  styleUrls: ['./conf-prod.component.scss'],
})
export class ConfProdComponent implements OnInit {
  user: User | null = null;
  settings!: Settings;
  form: FormGroup;
  loading$: Observable<any> = new Observable();
  pictures: Picture[] = [];

  constructor(
    private settingsService: SettingsService,
    private fb: FormBuilder,
    private message: MessageService,
    private store: Store
  ) {
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
    // this.loading$ = this.store.select(selectLoading);
    // this.store.select(getUser).subscribe((user) => (this.user = user));
    // this.store.select(getSettings).subscribe((data) => {
    //   this.settings = data;
    //   this.form.patchValue(this.settings);
    //   this.pictures = JSON.parse(JSON.stringify(data.pictures));
    // });
  }

  addPicture(picture: Picture) {
    this.pictures = [...this.pictures, picture];
  }

  delPicture(name: string) {
    const pics = JSON.parse(JSON.stringify(this.pictures));
    const index = pics.findIndex((pic: Picture) => pic.name === name);
    if (index !== -1) pics.splice(index, 1);
    this.pictures = pics;
  }

  handleChange() {
    const data: Settings = {
      status: this.form.value.status,
      hintSku: this.form.value.hintSku,
      pictures: this.pictures,
      condition: this.form.value.condition,
      listing_type_id: this.form.value.listing_type_id,
      price_percent_ml: this.form.value.price_percent_ml,
      price_percent_web: this.form.value.price_percent_web,
    };

    // Dispatch
    // this.store.dispatch(loading({ status: true }));
    // this.store.dispatch(
    //   updateSettings({ user_id: this.user!.id, settings: data })
    // );
  }
}
