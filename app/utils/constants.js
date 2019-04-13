const MAIN_KEY = 'UdaciFlashcards';

/**
 * Formats keys to be unique for this app
 * @param  {Array} items
 * @returns  {Object}
 */
const generateKeys = items =>
  items.reduce(
    (accumulator, item) => ({ ...accumulator, [item]: `${MAIN_KEY}:${item}` }),
    {}
  );

export const STORAGE_KEYS = generateKeys([
  'cards',
  'decks',
  'quizzes',
  'notifications'
]);
