import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.CREATE_DECK]: (state, action) => ({
    ...state,
    [action.deck.id]: action.deck
  }),
  [types.DELETE_DECK]: (state, action) => {
    const { [action.id]: value, ...restOfState } = state;
    return restOfState;
  },
  [types.RECEIVE_DECKS]: (state, action) => ({
    ...state,
    ...action.decks
  })
});
