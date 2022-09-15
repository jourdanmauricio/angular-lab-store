import { Injectable } from '@angular/core';
import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import {
  ApplicationStateModel,
  SetLoading,
  // SetMessage,
} from './application.actions';

@State<ApplicationStateModel>({
  name: 'application',
  // defaults: {
  //   app: null,
  //   // loading: false,
  //   // message: '',
  // },
  // children: [ApplicationState],
})
@Injectable()
export class ApplicationState {
  constructor(private store: Store) {}

  @Action(SetLoading)
  setLoading(ctx: StateContext<ApplicationStateModel>, action: SetLoading) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      app: { loading: action.loading },
      // loading: action.loading
    });
  }

  // @Action(SetMessage)
  // setMessage(ctx: StateContext<ApplicationStateModel>, action: SetMessage) {
  //   const state = ctx.getState();
  //   ctx.setState({
  //     ...state,
  //     message: action.message,
  //   });
  // }

  @Selector()
  static isLoading(state: ApplicationStateModel): boolean {
    return state.app ? state.app.loading : false;
  }
}
