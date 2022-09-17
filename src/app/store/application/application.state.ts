import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { SetLoading } from './application.actions';
import { IApplicationState } from '@models/index';

@State<IApplicationState>({
  name: 'app',
  defaults: {
    loading: false,
  },
})
@Injectable()
export class ApplicationState {
  constructor() {}

  @Action(SetLoading)
  setLoading(ctx: StateContext<IApplicationState>, action: SetLoading) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: action.loading,
    });
  }

  @Selector()
  static isLoading(state: IApplicationState): boolean {
    return state.loading;
  }
}
