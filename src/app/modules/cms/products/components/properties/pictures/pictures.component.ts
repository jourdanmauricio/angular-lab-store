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
  files: any[] = [];

  constructor(private store: Store, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.store.select(SettingsState.settingsPictures).subscribe((pictures) => {
      this.settingsPic = JSON.parse(JSON.stringify(pictures));
      console.log('this.settingsPic', this.settingsPic);
    });

    this.store.select(CurrentProdState.prodPictures).subscribe((pictures) => {
      if (pictures) {
        this.prodPictures = JSON.parse(JSON.stringify(pictures));
        console.log('this.varPictures', this.prodPictures);
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

  fileBrowseHandler(e: any) {
    this.files = e.target.files;
    this.getFile();
  }

  getFile() {
    console.log('UPLOAD!!!!!!!!!!!', this.files);
    Array.from(this.files).map((file) => {
      let formData = new FormData();
      formData.append('file', file);
      this.productsService
        .createImage(formData)
        .pipe(
          map((res) => {
            const pict: IPicture = {
              id: res.id,
              name: file.name,
              url: res.variations[0].url,
              size: res.variations[0].size,
              quality: '',
              max_size: res.max_size,
              secure_url: res.variations[0].secure_url,
            };
            return pict;
          })
        )
        .subscribe((resp) => {
          console.log('RESP', resp);
          this.prodPictures.unshift(resp);
          this.updatePictures();
        });
    });
  }

  onFileDropped($event: any) {
    this.files = $event;
    this.getFile();
  }

  updatePictures() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'pictures',
        value: this.prodPictures,
      })
    );
  }
}
