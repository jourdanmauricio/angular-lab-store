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
  constructor(private store: Store) {}

  onChange2(attribute: IAttributeWork, e: any) {
    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
    found!.value_name = attribute.value_struct.number + ' ' + e.name;
    found!.value_struct.unit = e.name;
    this.updateAttr();
  }

  onChange(attribute: IAttributeWork, e: any) {
    let found = this.attributes.find((attrib) => attrib.id === attribute.id);
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
    this.updateAttr();
  }

  updateAttr() {
    this.store.dispatch(
      new CurrentProdUpdate({
        property: 'attributes',
        value: this.attributes,
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
  }

  @Select(CurrentProdState.totalAttribs) totalAttribs$!: ICatAttribute[];
}
