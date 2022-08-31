import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Components */
import { NotFoundComponent } from './not-found/not-found.component';
import { NavNotFoundComponent } from './components/nav-not-found/nav-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MatSnackBarModule,
    // {
    //   provide: MatDialogRef,
    //   useValue: {},
    // },
    // DialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
