import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Form, Button } from '../../common';
import baseStyles from '../../styles';
import { cardActions } from 'state/cards';
import { connect } from 'react-redux';

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

  submit = () => {
    const { question, answer } = this.state;
    const { navigation, addCardToDeck } = this.props;
    addCardToDeck(question, answer, navigation.getParam('deckId')).then(() => {
      navigation.goBack();
    });
  };

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
          <Button
            text="Add"
            style={{ margin: 25 }}
            onPress={this.submit}
            disabled={!question || !answer}
          />
        </Form>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = {
  addCardToDeck: (question, answer, deckId) =>
    cardActions.handleAddCard({ question, answer }, deckId)
};

export default connect(
  null,
  mapDispatchToProps
)(NewCard);
