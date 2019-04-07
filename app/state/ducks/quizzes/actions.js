import { saveQuiz, saveQuizResult } from 'server/api';
import * as types from './types';

const startQuiz = quiz => ({
  type: types.START_QUIZ,
  quiz
});

export const handleStartQuiz = deckId => dispatch =>
  saveQuiz(deckId).then(quiz => {
    dispatch(startQuiz(quiz));
    return Promise.resolve(quiz);
  });

const updateQuiz = quiz => ({
  type: types.UPDATE_QUIZ,
  quiz
});

export const handleUpdateQuiz = (id, cardId, result) => dispatch =>
  saveQuizResult(id, cardId, result).then(quiz => {
    dispatch(updateQuiz(quiz));
    return Promise.resolve(quiz);
  });

export const returnQuiz = id => ({
  type: types.RETURN_QUIZ,
  id
});
