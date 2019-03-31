import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from 'utils/constants';

const mergeDecks = (title, decks) => {
  const id = decks ? Math.max(...Object.keys(decks)) + 1 : 1;
  return {
    id,
    newDecks: {
      ...decks,
      [id]: {
        id,
        title,
        cards: []
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
