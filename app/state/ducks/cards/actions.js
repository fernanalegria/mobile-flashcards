import { saveCard, fetchCards } from 'server/api';
import * as types from './types';

const addCard = (card, deckId) => ({
  type: types.ADD_CARD,
  card,
  deckId
});

export const handleAddCard = (card, deckId) => dispatch =>
  saveCard(card, deckId).then(result => {
    dispatch(addCard(result, deckId));
    return Promise.resolve(result);
  });

const receiveCards = cards => ({
  type: types.RECEIVE_CARDS,
  cards
});

export const handleReceiveCards = () => dispatch =>
  fetchCards().then(cards => {
    dispatch(receiveCards(cards));
    return Promise.resolve(cards);
  });
