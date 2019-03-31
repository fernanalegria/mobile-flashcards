import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { deckActions } from 'state/decks';
import { connect } from 'react-redux';
import { STORAGE_KEYS } from 'utils/constants';

class Test extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(deckActions.handleReceiveDecks()).then(() => {
      dispatch(deckActions.handleCreateDeck('React Deck'));
    });
  }

  render() {
    return <Text>Test</Text>;
  }
}

export default connect(null)(Test);
