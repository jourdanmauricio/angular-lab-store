import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IPicture } from '@models/IPicture';
import { ProductsService } from 'app/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  @Output() addImage = new EventEmitter();

  files: any[] = [];
  loading = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  fileBrowseHandler(e: any) {
    this.files = e.target.files;
    this.getFile();
  }

  onFileDropped($event: any) {
    this.files = $event;
    this.getFile();
  }

  getFile() {
    this.loading = true;
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
          this.addImage.emit(resp);
          // this.pictures.unshift(resp);
          // this.updatePictures();
          this.loading = false;
        });
    });
  }
}
