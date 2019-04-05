import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from 'utils/constants';
import { isEmptyObject } from 'utils/helpers';

const generateId = obj =>
  obj && !isEmptyObject(obj) ? Math.max(...Object.keys(obj)) + 1 : 1;

const fetchItems = key =>
  AsyncStorage.getItem(key).then(data => (data ? JSON.parse(data) : {}));

const setItem = (key, items, id) =>
  AsyncStorage.setItem(key, JSON.stringify(items)).then(() => items[id]);

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
        createdDate: (new Date()).toISOString()
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
        createdDate: (new Date()).toISOString()
      }
    }
  };
};

const mergeQuizzes = (deck, quizzes) => {
  const id = generateId(quizzes);
  return {
    id,
    newQuizzes: {
      ...quizzes,
      [id]: {
        id,
        deck,
        results: {},
        startDate: (new Date()).toISOString()
      }
    }
  };
};

export const saveDeck = title =>
  fetchItems(STORAGE_KEYS.decks).then(decks => {
    const { id, newDecks } = mergeDecks(title, decks);
    return setItem(STORAGE_KEYS.decks, newDecks, id);
  });

export const deleteDeck = id =>
  fetchItems(STORAGE_KEYS.decks).then(decks => {
    delete decks[id];
    return AsyncStorage.setItem(STORAGE_KEYS.decks, JSON.stringify(decks)).then(
      () => id
    );
  });

export const fetchDecks = () => fetchItems(STORAGE_KEYS.decks);

export const saveCard = ({ question, answer }, deckId) =>
  fetchItems(STORAGE_KEYS.cards).then(cards => {
    const { id, newCards } = mergeCards(question, answer, cards);
    return AsyncStorage.setItem(
      STORAGE_KEYS.cards,
      JSON.stringify(newCards)
    ).then(() =>
      fetchItems(STORAGE_KEYS.decks).then(decks => {
        decks[deckId].cards.push(id);
        return AsyncStorage.setItem(
          STORAGE_KEYS.decks,
          JSON.stringify(decks)
        ).then(() => newCards[id]);
      })
    );
  });

export const fetchCards = () => fetchItems(STORAGE_KEYS.cards);

export const saveQuiz = deckId =>
  fetchItems(STORAGE_KEYS.quizzes).then(quizzes => {
    const { id, newQuizzes } = mergeQuizzes(deckId, quizzes);
    return setItem(STORAGE_KEYS.quizzes, newQuizzes, id);
  });

export const saveQuizResult = (id, cardId, result) =>
  fetchItems(STORAGE_KEYS.quizzes).then(quizzes => {
    quizzes[id].results[cardId] = result;
    return setItem(STORAGE_KEYS.quizzes, quizzes, id);
  });
