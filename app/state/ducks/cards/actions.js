import { saveCard, fetchCards } from 'server/api';
import * as types from './types';

/**
 * Action creator for the type ADD_CARD
 * @param  {Object} card
 * @param  {number} deckId
 * @returns  {Object} Action
 */
const addCard = (card, deckId) => ({
  type: types.ADD_CARD,
  card,
  deckId
});

/**
 * Makes a request to the API to save a new card and stores it in Redux
 * @param  {Object} card
 * @param  {number} deckId
 * @returns  {Promise}
 */
export const handleAddCard = (card, deckId) => dispatch =>
  saveCard(card, deckId).then(result => {
    dispatch(addCard(result, deckId));
    return Promise.resolve(result);
  });

/**
 * Action creator for the type RECEIVE_CARDS
 * @param  {Object} cards
 * @returns  {Object} Action
 */
const receiveCards = cards => ({
  type: types.RECEIVE_CARDS,
  cards
});

/**
 * Makes a request to fetch the existing cards
 * from the AsyncStorage and stores them in Redux
 * @returns  {Promise}
 */
export const handleReceiveCards = () => dispatch =>
  fetchCards().then(cards => {
    dispatch(receiveCards(cards));
    return Promise.resolve(cards);
  });
