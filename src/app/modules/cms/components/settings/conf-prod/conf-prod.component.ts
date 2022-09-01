import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Picture } from 'src/app/models/picture.model';
import { Settings } from 'src/app/models/setting.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-conf-prod',
  templateUrl: './conf-prod.component.html',
  styleUrls: ['./conf-prod.component.scss'],
})
export class ConfProdComponent implements OnInit {
  user!: User | null;
  settings!: Settings;
  form: FormGroup;
  loading = false;
  pictures: Picture[] = [];

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private message: MessageService
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
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });

    this.settingsService.settings$.subscribe((data) => {
      this.settings = data;
      this.form.patchValue(this.settings);
      this.pictures = JSON.parse(JSON.stringify(data.pictures));
    });
  }

  addPicture(picture: Picture) {
    this.pictures = [...this.pictures, picture];
  }

  delPicture(name: string) {
    console.log('Delete Pic', name);
    const pics = JSON.parse(JSON.stringify(this.pictures));
    const index = pics.findIndex((pic: Picture) => pic.name === name);
    if (index !== -1) pics.splice(index, 1);
    this.pictures = pics;
  }

  handleChange() {
    this.loading = true;
    const data: Settings = {
      status: this.form.value.status,
      hintSku: this.form.value.hintSku,
      pictures: this.pictures,
      condition: this.form.value.condition,
      listing_type_id: this.form.value.listing_type_id,
      price_percent_ml: this.form.value.price_percent_ml,
      price_percent_web: this.form.value.price_percent_web,
    };

    this.settingsService
      .updateSettings(this.user!.id, data)
      .subscribe((res) => {
        this.message.showMsg('Configuración modificada', 'success');
        this.loading = false;
        // this.router.navigate(['/home']);
      });
  }
}
