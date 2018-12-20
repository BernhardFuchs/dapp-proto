import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TokenTableStateModel, TokenTableItem } from './token-table.state.model';
import { AddressInfoSuccessAction, AddressInfoFetchAction } from './address-info.actions';
import { isUndefined as _isUndefined } from 'lodash';

export const defaultState: TokenTableStateModel = {
  tokens: []
};

@State<TokenTableStateModel>({
  name: 'tokenTable',
  ...defaultState
})
export class TokenTableState {

  @Selector()
  static getTokenTableItems(state: TokenTableStateModel): TokenTableItem[] {
    return state.tokens;
  }

  @Selector()
  static getTokensLength(state: TokenTableStateModel): number {
    return state.tokens.length;
  }

  @Action(AddressInfoSuccessAction)
  mapTokenTableData(ctx: StateContext<TokenTableStateModel>, action: AddressInfoSuccessAction) {
    const newState: TokenTableStateModel = {tokens: []};
    if (!_isUndefined(action.addressInfo.tokens)) {
      action.addressInfo.tokens.map((token) => newState.tokens.push(
        {
          symbol: token.tokenInfo.symbol,
          name: token.tokenInfo.name
        }
      ));
    }
    ctx.patchState(newState);
  }

  @Action(AddressInfoFetchAction)
  reset(ctx: StateContext<TokenTableStateModel>) {
    ctx.setState(defaultState);
  }
}
