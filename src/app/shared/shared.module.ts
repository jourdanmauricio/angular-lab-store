import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Forms */
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material/material.module';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import * as fromPipes from './pipes';

@NgModule({
  declarations: [ConfirmDialogComponent, ...fromPipes.pipes],
  imports: [
    CommonModule,
    // Forms
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    // Forms
    ReactiveFormsModule,
    ...fromPipes.pipes,
  ],
})
export class SharedModule {}
