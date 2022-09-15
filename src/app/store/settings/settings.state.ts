import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { MessageService } from 'app/services/message.service';
import { SettingsService } from 'app/services/settings.service';
import { catchError, of, tap } from 'rxjs';
import { SetLoading } from '../application/application.actions';
import {
  SettingsRequest,
  SettingsReset,
  SettingsStateModel,
} from './settings.actions';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    status: null,
    hintSku: null,
    pictures: null,
    condition: null,
    listing_type_id: null,
    price_percent_ml: null,
    price_percent_web: null,
  },
})
@Injectable()
export class SettingsState {
  constructor(
    private settingsService: SettingsService,
    private store: Store,
    private messageService: MessageService,
    private router: Router
  ) {}

  @Action(SettingsRequest)
  async settingsRequest(ctx: StateContext<SettingsStateModel>) {
    return this.settingsService.getSettings().pipe(
      tap((settings) => ctx.patchState(settings)),
      tap(() => ctx.dispatch(new SetLoading(false))),
      tap(() => this.router.navigate(['/home'])),
      catchError((err: HttpErrorResponse) => {
        console.log('Err settings', err);
        this.store.dispatch(new SetLoading(false));
        if (err.status !== HttpStatusCode.NotFound)
          this.messageService.showMsg(
            'Error obteniendo la configuración',
            'error'
          );
        this.router.navigate(['/home']);
        return of(err);
      })
    );
  }

  @Action(SettingsReset)
  settingsReset(ctx: StateContext<SettingsStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      status: null,
      hintSku: null,
      pictures: null,
      condition: null,
      listing_type_id: null,
      price_percent_ml: null,
      price_percent_web: null,
    });
  }
}
