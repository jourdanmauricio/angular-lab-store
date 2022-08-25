import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Forms */
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    // Forms
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    // Forms
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
