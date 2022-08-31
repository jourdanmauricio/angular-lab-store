import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { MessageService } from 'src/app/services/message.service';
import { UserMlService } from 'src/app/services/user-ml.service';
import { UserMl } from 'src/app/models/userMl.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  userMl: UserMl | null = null;
  loading = false;

  constructor(
    private productsService: ProductsService,
    private userMlService: UserMlService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userMlService.userMl$.subscribe((data) => (this.userMl = data));
    console.log('user ML', this.userMl);
  }

  async downloadMl() {
    this.loading = true;
    this.productsService.getMlAllProducts().subscribe(() => {
      this.loading = false;
      this.messageService.showMsg('Productos importados', 'success');
    });
  }
}
