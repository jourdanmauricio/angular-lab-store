import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICategory } from '@models/index';
import { IAttributeCombination, IVariation } from '@models/index';
import { AddCustomAttribComponent } from '../add-custom-attrib/add-custom-attrib.component';
import { MessageService } from 'app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import {
  newVarSku,
  isNewVariation,
  cartesian,
  getAttribsComb,
} from 'app/utils/functions';
import { IAttribComb } from '@models/index';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';

export interface AttribComb {
  [key: string]: IAttributeCombination[];
}

@Component({
  selector: 'app-variations-combinations',
  templateUrl: './variations-combinations.component.html',
  styleUrls: ['./variations-combinations.component.scss'],
})
export class VariationsCombinationsComponent implements OnInit {
  seller_custom_field!: string;
  price!: number;
  variations: IVariation[] = [];
  attributes: IAttribComb[] = [];
  customAttribute = false;
  category!: ICategory;
  attributesComb!: AttribComb;

  attributesForm: FormGroup;
  private fb: FormBuilder;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {
    this.fb = new FormBuilder();
    this.attributesForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.getData();
  }

  getAtrribError(field: string) {
    return this.attributesForm.get(field);
  }

  getData() {
    this.store.select(CurrentProdState.currentProd).subscribe((prod) => {
      console.log('Prod', prod);
      if (prod.variations)
        this.variations = JSON.parse(JSON.stringify(prod.variations));
      if (prod.category) {
        console.log('ACAAA2');
        this.category = prod.category;
      }
      if (prod.category && prod.variations)
        this.attributes = getAttribsComb(this.variations, this.category);
      if (prod.seller_custom_field)
        this.seller_custom_field = prod.seller_custom_field;
      if (prod.price) this.price = prod.price;

      if (prod.category) {
        let obj: { [k: string]: any } = {};
        this.attributes.forEach(
          (atrib) =>
            (obj[atrib.id] = new FormControl(
              { value: '', disabled: !atrib.active },
              Validators.required
            ))
        );
        if (this.variations.length === 0) {
          this.customAttribute = false;
        }
        this.attributesForm = this.fb.group(obj);
      }
    });
  }

  onAddAttrib() {
    const dialogRef = this.dialog.open(AddCustomAttribComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let index = this.attributes.findIndex(
          (attrib) => attrib.id === result.toUpperCase()
        );
        if (index !== -1) {
          this.messageService.showMsg('El atributo ya existe', 'error');
          return;
        }
        let attribute: IAttribComb = {
          id: result.toUpperCase(),
          name: result,
          active: true,
          source: 'custom',
        };

        this.attributes.push(attribute);

        let obj: { [k: string]: any } = {};
        this.attributes.forEach(
          (atrib) =>
            (obj[atrib.id] = [
              { value: '', disabled: !atrib.active },
              Validators.required,
            ])
        );
        this.attributesForm = this.fb.group(obj);
        this.customAttribute = true;
      }
    });
  }

  onDelAttrib() {
    console.log('Delete Attribute');
    console.log('--------------------------');
    this.customAttribute = false;
    let index = this.attributes.findIndex((attr) => attr.source === 'custom');
    this.attributes.splice(index, 1);
    this.attributes = this.category.attributes.filter((attribute) =>
      attribute.tags?.hasOwnProperty('allow_variations')
    ) as IAttribComb[];
    console.log('Attributes: ', this.attributes);
    console.log('--------------------------');
  }

  createVariation(formDirective: FormGroupDirective) {
    if (!this.attributesForm.valid) return;

    let attributes: IAttributeCombination[] = [];
    let attributeCombinations: IAttributeCombination[][] = [];

    this.attributes.forEach((attrib) => {
      if (attrib.active === true) {
        let value_name = this.attributesForm.value[attrib.id];
        console.log('typeof value_name', typeof value_name);
        if (typeof value_name === 'string') {
          attributes.push({
            id: attrib.id,
            name: attrib.name,
            value_name: value_name,
          });
        } else {
          value_name.forEach((val: string) => {
            const found = attrib.values.find((value: any) => value.id === val);
            if (found) {
              attributes.push({
                id: attrib.id,
                name: attrib.name,
                value_name: found.name,
                value_id: val,
              });
            }
          });
        }
        attributeCombinations.push(attributes);
        attributes = [];
      }
    });

    let output = [];

    if (attributeCombinations.length > 1) {
      output = cartesian(...attributeCombinations);
    } else {
      attributeCombinations[0].forEach((value) => output.push([value]));
    }

    const redudeArray = (arr: IAttributeCombination[]) =>
      arr.map((el: IAttributeCombination) => {
        return { id: el.id, value_name: el.value_name, name: el.name };
      });

    let atribsVariation: any[] = [];
    this.variations.forEach((variation) =>
      atribsVariation.push(redudeArray(variation.attribute_combinations))
    );

    let atribsNewVariations: any[] = [];
    output.forEach((vari: any) => atribsNewVariations.push(redudeArray(vari)));

    //////////////////////////////////////////////////

    let newVariations: IVariation[] = [];
    let exists = 0;
    let sku = newVarSku(this.variations);
    atribsNewVariations.forEach((newVar) => {
      let found = isNewVariation(newVar, atribsVariation);
      if (!found) {
        let variation: IVariation = {
          id: `${this.seller_custom_field}--${sku}`,
          attribute_combinations: newVar,
          available_quantity: 1,
          picture_ids: [],
          attributes: [
            {
              id: 'SELLER_SKU',
              value_name: `${this.seller_custom_field}--${sku}`,
              name: 'seller_sku',
              value_id: null,
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
        new CurrentProdUpdate({
          property: 'variations',
          value: [...this.variations, ...newVariations],
        })
      );

    newVariations = [];

    this.attributesForm.reset();
    formDirective.resetForm();
  }
}
