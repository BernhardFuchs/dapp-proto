export class ChainInfoFetchAction {
  static readonly type = '[Overview] ChainInfoFetch';
  constructor(public payload: any) {}
}

export class ChainInfoSuccessAction {
  static readonly type = '[Overview] ChainInfoSuccess';
  constructor(public response: any) {}
}

export class ChainInfoErrorAction {
  static readonly type = '[Overview] ChainInfoError';
  constructor(public error: any) {}
}
