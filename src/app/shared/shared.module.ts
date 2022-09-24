import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Forms */
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material/material.module';

import * as fromPipes from './pipes';
import * as fromDirectives from './directives';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SelectComponent } from './components/select/select.component';
import { InputComponent } from './components/input/input.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DescVarPipe } from './pipes/desc-var.pipe';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ...fromPipes.pipes,
    ...fromDirectives.directives,
    SelectComponent,
    InputComponent,
    UploadImageComponent,
    DescVarPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MaterialModule,
  ],
  exports: [
    // Forms
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    UploadImageComponent,
    ...fromPipes.pipes,
    ...fromDirectives.directives,
  ],
  providers: [],
})
export class SharedModule {}
