import * as types from './types';
import { createReducer } from '../../utils';

const insertQuiz = (state, action) => ({
  ...state,
  [action.quiz.id]: action.quiz
});

export default createReducer({})({
  [types.START_QUIZ]: insertQuiz,
  [types.UPDATE_QUIZ]: insertQuiz
});
