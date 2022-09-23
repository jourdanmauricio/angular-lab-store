import { Component, OnInit } from '@angular/core';
import { ICatAttribute } from '@models/index';
import { IAttributeWork } from '@models/product/IAttribute';
import { Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'value_name',
    'allowed_units',
    'tags_spec',
    'N/A',
  ];
  attributes!: IAttributeWork[];
  prodAttributes!: IAttributeWork[];
  totalAttribs$!: ICatAttribute[];

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
    console.log('e', typeof e, e);
    console.log('attribute', attribute);

    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    found!.updated = true;

    if (attribute.component === 'COMBO') {
      if (!e) {
        e = {
          id: '',
          name: '',
        };
      }
    }

    if (attribute.values) {
      if (!attribute.tags?.hasOwnProperty('multivalued')) {
        found!.value_id = e.id;
        found!.value_name = e.name;
      } else {
        if (e.length !== 0) {
          found!.value_name = e.map((val: any) => val.name).join();
        } else {
          found!.value_name = null;
          found!.value_id = null;
        }
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
    console.log('UPD ATRIB', attribute);
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

  enabledNA(attribute: IAttributeWork) {
    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    found!.value_name = '';
    found!.value_id = null;
    found!.updated = true;
    console.log('Attribute', found);
    this.updateAttr(found!);
  }

  notApply(attribute: IAttributeWork) {
    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    found!.value_name = null;
    found!.value_id = '-1';
    found!.updated = true;
    console.log('Attribute', found);
    this.updateAttr(found!);
  }

  ngOnInit(): void {
    this.store
      .select(CurrentProdState.totalAttribs)
      .subscribe((attribs: ICatAttribute[]) => {
        if (attribs) {
          this.attributes = JSON.parse(JSON.stringify(attribs));
          this.totalAttribs$ = JSON.parse(JSON.stringify(attribs));
        }
        console.log('this.attributes', this.attributes);
      });

    this.store
      .select(CurrentProdState.prodAttributes)
      .subscribe((attribs: ICatAttribute[]) => {
        if (attribs) {
          this.prodAttributes = JSON.parse(JSON.stringify(attribs));
          // this.prodAttributes.map((attr) => (attr.updated = false));
        }
      });
  }
}
