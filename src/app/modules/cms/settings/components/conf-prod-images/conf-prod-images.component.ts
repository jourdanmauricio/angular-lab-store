import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPicture } from '@models/IPicture';
import { Store } from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { SettingsState } from 'app/store/settings/settings.state';
import { map } from 'rxjs';

@Component({
  selector: 'app-conf-prod-images',
  templateUrl: './conf-prod-images.component.html',
  styleUrls: ['./conf-prod-images.component.scss'],
})
export class ConfProdImagesComponent implements OnInit {
  @Input() settingspictures!: IPicture[];
  @Output() updPicture = new EventEmitter<IPicture[]>();

  pictures: IPicture[] = [];
  loading: boolean = false;

  constructor(private store: Store, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.pictures = this.settingspictures;
    console.log('this.settingspictures', this.settingspictures);
  }

  deleteImg(id: string) {
    const index = this.pictures.findIndex((pic) => pic.id === id);
    this.pictures.splice(index, 1);
    this.updatePictures();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pictures, event.previousIndex, event.currentIndex);
    this.updatePictures();
  }

  updatePictures() {
    console.log('this.pictures', this.pictures);
    this.updPicture.emit(this.pictures);
  }

  onAddImage(picture: IPicture) {
    this.pictures.unshift(picture);
    this.updatePictures();
  }
}
