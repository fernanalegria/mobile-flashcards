export const isEmptyObject = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

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

export const getMidnight = () => {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  return midnight;
};
