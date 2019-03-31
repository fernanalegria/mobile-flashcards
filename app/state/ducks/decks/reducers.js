import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.CREATE_DECK]: (state, action) => ({
    ...state,
    [action.deck.id]: action.deck
  })
});
