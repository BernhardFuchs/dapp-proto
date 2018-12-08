import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddressInfoStateModel } from './address-info.state.model';
import { AddressInfoFetchAction, AddressInfoSuccessAction, AddressInfoErrorAction } from './address-info.actions';
import { AddressInfoService } from '../services/';
import { tap, catchError } from 'rxjs/operators';

@State<AddressInfoStateModel>({
  name: 'addressInfo',
  defaults: {
    address: '',
    balanceWei: ''
  }
})
export class AddressInfoState {

  constructor(private addressInfoService: AddressInfoService) {}

  @Selector()
  static getAddress(state: AddressInfoStateModel) {
    return state.address;
  }

  @Selector()
  static getBalance(state: AddressInfoStateModel) {
    return state.balanceWei;
  }

  @Action(AddressInfoFetchAction)
  async fetchAddressInfo(ctx: StateContext<AddressInfoStateModel>, action: AddressInfoFetchAction) {
    ctx.setState({
      address: '',
      balanceWei: ''
    });
    await this.addressInfoService.fetchBalance(action.address).then(
      (res: string) => ctx.dispatch(new AddressInfoSuccessAction(action.address, res)),
      err => ctx.dispatch(new AddressInfoErrorAction(err))
    );
  }

  @Action(AddressInfoSuccessAction)
  addAddressInfoToState(ctx: StateContext<AddressInfoStateModel>, action: AddressInfoSuccessAction) {
    ctx.setState({
      address: action.address,
      balanceWei: action.balanceWei
    });
  }
}
