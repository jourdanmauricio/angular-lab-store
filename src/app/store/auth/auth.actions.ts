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
