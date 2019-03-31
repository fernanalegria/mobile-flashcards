import { combineReducers } from 'redux';
import { default as decks } from './decks';
import { default as cards } from './cards';
import { default as quizzes } from './quizzes';

export default combineReducers({
  decks,
  cards,
  quizzes
});
