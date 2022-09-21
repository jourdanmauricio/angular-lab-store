import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Input Genérico
 * Parametros:
 * disabled -> deshabilita el componente
 * field -> campo referencia que se modificará en el padre
 * id -> product id
 * label -> label para el componente
 * min -> valor minimo para campo tipo number
 * mlId -> id de Mercado Libre
 * type -> tipo de campo input
 * value -> valor inicial
 *
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() field!: string;
  @Input() id: number | string | null = null;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() min: number | null = null;
  @Input() mlId: string | null = null;
  @Input() value: string | number | null = '';
  @Output() selected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  change(e: any) {
    this.selected.emit({
      value: e.target.value,
      field: this.field,
      mlId: this.mlId,
      id: this.id,
    });
  }
}
