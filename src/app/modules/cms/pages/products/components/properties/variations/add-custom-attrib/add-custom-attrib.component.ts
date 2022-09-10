import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-custom-attrib',
  templateUrl: './add-custom-attrib.component.html',
  styleUrls: ['./add-custom-attrib.component.scss'],
})
export class AddCustomAttribComponent implements OnInit {
  attribute = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<AddCustomAttribComponent>) {}

  ngOnInit(): void {}

  addAtrib() {
    this.dialogRef.close(this.attribute.value);
  }
}
