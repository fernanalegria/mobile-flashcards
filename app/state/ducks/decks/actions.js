import { saveDeck, deleteDeck, fetchDecks } from 'server/api';
import * as types from './types';

/**
 * Action creator for the type CREATE_DECK
 * @param  {Object} deck
 * @returns  {Object} Action
 */
const createDeck = deck => ({
  type: types.CREATE_DECK,
  deck
});

/**
 * Makes a request to create a new deck and stores it in Redux
 * @param  {string} title
 * @returns  {Promise}
 */
export const handleCreateDeck = title => dispatch =>
  saveDeck(title).then(deck => {
    dispatch(createDeck(deck));
    return Promise.resolve(deck);
  });

/**
 * Action creator for the type DELETE_DECK
 * @param  {number} id
 * @returns  {Object} Action
 */
const removeDeck = id => ({
  type: types.DELETE_DECK,
  id
});

/**
 * Makes a request to remove a deck from the AsyncStorage
 * and then removes it also from Redux
 * @param  {number} id
 * @returns  {Promise}
 */
export const handleRemoveDeck = id => dispatch =>
  deleteDeck(id).then(id => {
    dispatch(removeDeck(id));
    return Promise.resolve(id);
  });

/**
 * Action creator for the type RECEIVE_DECKS
 * @param  {Object} decks
 * @returns  {Object} Action
 */
const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  decks
});

/**
 * Makes a request to fetch the existing decks
 * from the AsyncStorage and stores them in Redux
 * @returns  {Promise}
 */
export const handleReceiveDecks = () => dispatch =>
  fetchDecks().then(decks => {
    dispatch(receiveDecks(decks));
    return Promise.resolve(decks);
  });
