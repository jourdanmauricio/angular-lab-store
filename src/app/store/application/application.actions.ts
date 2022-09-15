export interface ApplicationStateModel {
  loading: boolean;
  // message: string;
}

export class SetLoading {
  static readonly type = '[Application] Set Loading';
  constructor(public loading: boolean) {}
}

// export class SetMessage {
//   static readonly type = '[Application] Set Message';
//   constructor(public message: string) {}
// }
