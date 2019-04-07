import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../../styles';
import { MaterialIcons } from '@expo/vector-icons';
import AnswerButton from './AnswerButton';
import AnswerDisplay from './AnswerDisplay';
import { connect } from 'react-redux';
import { quizActions } from 'state/quizzes';
import { ROUTES } from '../../../utils/constants';
import { getActiveCardId } from 'utils/helpers';

class Answer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('deckTitle')} - Quiz`
  });

  saveResult = result => {
    const { navigation, updateQuiz, quizId, cardId, deckTitle } = this.props;
    updateQuiz(quizId, cardId, result).then(() => {
      navigation.push(ROUTES.QuizNextQuestion, {
        quizId,
        deckTitle
      });
    });
  };

  render() {
    const { fontSize, color } = baseStyles.buttonContent;

    return (
      <View style={styles.container}>
        <AnswerDisplay answer={this.props.answer} />
        <View style={styles.buttonContainer}>
          <AnswerButton
            text="Yes"
            icon={
              <MaterialIcons
                name="check-circle"
                size={fontSize}
                color={color}
              />
            }
            onPress={() => {
              this.saveResult(true);
            }}
          />
          <AnswerButton
            text="No"
            icon={<MaterialIcons name="cancel" size={fontSize} color={color} />}
            onPress={() => {
              this.saveResult(false);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    ...baseStyles.row,
    backgroundColor: colors.purple
  }
});

const mapStateToProps = ({ quizzes, decks, cards }, { navigation }) => {
  const quizId = navigation.getParam('quizId');
  const cardId = getActiveCardId(quizzes, decks, cards, quizId);

  return {
    cardId,
    quizId,
    deckTitle: navigation.getParam('deckTitle'),
    answer: cards[cardId].answer
  };
};

const mapDispatchToProps = {
  updateQuiz: (id, cardId, result) =>
    quizActions.handleUpdateQuiz(id, cardId, result)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
