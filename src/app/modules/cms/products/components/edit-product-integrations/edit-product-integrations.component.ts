import { Component, OnInit } from '@angular/core';
import { PRODUCT_STATUS_ML } from '@core/constants/constants';
import { IAttributeCombination, IProductWeb } from '@models/index';
import { IProductDto } from '@models/IProduct';
import { IProductMl } from '@models/product/IProductMl';
import { Store } from '@ngxs/store';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { ProdMlUpdate } from 'app/store/prodMl/prodMl.actions';
import { ProdMlState } from 'app/store/prodMl/prodMl.state';
import { ProdWebUpdate } from 'app/store/prodWeb/prodWeb.actions';
import { ProdWebState } from 'app/store/prodWeb/prodWeb.state';

@Component({
  selector: 'app-edit-product-integrations',
  templateUrl: './edit-product-integrations.component.html',
  styleUrls: ['./edit-product-integrations.component.scss'],
})
export class EditProductIntegrationsComponent implements OnInit {
  optionStatusML = PRODUCT_STATUS_ML;
  prodMl!: IProductMl;
  prod!: IProductDto;
  prodWeb!: IProductWeb;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      if (prod) {
        this.prod = prod;
      }
    });
    this.store.select(ProdMlState.getProdMl).subscribe((prod) => {
      if (prod) {
        this.prodMl = prod;
      }
    });
    this.store.select(ProdWebState.getProdWeb).subscribe((prod) => {
      //if (prod) {
      this.prodWeb = prod;
      // }
    });
  }

  sku(id: number | string) {
    let sku: string | null | undefined = '';
    if (this.prod.variations) {
      let variation = this.prod.variations.find(
        (variation) => variation.id === id
      );
      if (variation?.attributes) {
        let atribSku = variation.attributes.find(
          (atrib) => atrib.id === 'SELLER_SKU'
        );
        if (atribSku) sku = atribSku.value_name;
      }
    }
    return sku;
  }

  varQuantityMl(id: number | string) {
    let found = this.prodMl?.variations.find((vari) => vari.id === id);
    return found ? found.available_quantity : null;
  }

  varQuantityWeb(id: number | string) {
    let found = this.prodWeb?.variations.find((vari) => vari.id === id);
    return found ? found.available_quantity : null;
  }

  variationDesc(attrComb: IAttributeCombination[]) {
    let variation: string = '';
    attrComb.forEach((attr) => (variation = variation + '/' + attr.value_name));
    return variation;
  }

  onSelected(e: any) {
    const field = e.field;
    const value = e.value;
    const mlId = e.mlId;
    const id = e.id;
    let newData;
    let quantity = 0;
    switch (field) {
      case 'status-ml':
        this.store.dispatch(new ProdMlUpdate({ property: 'status', value }));
        break;
      case 'status-web':
        this.store.dispatch(new ProdWebUpdate({ property: 'status', value }));
        break;

      case 'quantity-ml':
        this.store.dispatch(
          new ProdMlUpdate({
            property: 'available_quantity',
            value: parseInt(value),
          })
        );
        break;
      case 'quantity-web':
        this.store.dispatch(
          new ProdWebUpdate({
            property: 'available_quantity',
            value: parseInt(value),
          })
        );
        break;

      case 'var-quantity-ml':
        newData = this.prodMl.variations.map((vari) =>
          vari.id === id
            ? {
                ...vari,
                available_quantity: parseInt(value),
                updated: true,
              }
            : vari
        );
        this.store.dispatch(
          new ProdMlUpdate({ property: 'variations', value: newData })
        );
        this.prodMl.variations.forEach(
          (vari) => (quantity += vari.available_quantity)
        );

        this.store.dispatch(
          new ProdMlUpdate({ property: 'available_quantity', value: quantity })
        );

        break;
      case 'var-quantity-web':
        newData = this.prodWeb.variations.map((vari) =>
          vari.id === id
            ? {
                ...vari,
                available_quantity: parseInt(value),
                updated: true,
              }
            : vari
        );
        this.store.dispatch(
          new ProdWebUpdate({ property: 'variations', value: newData })
        );
        this.prodWeb.variations.forEach(
          (vari) => (quantity += vari.available_quantity)
        );

        this.store.dispatch(
          new ProdWebUpdate({ property: 'available_quantity', value: quantity })
        );
        break;

      case 'price-ml':
        newData = this.prodMl.variations.map((vari) => ({
          ...vari,
          price: value,
          updated: true,
        }));

        this.store.dispatch(new ProdMlUpdate({ property: 'price', value }));
        this.store.dispatch(
          new ProdMlUpdate({ property: 'variations', value: newData })
        );
        break;
      case 'price-web':
        newData = this.prodWeb.variations.map((vari) => ({
          ...vari,
          price: value,
          updated: true,
        }));

        this.store.dispatch(new ProdWebUpdate({ property: 'price', value }));
        this.store.dispatch(
          new ProdWebUpdate({ property: 'variations', value: newData })
        );
        break;
    }
  }
}
