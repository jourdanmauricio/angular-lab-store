import { CDK_DRAG_HANDLE } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ICatAttribute, Tags } from '@models/index';
import { IAttributeWork } from '@models/product/IAttribute';
import { Select, Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value_name', 'allowed_units', 'tags'];
  attributes!: IAttributeWork[];
  prodAttributes!: IAttributeWork[];

  constructor(private store: Store) {}

  onChange2(attribute: IAttributeWork, e: any) {
    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    if (!found!.value_struct) {
      found!.value_struct = {
        number: '',
        unit: e.name,
      };
    }
    found!.value_name = found!.value_struct.number + ' ' + e.name;
    found!.value_struct.unit = e.name;
    found!.updated = true;
    this.updateAttr(found!);
  }

  onChange(attribute: IAttributeWork, e: any) {
    // e = e.map((el: any) => ({ id: el.name, name: el.name }));
    console.log('e', typeof e, e);
    // let value_name = '';
    // let value_id = '';
    // if (e.target) {
    //   value_name = e.target.value;
    // } else {
    //   value_name = e.name;
    //   value_id = e.id;
    // }
    // console.log('value_id', value_id);
    // console.log('value_name', value_name);

    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    found!.updated = true;
    if (attribute.values) {
      if (!attribute.tags?.hasOwnProperty('multivalued')) {
        found!.value_id = e.id;
        found!.value_name = e.name;
      } else {
        found!.value_name = e.map((val: any) => val.name).join();
        found!.value_id = e.map((val: any) => val.name);
      }
    }
    if (!attribute.values) {
      switch (attribute.value_type) {
        case 'string':
          found!.value_id = null;
          found!.value_name = e.target.value;
          break;
        case 'number':
          found!.value_name = e.target.value;
          break;
        case 'number_unit':
          if (!found!.value_struct) {
            found!.value_struct = {
              number: e.target.value,
              unit: attribute.default_unit,
            };
          }
          found!.value_name = e.target.value + ' ' + found!.value_struct.unit;
          found!.value_struct.number = e.target.value;
          break;
      }
    }
    this.updateAttr(found!);
  }

  updateAttr(attribute: IAttributeWork) {
    let index = this.prodAttributes.findIndex(
      (prodAttrib) => prodAttrib.id === attribute.id
    );
    if (index !== -1) {
      this.prodAttributes[index] = attribute;
    } else {
      this.prodAttributes.push(attribute);
    }

    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'attributes',
        value: this.prodAttributes,
      })
    );
  }

  ngOnInit(): void {
    this.store
      .select(CurrentProdState.totalAttribs)
      .subscribe((attribs: ICatAttribute[]) => {
        if (attribs) {
          this.attributes = JSON.parse(JSON.stringify(attribs));
        }
      });

    this.store
      .select(CurrentProdState.prodAttributes)
      .subscribe((attribs: ICatAttribute[]) => {
        if (attribs) {
          this.prodAttributes = JSON.parse(JSON.stringify(attribs));
          this.prodAttributes.map((attr) => (attr.updated = false));
        }
      });
  }

  @Select(CurrentProdState.totalAttribs) totalAttribs$!: ICatAttribute[];
}
