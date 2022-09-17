import { Component, OnInit } from '@angular/core';
import { ValueType } from '@core/constants/enums';
import { ApiBasicCategory } from '@models/category/IBasicCategory';
import { ValueAtrib } from '@models/category/IValueAtrib';
import { ICatAttribute, Tags } from '@models/index';
import { Select, Store } from '@ngxs/store';
import { CurrentProdUpdate } from 'app/store/currentProd/currentProd.actions';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

export interface Attribute {
  id?: string;
  name?: string;
  tags?: Tags;
  value_type?: ValueType;
  values?: ValueAtrib[];
  value_id?: string;
  value_name?: string;
  value_struct: any;
  allowed_units?: ApiBasicCategory[];
  default_unit?: string;
  type?: string;
  hint?: string;
  hierarchy?: any;
  relevance?: number;
  value_max_length?: number;
  attribute_group_id?: string;
  attribute_group_name?: string;
  tooltip?: string;
}

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value_name', 'allowed_units', 'tags'];
  attributes!: Attribute[];
  constructor(private store: Store) {}

  onChange2(attribute: any, e: any) {
    console.log('Attrib', attribute);
    console.log('e', e);
    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    found!.value_name = attribute.value_struct.number + ' ' + e.name;
    found!.value_struct.unit = e.name;
    console.log('found', found);
    this.updateAttr();
  }

  onChange(attribute: any, e: any) {
    console.log('attribute', attribute);
    console.log('e', e);
    console.log('attributes', this.attributes);

    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    if (attribute.values) {
      if (!attribute.tags.hasOwnProperty('multivalued')) {
        found!.value_id = e.id;
        found!.value_name = e.name;
      } else {
        found!.value_name = e.map((val: any) => val.name).join();
      }
    }
    if (!attribute.values) {
      switch (attribute.value_type) {
        case 'string':
          found!.value_id = attribute.value_id;
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
    console.log('found', found);
    this.updateAttr();
  }

  updateAttr() {
    console.log('UPD');
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'attributes',
        value: this.attributes,
      })
    );
  }

  ngOnInit(): void {
    // this.store
    //   .select(CurrentProdState.catAttributes)
    //   .subscribe((attribs: ICatAttribute[]) => {
    //     this.catAttribs = attribs;
    //     // console.log('catAttribs!!!!!!!!!!!!!!', this.catAttribs);
    //   });
    // this.store
    //   .select(CurrentProdState.prodAttributes)
    //   .subscribe((attribs: ICatAttribute[]) => {
    //     this.prodAttribs = attribs;
    //   });
    this.store
      .select(CurrentProdState.totalAttribs)
      .subscribe((attribs: ICatAttribute[]) => {
        if (attribs) {
          this.attributes = JSON.parse(JSON.stringify(attribs));
          console.log('catAttribs!!!!!!!!!!!!!!', attribs);
        }
      });
  }

  // @Select(CurrentProdState.prodAttributes) prodAttributes$!: ICatAttribute[];
  // @Select(CurrentProdState.catAttributes) catAttributes$!: ICatAttribute[];
  @Select(CurrentProdState.totalAttribs) totalAttribs$!: ICatAttribute[];
}
