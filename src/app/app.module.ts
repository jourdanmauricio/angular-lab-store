import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '@core/core.module';
import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavNotFoundComponent } from './not-found/nav-not-found/nav-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './store/auth/auth.state';
import { ApplicationState } from './store/application/application.state';
import { SettingsState } from './store/settings/settings.state';
import { CurrentProdState } from './store/currentProd/currentProd.state';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    CoreModule,
    MatSnackBarModule,
    NgxsModule.forRoot(
      [AuthState, ApplicationState, SettingsState, CurrentProdState],
      {
        developmentMode: true,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
  ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
