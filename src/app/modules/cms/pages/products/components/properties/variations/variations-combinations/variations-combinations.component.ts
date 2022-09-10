import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category, CategoryAttribute } from '@models/category.model';
import { AttributeCombination, Variation } from '@models/index';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { AddCustomAttribComponent } from '../add-custom-attrib/add-custom-attrib.component';
import { MessageService } from 'app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import { newVarSku, isNewVariation, cartesian } from 'app/utils/functions';

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
            if (atrib.values) delete atrib.values;
            console.log('atrib.values!!!!!!!!!!!', atrib.values);
            this.customAttribute = atrib;
            this.attributes.push(atrib);
          }
        });
        console.log('Attributes', this.attributes);
      }
    });
  }

  onAddAttrib() {
    const dialogRef = this.dialog.open(AddCustomAttribComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('--------------------------');
      console.log('New attribute: ', result);
      if (result) {
        this.customAttribute = {
          id: result.toUpperCase(),
          name: result,
          tags: { custom: true },
        };
        this.attributes = [...this.attributes, this.customAttribute];
      }
    });
    console.log('Attributes: ', this.attributes);
    console.log('--------------------------');
  }

  onDelAttrib() {
    console.log('Delete Attribute');
    console.log('--------------------------');
    this.customAttribute = null;
    this.attributes = this.category.attributes.filter((attribute) =>
      attribute.tags?.hasOwnProperty('allow_variations')
    );
    console.log('Attributes: ', this.attributes);
    console.log('--------------------------');
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

  createVariation() {
    // console.log('Event', e);
    //////////////////////////////////////////////////
    let values = Object.values(this.attributesComb);

    let output = [];

    if (values.length > 1) {
      output = cartesian(...values);
    } else {
      values[0].forEach((value) => output.push([value]));
    }

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

    //////////////////////////////////////////////////

    let newVariations: Variation[] = [];
    let exists = 0;
    let sku = newVarSku(this.variations);
    atribsNewVariations.forEach((newVar) => {
      let found = isNewVariation(newVar, atribsVariation);
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
