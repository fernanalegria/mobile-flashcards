import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Form, Button } from '../../common';
import baseStyles from '../../styles';

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('deckTitle')} - Add Card`
  });

  state = {
    question: '',
    answer: ''
  };

  onQuestionChange = question => {
    this.setState({
      question
    });
  };

  onAnswerChange = answer => {
    this.setState({
      answer
    });
  };

  submit = () => {};

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={baseStyles.container}>
        <Form>
          <TextInput
            value={question}
            style={baseStyles.textInput}
            onChangeText={this.onQuestionChange}
            placeholder="What's your question?"
            clearButtonMode="always"
          />
          <TextInput
            value={answer}
            style={baseStyles.textInput}
            onChangeText={this.onAnswerChange}
            placeholder="What's the answer?"
            clearButtonMode="always"
          />
          <Button text="Add" style={{ margin: 25 }} onPress={this.submit} />
        </Form>
      </KeyboardAvoidingView>
    );
  }
}

export default NewCard;
