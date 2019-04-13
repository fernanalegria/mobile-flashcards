/**
 * Transforms a list into an Object
 * @param  {Array} items
 * @returns  {Object}
 */
const getRoutes = items =>
  items.reduce((accumulator, item) => ({ ...accumulator, [item]: item }), {});

export const PLATFORM = {
  iOS: 'ios',
  Android: 'android'
};

export const ROUTES = getRoutes([
  'Home',
  'DeckList',
  'NewDeck',
  'DeckDetail',
  'NewCard',
  'Quiz',
  'QuizQuestion',
  'QuizAnswer',
  'QuizScore'
]);
