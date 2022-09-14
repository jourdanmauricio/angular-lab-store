import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '@core/core.module';

/* Components */
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavNotFoundComponent } from './not-found/nav-not-found/nav-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { CurrentProdEffects } from './state/effects/currentProd.effects';
import { UserEffects } from './state/effects/user.effects';
import { SettingsEffects } from './state/effects/settings.effects';
import { ApplicationEffects } from './state/effects/application.effects';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    CoreModule,
    MatSnackBarModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([
      CurrentProdEffects,
      UserEffects,
      SettingsEffects,
      ApplicationEffects,
    ]),
  ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
