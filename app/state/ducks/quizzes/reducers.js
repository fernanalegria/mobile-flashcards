import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.START_QUIZ]: (state, action) => ({
    ...state,
    [action.quiz.id]: {
      ...action.quiz,
      step: 0
    }
  }),
  [types.UPDATE_QUIZ]: (state, action) => ({
    ...state,
    [action.quiz.id]: {
      ...state[action.quiz.id],
      results: action.quiz.results,
      step: state[action.quiz.id].step + 1
    }
  }),
  [types.RETURN_QUIZ]: (state, action) => ({
    ...state,
    [action.id]: {
      ...state[action.id],
      step: state[action.id].step - 1
    }
  })
});
