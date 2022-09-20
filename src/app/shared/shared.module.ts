import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Forms */
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@modules/material/material.module';

import * as fromPipes from './pipes';
import { TradPipe } from './pipes/trad.pipe';
import { PrettyJsonPipe } from './pipes/pretty-json.pipe';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
import { SelectComponent } from './components/select/select.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ...fromPipes.pipes,
    TradPipe,
    PrettyJsonPipe,
    SelectComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MaterialModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatIconModule,
  ],
  exports: [
    // Forms
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    ...fromPipes.pipes,
  ],
  providers: [],
})
export class SharedModule {}
