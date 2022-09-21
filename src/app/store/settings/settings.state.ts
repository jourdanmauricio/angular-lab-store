import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Action,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { MessageService } from 'app/services/message.service';
import { SettingsService } from 'app/services/settings.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { SetLoading } from '../application/application.actions';
import {
  SettingsRequest,
  SettingsReset,
  SettingsUpdate,
} from './settings.actions';
import { ISettingsState } from '@models/index';

@State<ISettingsState>({
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
    private messageService: MessageService
  ) {}

  @Selector()
  static settingsPictures(state: ISettingsState): any {
    return state.pictures;
  }

  @Action(SettingsRequest)
  async settingsRequest(ctx: StateContext<ISettingsState>) {
    return this.settingsService.getSettings().pipe(
      tap((settings) => ctx.patchState(settings)),
      tap(() => ctx.dispatch(new SetLoading(false))),
      catchError((err: HttpErrorResponse) => {
        this.store.dispatch(new SetLoading(false));
        if (err.status !== HttpStatusCode.NotFound)
          this.messageService.showMsg(
            'Error obteniendo la configuración',
            'error'
          );
        return of(err);
      })
    );
  }

  @Action(SettingsUpdate)
  settingsUpdate(
    ctx: StateContext<ISettingsState>,
    { payload }: SettingsUpdate
  ) {
    this.store.dispatch(new SetLoading(true));
    return this.settingsService
      .updateSettings(payload.userId, payload.settings)
      .pipe(
        tap(() =>
          this.messageService.showMsg('Configuración Modificada', 'success')
        ),
        tap(() => this.store.dispatch(new SetLoading(false))),
        tap((settings) => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            ...payload.settings,
          });
        }),
        catchError((err) => {
          this.store.dispatch(new SetLoading(false));
          this.messageService.showMsg(
            'Error modificando la configuración',
            'error'
          );
          return of(err);
        })
      );
  }

  @Action(SettingsReset)
  settingsReset(ctx: StateContext<ISettingsState>) {
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
