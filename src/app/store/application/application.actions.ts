export interface Application {
  loading: boolean;
  // message: string;
}

export interface ApplicationStateModel {
  app: Application | null;
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
