import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { deckActions } from 'state/decks';
import { cardActions } from 'state/cards';
import { connect } from 'react-redux';
import { STORAGE_KEYS } from 'utils/constants';

class Test extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    Promise.all([
      dispatch(deckActions.handleReceiveDecks()),
      dispatch(cardActions.handleReceiveCards())
    ]);
  }

  render() {
    return <Text>Test</Text>;
  }
}

export default connect(null)(Test);
