import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AuthState } from './auth/auth.state';
import { ApplicationState } from './application/application.state';
import { SettingsState } from './settings/settings.state';
import { CurrentProdState } from './currentProd/currentProd.state';
import { ProdMlState } from './prodMl/prodMl.state';
import { ProdWebState } from './prodWeb/prodWeb.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(
      [
        AuthState,
        ApplicationState,
        SettingsState,
        CurrentProdState,
        ProdMlState,
        ProdWebState,
      ],
      {
        developmentMode: true,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
})
export class StoreModule {}
