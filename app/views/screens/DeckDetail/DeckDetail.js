import React, { Component } from 'react';
import { Text } from 'react-native';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  });

  render() {
    return (
        <Text>Deck Detail</Text>
    );
  }
}

export default DeckDetail;
