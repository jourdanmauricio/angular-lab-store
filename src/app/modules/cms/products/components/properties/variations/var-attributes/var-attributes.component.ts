import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVariation } from '@models/index';
import { IAttributeWork } from '@models/product/IAttribute';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-var-attributes',
  templateUrl: './var-attributes.component.html',
  styleUrls: ['./var-attributes.component.scss'],
})
export class VarAttributesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value_name', 'allowed_units', 'tags'];
  totalAttribs$!: IAttributeWork[];
  attributes!: IAttributeWork[];
  variation!: IVariation;
  varAttributes!: IAttributeWork[];

  constructor(
    public dialogRef: MatDialogRef<VarAttributesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVariation,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('OPEN', this.data);
    this.variation = JSON.parse(JSON.stringify(this.data));
    /**********
     * Recorro atribsVars de catgoría completando los valores desde ProdVars
     ***********/
    this.totalAttribs$ = [];
    this.varAttributes = this.variation.attributes;
    this.store
      .select(CurrentProdState.catVarAttributes)
      .subscribe((catAttribs) => {
        if (catAttribs) {
          catAttribs.map((catAttrib: IAttributeWork) => {
            let obj: IAttributeWork = JSON.parse(JSON.stringify(catAttrib));
            let found = this.varAttributes?.find(
              (varAttrib: any) => varAttrib.id === obj.id
            );
            if (found) {
              obj.value_id = found.value_id;
              obj.value_name = found.value_name;
              obj.value_struct = found.value_struct;
              if (obj.tags?.hasOwnProperty('multivalued')) {
                obj.value_id = found.value_name?.split(',');
                obj.values?.map((val) => (val.id = val.name));
              }
              if (
                obj.values &&
                obj.values.length > 0 &&
                !obj.tags?.hasOwnProperty('multivalued')
              ) {
                let index = found.values?.findIndex(
                  (val: any) => val.value_id === obj.value_id
                );
                if (index === -1) {
                  if (found.value_id === null) obj.value_id = obj.value_name;
                  obj.values = [
                    ...obj.values,
                    {
                      id:
                        found.value_id === null
                          ? found.value_name
                          : found.value_id,
                      name: found.value_name,
                    },
                  ];
                }
              }
              this.totalAttribs$.push(obj);
            } else {
              this.totalAttribs$.push(obj);
            }
          });
          console.log('newVarAttributes', this.totalAttribs$);
          this.attributes = this.totalAttribs$;
        }
      });
  }

  onChange(attribute: IAttributeWork, e: any) {
    if (e === undefined) {
      e = {
        id: null,
        name: null,
      };
    }

    let found = this.totalAttribs$.find((attrib) => attrib.id === attribute.id);
    if (!found) return;

    if (attribute.values) {
      if (!attribute.tags?.hasOwnProperty('multivalued')) {
        found!.value_id = e.id;
        found!.value_name = e.name;
      } else {
        found!.value_name = e.map((val: any) => val.name).join();
      }
    }
    if (!attribute.values) {
      switch (attribute.value_type) {
        case 'string':
          found!.value_id = null;
          found!.value_name = attribute.value_name;
          break;
        case 'number':
          found!.value_name = e.target.value;
          break;
        case 'number_unit':
          found!.value_name =
            e.target.value + ' ' + attribute.value_struct.unit;
          found!.value_struct.number = e.target.value;
          break;
      }
    }
    this.updateAttr(found);
  }

  onChange2(attribute: IAttributeWork, e: any) {
    let found = this.totalAttribs$.find((attrib) => attrib.id === attribute.id);
    if (!found) return;
    found!.value_name = attribute.value_struct.number + ' ' + e.name;
    found!.value_struct.unit = e.name;
    this.updateAttr(found);
  }

  updateAttr(attribute: IAttributeWork) {
    let index = this.varAttributes.findIndex(
      (varAttrib) => varAttrib.id === attribute.id
    );
    if (index !== -1) {
      this.varAttributes[index] = attribute;
    } else {
      this.varAttributes.push(attribute);
    }

    this.variation.attributes = this.varAttributes;
    this.variation.updated = true;
  }

  updateVarAttrib() {
    this.dialogRef.close(this.variation);
  }
}
