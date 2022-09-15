// TODO: CONSTANTE PARA ROLES
export interface AuthStateModel {
  token?: string | null;
  id?: number | null;
  email?: string | null;
  role?: string | null;
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

export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {
    console.log('Action Logout');
  }
}
