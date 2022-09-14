import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';

// Shared Modules
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material/material.module';

import { SettingsComponent } from './pages/settings.component';
import { ConfMlComponent } from './components/conf-ml/conf-ml.component';
import { ConfProdComponent } from './components/conf-prod/conf-prod.component';
import { ConfProdImageTableComponent } from './components/conf-prod-image-table/conf-prod-image-table.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ConfMlComponent,
    ConfProdComponent,
    ConfProdImageTableComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, MaterialModule, SharedModule], //
})
export class SettingsModule {}
