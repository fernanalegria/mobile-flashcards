import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { deckActions } from 'state/decks';
import { connect } from 'react-redux';

class Test extends Component {
  componentDidMount() {
    this.props.dispatch(deckActions.handleCreateDeck('React Deck'));
  }

  render() {
    return <Text>Test</Text>;
  }
}

export default connect(null)(Test);
