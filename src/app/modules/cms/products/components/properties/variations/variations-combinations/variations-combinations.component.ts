import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category, CategoryAttribute } from '@models/category.model';
import { AttributeCombination, Variation } from '@models/index';
import { getCurrentProd } from 'app/state/selectors/currentProd.selector';
import { AddCustomAttribComponent } from '../add-custom-attrib/add-custom-attrib.component';
import { MessageService } from 'app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { updateCurrentProd } from 'app/state/actions/currentProd.actions';
import {
  newVarSku,
  isNewVariation,
  cartesian,
  getAttribsComb,
} from 'app/utils/functions';
import { IAttribComb } from '@models/index';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

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
  attributes: IAttribComb[] = [];
  customAttribute = false;
  category!: Category;
  attributesComb!: AttribComb;

  attributesForm: FormGroup;
  // control: FormArray;
  private fb: FormBuilder;

  constructor(
    private store: Store<any>,
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
    this.store.select(getCurrentProd).subscribe((data) => {
      if (data.category) {
        this.category = data.category;
        this.variations = JSON.parse(JSON.stringify(data.variations));
        this.seller_custom_field = data.seller_custom_field;
        this.price = data.price;

        this.attributes = getAttribsComb(this.variations, this.category);

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
    // this.attributes = this.category.attributes.filter((attribute) =>
    //  attribute.tags?.hasOwnProperty('allow_variations')
    // );
    console.log('Attributes: ', this.attributes);
    console.log('--------------------------');
  }

  createVariation(formDirective: FormGroupDirective) {
    if (!this.attributesForm.valid) return;

    let attributes: AttributeCombination[] = [];
    let attributeCombinations: AttributeCombination[][] = [];

    this.attributes.forEach((attrib) => {
      let value_name = this.attributesForm.value[attrib.id];
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
    });

    let output = [];

    if (attributeCombinations.length > 1) {
      output = cartesian(...attributeCombinations);
    } else {
      attributeCombinations[0].forEach((value) => output.push([value]));
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

    this.attributesForm.reset();
    formDirective.resetForm();
  }
}
