import { saveQuiz, saveQuizResult, fetchQuizzes } from 'server/api';
import * as types from './types';

/**
 * Action creator for the type START_QUIZ
 * @param  {Object} quiz
 * @returns  {Object} Action
 */
const startQuiz = quiz => ({
  type: types.START_QUIZ,
  quiz
});

/**
 * Makes a request to create a new quiz and stores it in Redux
 * @param  {number} id
 * @param  {number} cardId
 * @param  {boolean} result
 * @returns  {Promise}
 */
export const handleStartQuiz = deckId => dispatch =>
  saveQuiz(deckId).then(quiz => {
    dispatch(startQuiz(quiz));
    return Promise.resolve(quiz);
  });

/**
 * Action creator for the type UPDATE_QUIZ
 * @param  {Object} quiz
 * @returns  {Object} Action
 */
const updateQuiz = quiz => ({
  type: types.UPDATE_QUIZ,
  quiz
});

/**
 * Makes a request to save the answer to a question
 * and stores the response in Redux
 * @param  {number} id
 * @param  {number} cardId
 * @param  {boolean} result
 * @returns  {Promise}
 */
export const handleUpdateQuiz = (id, cardId, result) => dispatch =>
  saveQuizResult(id, cardId, result).then(quiz => {
    dispatch(updateQuiz(quiz));
    return Promise.resolve(quiz);
  });

/**
 * Action creator for the type RETURN_QUIZ
 * @param  {number} id
 * @returns  {Object} Action
 */
export const returnQuiz = id => ({
  type: types.RETURN_QUIZ,
  id
});

/**
 * Action creator for the type RECEIVE_QUIZZES
 * @param  {Object} quizzes
 * @returns  {Object} Action
 */
const receiveQuizzes = quizzes => ({
  type: types.RECEIVE_QUIZZES,
  quizzes
});

/**
 * Makes a request to fetch the existing quizzes
 * from the AsyncStorage and stores them in Redux
 * @returns  {Promise}
 */
export const handleReceiveQuizzes = () => dispatch =>
  fetchQuizzes().then(quizzes => {
    dispatch(receiveQuizzes(quizzes));
    return Promise.resolve(quizzes);
  });
