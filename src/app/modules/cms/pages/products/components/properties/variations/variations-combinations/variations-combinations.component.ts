import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category, CategoryAttribute } from '@models/category.model';
import { AttributeCombination, Variation } from '@models/product.model';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { AddCustomAttribComponent } from '../add-custom-attrib/add-custom-attrib.component';
import { MessageService } from 'app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

export interface AttribComb {
  [key: string]: AttributeCombination[];
}

@Component({
  selector: 'app-variations-combinations',
  templateUrl: './variations-combinations.component.html',
  styleUrls: ['./variations-combinations.component.scss'],
})
export class VariationsCombinationsComponent implements OnInit {
  seller_custom_field!: string;
  price!: number;
  variations: Variation[] = [];
  attributes: CategoryAttribute[] = [];
  customAttribute: CategoryAttribute | null = null;
  category!: Category;
  attributesComb!: AttribComb;

  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.category) {
        this.category = data.category;
        this.variations = data.variations;
        this.seller_custom_field = data.seller_custom_field;
        this.price = data.price;
        if (data.variations.length === 0) {
          this.attributes = data.category?.attributes.filter((attribute) =>
            attribute.tags?.hasOwnProperty('allow_variations')
          );
        }
      }
      if (this.variations.length > 0) {
        this.variations[0].attribute_combinations.forEach((atrib) => {
          let index = this.attributes.findIndex(
            (atrib2) => atrib2.id === atrib.id
          );
          console.log('index', index);
          if (index === -1) {
            // if (atrib.values) delete atrib.values;
            console.log('atrib.values!!!!!!!!!!!', atrib.values);
            this.customAttribute = atrib;
            console.log('atrib', atrib);
            this.attributes.push(atrib);
          }
        });
      }
    });
  }

  onAddAttrib() {
    const dialogRef = this.dialog.open(AddCustomAttribComponent, {
      width: '320px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.customAttribute = {
          id: result.toUpperCase(),
          name: result,
          tags: { custom: true },
        };
        this.attributes = [...this.attributes, this.customAttribute];
      }
    });
  }

  onDelAttrib() {
    console.log('Del Atrib');
    this.customAttribute = null;
    this.attributes = this.category.attributes.filter((attribute) =>
      attribute.tags?.hasOwnProperty('allow_variations')
    );
  }

  handleCombinations(e: Event, categoryVariation: CategoryAttribute) {
    console.log('event', e);
    let attributes: AttributeCombination[] = [];
    if (e.target) {
      attributes.push({
        id: categoryVariation.id,
        name: categoryVariation.name,
        value_name: (e.target as HTMLTextAreaElement).value,
      });
      this.attributesComb[categoryVariation.id] = attributes;

      console.log('Input');
    } else {
      console.log('Select');
      Array.prototype.forEach.call(e, function (option) {
        const found = categoryVariation.values?.find(
          (value) => value.id === option
        );
        if (found) {
          attributes.push({
            id: option,
            name: categoryVariation.name,
            value_id: option,
            value_name: found.name,
          });
        }
      });
      if (this.attributesComb) {
        this.attributesComb[categoryVariation.id] = attributes;
      } else {
        this.attributesComb = {
          [categoryVariation.id]: attributes,
        };
      }
    }
  }

  newSku() {
    let sku = 1;
    if (this.variations.length > 0) {
      let max = 1;
      this.variations.forEach((variation) => {
        let varSku = variation.attributes?.find(
          (atrib) => atrib.id === 'SELLER_SKU'
        );
        if (varSku) {
          let varSku2 = varSku.value_name?.split('--');
          if (varSku2!.length > 1) {
            let varSku3 = parseInt(varSku2![1]) + 1;
            if (varSku3 > max) {
              max = varSku3;
              sku = max;
            }
          }
        }
      });
    }
    return sku;
  }

  createVariation() {
    // console.log('Event', e);
    //////////////////////////////////////////////////
    let values = Object.values(this.attributesComb);
    const f = (a: any, b: any) =>
      [].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));
    const cartesian: any = (a: any, b: any, ...c: any) =>
      b ? cartesian(f(a, b), ...c) : a;
    let output = [];
    if (values.length > 1) {
      output = cartesian(...values);
    } else {
      values[0].forEach((value) => output.push([value]));
    }

    //////////////////////////////////////////////////

    const redudeArray = (arr: AttributeCombination[]) =>
      arr.map((el: AttributeCombination) => {
        return { id: el.id, value_name: el.value_name, name: el.name };
      });

    let atribsVariation: any[] = [];
    this.variations.forEach((variation) =>
      atribsVariation.push(redudeArray(variation.attribute_combinations))
    );

    let atribsNewVariations: any[] = [];
    output.forEach((vari: any) => atribsNewVariations.push(redudeArray(vari)));

    //////////////////////////////////////

    const objectsEqual: any = (o1: any, o2: any) =>
      typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length &&
          Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

    const arraysEqual = (a1: any, a2: any) =>
      a1.length === a2.length &&
      a1.every((o: any, idx: any) => objectsEqual(o, a2[idx]));

    //////////////////////////////////////

    const newInVar = (newVar: Variation, variations: Variation[]) => {
      let found = false;
      for (let i = 0; i < variations.length; i++) {
        found = arraysEqual(newVar, variations[i]);
        if (found === true) break;
      }
      return found;
    };

    let newVariations: Variation[] = [];
    let exists = 0;
    let sku = this.newSku();
    atribsNewVariations.forEach((newVar) => {
      let found = newInVar(newVar, atribsVariation);
      if (!found) {
        let variation = {
          id: `${this.seller_custom_field}--${sku}`,
          attribute_combinations: newVar,
          available_quantity: 1,
          picture_ids: [],
          attributes: [
            {
              id: 'SELLER_SKU',
              value_name: `${this.seller_custom_field}--${sku}`,
            },
          ],
          price: this.price || 0,
          updated: true,
        };
        newVariations.push(variation);
      } else {
        exists += 1;
      }
      sku += 1;
    });
    if (exists > 0)
      this.messageService.showMsg(`${exists} variaciones existen`, 'error');

    if (newVariations.length > 0)
      this.store.dispatch(
        updateCurrentProd({
          property: { variations: [...this.variations, ...newVariations] },
        })
      );
    newVariations = [];
    // (e.target as HTMLFormElement).reset();
    // this.form.reset('', { emitEvent: false });

    // this.form.reset();
  }
}
