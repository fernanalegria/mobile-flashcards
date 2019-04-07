import React, { Component } from 'react';
import { Text } from 'react-native';

class Question extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('deckTitle')} - Quiz`
  });

  render() {
    return <Text>Question</Text>;
  }
}

export default Question;
