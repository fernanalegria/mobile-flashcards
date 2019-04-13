/**
 * Determines whether the passed in object is empty or not
 * @param  {Object} obj
 * @returns  {boolean} true if the object is empty
 */
export const isEmptyObject = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

/**
 * Retrieves the active card of a quiz
 * @param  {Object} quizzes
 * @param  {Object} decks
 * @param  {Object} cards
 * @param  {number} quizId
 * @param  {boolean} intermediateResults
 * @returns  {(number|Object)} Either the active card id or the card
 *                             and also the intermediate results
 */
export const getActiveCardId = (
  quizzes,
  decks,
  cards,
  quizId,
  intermediateResults = false
) => {
  const quiz = quizzes[quizId];
  const cardIds = decks[quiz.deck].cards.sort(
    (a, b) => cards[b].createdDate - cards[a].createdDate
  );
  const cardId = cardIds[quiz.step];
  return intermediateResults
    ? {
        cardId,
        cardIds,
        quiz
      }
    : cardId;
};

/**
 * Retrieves the current date at midnight
 * @returns  {Date}
 */
export const getMidnight = () => {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
};
