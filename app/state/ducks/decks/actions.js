import { saveDeck } from 'server/api';
import * as types from './types';

export const createDeck = deck => ({
  type: types.CREATE_DECK,
  deck
});

export const handleCreateDeck = title => dispatch =>
  saveDeck(title).then(deck => {
    dispatch(createDeck(deck));
    return deck;
  });
