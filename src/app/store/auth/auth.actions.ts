import { ROLES } from '@core/constants/enums';

export interface AuthStateModel {
  id: number | null;
  email: string | null;
  role: ROLES | null;
  token: string | null;
  ml_id: number | null;
  nickname: string | null;
  access_token: string | null;
  refresh_token: string | null;
}

export class LoginRequestAttempt {
  static readonly type = '[Auth] Login Attempt';
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginRequestSuccess {
  static readonly type = '[Auth] Request Success';
  constructor(public token: string | null) {}
}

export class UserRequest {
  static readonly type = '[Auth] User Request';
}

export class UserMlRequest {
  static readonly type = '[Auth] UserMl Request';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
