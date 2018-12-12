import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TokenTableStateModel, TokenTableItem } from './token-table.state.model';
import { AddressInfoSuccessAction } from './address-info.actions';

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
    action.addressInfo.tokens.map((token) => newState.tokens.push(
      {
        symbol: token.tokenInfo.symbol,
        name: token.tokenInfo.name
      }
    ));
    ctx.patchState(newState);
  }
}
