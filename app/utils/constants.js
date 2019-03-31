const MAIN_KEY = 'UdaciFlashcards';

const generateKey = item => ({ [item]: `${MAIN_KEY}:${item}` });

export const STORAGE_KEYS = {
  ...generateKey('cards'),
  ...generateKey('decks'),
  ...generateKey('quizzes')
};
