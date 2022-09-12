import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Components */
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
// import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavNotFoundComponent],
  imports: [
    // SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([
      CurrentProdEffects,
      UserEffects,
      SettingsEffects,
      ApplicationEffects,
    ]),
  ],
  // exports: [FilterCategoriesPipe],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
