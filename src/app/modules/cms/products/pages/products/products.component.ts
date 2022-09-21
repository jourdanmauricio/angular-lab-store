import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'app/services/products.service';
import { MessageService } from 'app/services/message.service';
import { UserMl } from '@models/index';
import { MatTableDataSource } from '@angular/material/table';
import { IProductDto } from '@models/index';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'thumbnail',
    'seller_custom_field',
    'status',
    'price',
    'title',
  ];
  dataSource = new MatTableDataSource<IProductDto>();
  selection = new SelectionModel<IProductDto>(true, []);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IProductDto | null;
  loading = false;
  userMl: UserMl | null = null;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.usersService.userMl$.subscribe((data) => (this.userMl = data));
    this.getAllProducts();
  }

  downloadMl() {
    this.loading = true;
    this.productsService.getMlAllProducts().subscribe(() => {
      this.loading = false;
      this.messageService.showMsg('Productos importados', 'success');
    });
  }

  getAllProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<IProductDto>(data); //pass the array you want in the table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
      console.log('Products', this.dataSource.data);
      return data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if (this.dataSource.filteredData.length > 0) {
      this.selection.select(...this.dataSource.filteredData);
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IProductDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }
}
