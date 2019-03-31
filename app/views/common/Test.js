import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { deckActions } from 'state/decks';
import { cardActions } from 'state/cards';
import { quizActions } from 'state/quizzes';
import { connect } from 'react-redux';
import { STORAGE_KEYS } from 'utils/constants';

class Test extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    Promise.all([
      dispatch(deckActions.handleReceiveDecks()),
      dispatch(cardActions.handleReceiveCards())
    ]).then(() => {
      dispatch(quizActions.handleStartQuiz(1)).then(quiz => {
        dispatch(quizActions.handleUpdateQuiz(quiz.id, 1, true));
      });
    });
  }

  render() {
    return <Text>Test</Text>;
  }
}

export default connect(null)(Test);
