import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from 'utils/constants';
import { isEmptyObject } from 'utils/helpers';
import { Notifications, Permissions } from 'expo';
import { getMidnight } from 'utils/helpers';

/**
 * Given an object with ids as properties,
 * returns the next id of the sequence
 * @param  {Object} obj
 * @returns  {number} Id
 */
const generateId = obj =>
  obj && !isEmptyObject(obj) ? Math.max(...Object.keys(obj)) + 1 : 1;

/**
 * Given a key, retrieves the list of items saved in the AsyncStorage
 * @param  {string} key
 * @returns  {Object} Items
 */
const fetchItems = key =>
  AsyncStorage.getItem(key).then(data => (data ? JSON.parse(data) : {}));

/**
 * Saves a new item in the AsyncStorage
 * @param  {string} key
 * @param  {Object} items
 * @param  {number} id
 * @returns  {Object} Saved item
 */
const setItem = (key, items, id) =>
  AsyncStorage.setItem(key, JSON.stringify(items)).then(() => items[id]);

/**
 * Adds a new deck to the list
 * @param  {string} title
 * @param  {Object} decks
 * @returns  {Object} Contains:
 *                      - The deck id
 *                      - The list of decks including the new one
 */
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
        createdDate: new Date().toISOString()
      }
    }
  };
};

/**
 * Adds a new card to the list
 * @param  {string} question
 * @param  {string} answer
 * @param  {Object} cards
 * @returns  {Object} Contains:
 *                      - The card id
 *                      - The list of cards including the new one
 */
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
        createdDate: new Date().toISOString()
      }
    }
  };
};

/**
 * Adds a new quiz to the list
 * @param  {number} deck
 * @param  {Object} quizzes
 * @returns  {Object} Contains:
 *                      - The quiz id
 *                      - The list of quizzes including the new one
 */
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
        startDate: new Date().toISOString()
      }
    }
  };
};

/**
 * Saves a new deck in the AsyncStorage
 * @param  {string} title
 * @returns  {Promise}
 */
export const saveDeck = title =>
  fetchItems(STORAGE_KEYS.decks).then(decks => {
    const { id, newDecks } = mergeDecks(title, decks);
    return setItem(STORAGE_KEYS.decks, newDecks, id);
  });

/**
 * Removes a deck from the AsyncStorage
 * @param  {number} id
 * @returns  {Promise}
 */
export const deleteDeck = id =>
  fetchItems(STORAGE_KEYS.decks).then(decks => {
    delete decks[id];
    return AsyncStorage.setItem(STORAGE_KEYS.decks, JSON.stringify(decks)).then(
      () => id
    );
  });

/**
 * Fetches the existing decks from the AsyncStorage
 * @returns  {Promise}
 */
export const fetchDecks = () => fetchItems(STORAGE_KEYS.decks);

/**
 * Saves a new card in the AsyncStorage
 * @param  {string} question
 * @param  {string} answer
 * @param  {number} deckId
 * @returns  {Promise}
 */
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

/**
 * Fetches the existing cards from the AsyncStorage
 * @returns  {Promise}
 */
export const fetchCards = () => fetchItems(STORAGE_KEYS.cards);

/**
 * Saves a new quiz in the AsyncStorage
 * @param  {number} deckId
 * @returns  {Promise}
 */
export const saveQuiz = deckId =>
  fetchItems(STORAGE_KEYS.quizzes).then(quizzes => {
    const { id, newQuizzes } = mergeQuizzes(deckId, quizzes);
    return setItem(STORAGE_KEYS.quizzes, newQuizzes, id);
  });

/**
 * Saves the answer to one of the questions in a quiz
 * @param  {number} id
 * @param  {number} cardId
 * @param  {boolean} result
 * @returns  {Promise}
 */
export const saveQuizResult = (id, cardId, result) =>
  fetchItems(STORAGE_KEYS.quizzes).then(quizzes => {
    quizzes[id].results[cardId] = result;
    return setItem(STORAGE_KEYS.quizzes, quizzes, id);
  });

/**
 * Fetches the existing quizzes from the AsyncStorage
 * @returns  {Promise}
 */
export const fetchQuizzes = () => fetchItems(STORAGE_KEYS.quizzes);

/**
 * Cancels all the notifications
 * and removes the options from the AsyncStorage
 * @returns  {Promise}
 */
export const clearLocalNotifications = () =>
  AsyncStorage.removeItem(STORAGE_KEYS.notifications).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );

/**
 * Returns the definition of a predefined notification
 * @returns  {Object} Notification
 */
const createNotification = () => ({
  title: 'Keep on the good work!',
  body: "📖 Study daily and you'll achieve all your goals!",
  ios: {
    sound: true
  },
  android: {
    sticky: false
  }
});

/**
 * Schedules a new notifications
 * and saves the options in the AsyncStorage
 * @returns  {Promise}
 */
const setNotification = () => {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
    if (status === 'granted') {
      const time = new Date();
      time.setMinutes(time.getMinutes() + 1);
      const options = { time };
      Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        options
      );

      AsyncStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(options));
    }
  });
};

/**
 * Checks for existing notifications
 * and creates a new one if there isn't another one for the same day
 * @returns  {Promise}
 */
export const setLocalNotification = () => {
  AsyncStorage.getItem(STORAGE_KEYS.notifications)
    .then(JSON.parse)
    .then(data => {
      if (data) {
        const notificationTime = data.time;
        if (notificationTime < getMidnight()) {
          clearLocalNotifications().then(setNotification);
        }
      } else {
        setNotification();
      }
    });
};
