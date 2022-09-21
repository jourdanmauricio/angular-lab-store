import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  //transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPicture, IVariation } from '@models/index';
import { Store } from '@ngxs/store';
import { ProductsService } from 'app/services/products.service';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { SettingsState } from 'app/store/settings/settings.state';
import { map } from 'rxjs';

@Component({
  selector: 'app-var-pictures',
  templateUrl: './var-pictures.component.html',
  styleUrls: ['./var-pictures.component.scss'],
})
export class VarPicturesComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl!: ElementRef;

  settingsPic!: IPicture[];
  varPictures!: IPicture[];
  files: any[] = [];
  variation!: IVariation;

  constructor(
    public dialogRef: MatDialogRef<VarPicturesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVariation,
    private store: Store,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.store.select(SettingsState.settingsPictures).subscribe((pictures) => {
      this.settingsPic = JSON.parse(JSON.stringify(pictures));
    });

    this.store
      .select(CurrentProdState.varPictures(this.data.id))
      .subscribe((pictures) => {
        if (pictures) {
          this.varPictures = JSON.parse(JSON.stringify(pictures));
        }
      });

    this.variation = JSON.parse(JSON.stringify(this.data));
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
  }

  deleteImg(id: string) {
    const index = this.varPictures.findIndex((pic) => pic.id === id);
    this.varPictures.splice(index, 1);
  }

  fileBrowseHandler(e: any) {
    this.files = e.target.files;
    this.getFile();
  }

  onFileDropped($event: any) {
    this.files = $event;
    this.getFile();
  }

  getFile() {
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
          this.varPictures.unshift(resp);
        });
    });
  }

  updateVarPictures() {
    this.variation.picture_ids = this.varPictures.map((pic) => pic.id);
    this.dialogRef.close(this.variation);
  }
}
