import { combineReducers } from 'redux';
import { default as decks } from './decks';
import { default as cards } from './cards';

export default combineReducers({
  decks,
  cards
});
