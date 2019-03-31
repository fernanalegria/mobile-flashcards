import { saveDeck, deleteDeck, fetchDecks } from 'server/api';
import * as types from './types';

const createDeck = deck => ({
  type: types.CREATE_DECK,
  deck
});

export const handleCreateDeck = title => dispatch =>
  saveDeck(title).then(deck => {
    dispatch(createDeck(deck));
    return Promise.resolve(deck);
  });

const removeDeck = id => ({
  type: types.DELETE_DECK,
  id
});

export const handleRemoveDeck = id => dispatch =>
  deleteDeck(id).then(id => {
    dispatch(removeDeck(id));
    return Promise.resolve(id);
  });

const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  decks
});

export const handleReceiveDecks = () => dispatch =>
  fetchDecks().then(decks => {
    dispatch(receiveDecks(decks));
    return Promise.resolve(decks);
  });
