import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IOptions {
  name: string;
  disabled: boolean;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() label!: string;
  @Input() value!: string;
  @Input() options!: IOptions[];
  @Input() traduction: string = '';
  @Input() field!: string;
  @Input() mlId: string = '';
  @Input() id: string = '';
  @Output() selected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeOption(e: any) {
    this.selected.emit({
      value: e,
      field: this.field,
      mlId: this.mlId,
      id: this.id,
    });
  }
}
