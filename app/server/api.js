import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from 'utils/constants';
import { isEmptyObject } from 'utils/helpers';

const generateId = obj =>
  obj && !isEmptyObject(obj) ? Math.max(...Object.keys(obj)) + 1 : 1;

const fetchItems = key =>
  AsyncStorage.getItem(key).then(data => (data ? JSON.parse(data) : {}));

const mergeDecks = (title, decks) => {
  const id = generateId(decks);
  return {
    id,
    newDecks: {
      ...decks,
      [id]: {
        id,
        title,
        cards: [],
        timestamp: new Date()
      }
    }
  };
};

const mergeCards = (question, answer, cards) => {
  const id = generateId(cards);
  return {
    id,
    newCards: {
      ...cards,
      [id]: {
        id,
        question,
        answer,
        timestamp: new Date()
      }
    }
  };
};

export const saveDeck = title =>
  AsyncStorage.getItem(STORAGE_KEYS.decks)
    .then(JSON.parse)
    .then(decks => {
      const { id, newDecks } = mergeDecks(title, decks);
      return AsyncStorage.setItem(
        STORAGE_KEYS.decks,
        JSON.stringify(newDecks)
      ).then(() => newDecks[id]);
    });

export const deleteDeck = id =>
  AsyncStorage.getItem(STORAGE_KEYS.decks)
    .then(JSON.parse)
    .then(decks => {
      delete decks[id];
      return AsyncStorage.setItem(
        STORAGE_KEYS.decks,
        JSON.stringify(decks)
      ).then(() => id);
    });

export const fetchDecks = () => fetchItems(STORAGE_KEYS.decks);

export const saveCard = ({ question, answer }, deckId) =>
  AsyncStorage.getItem(STORAGE_KEYS.cards)
    .then(JSON.parse)
    .then(cards => {
      const { id, newCards } = mergeCards(question, answer, cards);
      return AsyncStorage.setItem(
        STORAGE_KEYS.cards,
        JSON.stringify(newCards)
      ).then(() =>
        AsyncStorage.getItem(STORAGE_KEYS.decks)
          .then(JSON.parse)
          .then(decks => {
            decks[deckId].cards.push(id);
            return AsyncStorage.setItem(
              STORAGE_KEYS.decks,
              JSON.stringify(decks)
            ).then(() => newCards[id]);
          })
      );
    });

export const fetchCards = () => fetchItems(STORAGE_KEYS.cards);
