import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const getUser = createAction(
  '[Login Page] Get User',
  props<{ user: User }>()
);
