import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Forms */
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import * as fromPipes from './pipes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ConfirmDialogComponent, ...fromPipes.pipes],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    // Forms
    ReactiveFormsModule,
    ...fromPipes.pipes,
  ],
  providers: [],
})
export class SharedModule {}
