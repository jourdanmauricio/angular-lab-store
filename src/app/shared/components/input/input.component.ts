import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() value!: string;
  @Input() field!: string;
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() min: number = 0;
  @Input() mlId: string = '';
  @Input() id: string = '';
  @Output() selected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  change(e: any) {
    console.log('e', e.target.value);
    this.selected.emit({
      value: e.target.value,
      field: this.field,
      mlId: this.mlId,
      id: this.id,
    });
  }
}
