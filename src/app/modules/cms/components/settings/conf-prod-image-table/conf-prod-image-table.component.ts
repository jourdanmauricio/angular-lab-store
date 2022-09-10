import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Picture } from '@models/picture.model';
import { ProductsService } from 'app/services/products.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-conf-prod-image-table',
  templateUrl: './conf-prod-image-table.component.html',
  styleUrls: ['./conf-prod-image-table.component.scss'],
})
export class ConfProdImageTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'secure_url', 'size', 'actions'];
  imageName = new FormControl(null);
  fileinput = '';
  loading = false;

  @Input('pictures')
  set changePictures(newPictures: Picture[]) {
    this.dataSource = new MatTableDataSource(newPictures);
  }

  dataSource = new MatTableDataSource<Picture>();
  @Output() picture = new EventEmitter<Picture>();
  @Output() delPicture = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(
    private productsService: ProductsService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  get imageNameValue() {
    return this.imageName.value;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteImg(name: string) {
    this.delPicture.emit(name);
  }

  onFileSelected(event: any) {
    this.loading = true;
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);

    this.productsService
      .createImage(formData)
      .pipe(
        map((res) => {
          const pict: Picture = {
            id: res.id,
            name: this.imageNameValue!,
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
        this.imageName.setValue(null);
        this.picture.emit(resp);
        this.loading = false;
      });
  }

  changeName() {
    const index = this.dataSource.data.findIndex(
      (pic) => pic.name === this.imageName.value
    );
    if (index !== -1) {
      this.message.showMsg('El nombre ya existe', 'error');
      this.imageName.setValue(null);
    }
  }
}
