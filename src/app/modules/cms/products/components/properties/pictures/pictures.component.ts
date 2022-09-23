import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { IPicture } from '@models/IPicture';
import { Store } from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { SettingsState } from 'app/store/settings/settings.state';
import { map } from 'rxjs';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss'],
})
export class PicturesComponent implements OnInit {
  settingsPic!: IPicture[];
  prodPictures!: IPicture[];

  constructor(private store: Store, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.store.select(SettingsState.settingsPictures).subscribe((pictures) => {
      this.settingsPic = JSON.parse(JSON.stringify(pictures));
    });

    this.store.select(CurrentProdState.prodPictures).subscribe((pictures) => {
      if (pictures) {
        this.prodPictures = JSON.parse(JSON.stringify(pictures));
      }
    });
  }

  drop(event: CdkDragDrop<IPicture[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // transferArrayItem(
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updatePictures();
  }

  deleteImg(id: string) {
    const index = this.prodPictures.findIndex((pic) => pic.id === id);
    this.prodPictures.splice(index, 1);
    this.updatePictures();
  }

  updatePictures() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'pictures',
        value: this.prodPictures,
      })
    );
  }

  onAddImage(picture: IPicture) {
    this.prodPictures.unshift(picture);
    this.updatePictures();
  }
}
