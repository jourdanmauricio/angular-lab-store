import { Component, OnInit } from '@angular/core';
import { WARRANTY_TYPE, WARRANTY_UNIT } from '@core/constants/constants';
import { ISaleTerms } from '@models/product/ISaleTerms';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss'],
})
export class WarrantyComponent implements OnInit {
  saleTerms: ISaleTerms[] = [];
  warrantyType!: string;
  warrantyTime: string = '';
  warrantyUnit: string = '';

  availableWarranty = WARRANTY_TYPE;
  availableWarrantyUnit = WARRANTY_UNIT;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(CurrentProdState.productSaleTerms)
      .subscribe((saleTerms) => {
        if (saleTerms) {
          console.log('saleTerms', saleTerms);
          this.saleTerms = JSON.parse(JSON.stringify(saleTerms));

          const foundType = saleTerms.find(
            (warratyType: ISaleTerms) => warratyType.id === 'WARRANTY_TYPE'
          );
          console.log('foundType', foundType);
          this.warrantyType = foundType ? foundType.value_name : '';

          const foundTime = saleTerms.find(
            (warratyTime: ISaleTerms) => warratyTime.id === 'WARRANTY_TIME'
          );
          this.warrantyTime = foundTime ? foundTime.value_struct.number : '';
          this.warrantyUnit = foundTime ? foundTime.value_struct.unit : '';
        }
      });
  }

  changeWarrantyType() {
    console.log('warrantyType', this.warrantyType);
    let obj = {
      id: 'WARRANTY_TYPE',
      value_name: this.warrantyType,
    };
    let index = this.saleTerms.findIndex((term) => term.id === 'WARRANTY_TYPE');
    if (this.warrantyType) {
      if (index === -1) {
        this.saleTerms.push(obj);
      } else {
        this.saleTerms = this.saleTerms.map((term) =>
          term.id === 'WARRANTY_TYPE' ? obj : term
        );
      }
    } else {
      if (index !== -1) this.saleTerms.push(obj);
      this.saleTerms.splice(index, 1);
    }
    this.updateSaleTerms();
  }

  changeWarrantyTime() {
    console.log('warrantyTime', this.warrantyTime);
    let obj = {
      id: 'WARRANTY_TIME',
      value_name: this.warrantyTime + ' ' + this.warrantyUnit,
      value_struct: { number: this.warrantyTime, unit: this.warrantyUnit },
    };
    let index = this.saleTerms.findIndex((term) => term.id === 'WARRANTY_TIME');
    if (this.warrantyTime) {
      if (index === -1) {
        this.saleTerms.push(obj);
      } else {
        this.saleTerms = this.saleTerms.map((term) =>
          term.id === 'WARRANTY_TIME' ? obj : term
        );
      }
    } else {
      if (index !== -1) this.saleTerms.push(obj);
      this.saleTerms.splice(index, 1);
    }
    this.updateSaleTerms();
  }
  changeWarrantyUnit() {
    console.log('warrantyTime', this.warrantyTime);
    let obj = {
      id: 'WARRANTY_TIME',
      value_name: this.warrantyTime + ' ' + this.warrantyUnit,
      value_struct: { number: this.warrantyTime, unit: this.warrantyUnit },
    };
    let index = this.saleTerms.findIndex((term) => term.id === 'WARRANTY_TIME');
    if (this.warrantyTime) {
      if (index === -1) {
        this.saleTerms.push(obj);
      } else {
        this.saleTerms = this.saleTerms.map((term) =>
          term.id === 'WARRANTY_TIME' ? obj : term
        );
      }
    } else {
      if (index !== -1) this.saleTerms.push(obj);
      this.saleTerms.splice(index, 1);
    }
    this.updateSaleTerms();
  }

  updateSaleTerms() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'sale_terms',
        value: this.saleTerms,
      })
    );
  }
}
