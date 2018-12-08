export class AddressInfoFetchAction {
  static readonly type = '[Address Component] Fetch Address Info';
  constructor(public address: string) {}
}

export class AddressInfoSuccessAction {
  static readonly type = '[Web3 Api] Address Info Success';
  constructor(public address: string, public balanceWei: string) {}
}

export class AddressInfoErrorAction {
  static readonly type = '[Web3 Api] Address Info Error';
  constructor(public error: any) {}
}
