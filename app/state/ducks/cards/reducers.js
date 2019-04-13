import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.ADD_CARD]: (state, action) => ({
    ...state,
    [action.card.id]: action.card
  }),
  [types.RECEIVE_CARDS]: (state, action) => ({
    ...state,
    ...action.cards
  })
});
