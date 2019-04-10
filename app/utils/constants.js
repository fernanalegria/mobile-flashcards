const MAIN_KEY = 'UdaciFlashcards';

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
