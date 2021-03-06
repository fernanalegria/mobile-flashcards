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
import { setQuizTitle } from '../../../utils/helpers';
import { QuizStep } from '../../../common';
import { func, number, string, bool } from 'prop-types';

class Answer extends Component {
  static propTypes = {
    updateQuiz: func.isRequired,
    quizId: number.isRequired,
    cardId: number,
    deckTitle: string.isRequired,
    current: number.isRequired,
    total: number.isRequired,
    currentResult: bool,
    answer: string
  };

  static navigationOptions = setQuizTitle;

  /**
   * Calls Redux to save the guess and moves on through the quiz
   * @param  {boolean} result
   */
  saveResult = result => {
    const {
      navigation,
      updateQuiz,
      quizId,
      cardId,
      deckTitle,
      current,
      total
    } = this.props;
    updateQuiz(quizId, cardId, result).then(() => {
      navigation.push(
        current === total ? ROUTES.QuizScore : ROUTES.QuizQuestion,
        {
          quizId,
          deckTitle
        }
      );
    });
  };

  render() {
    const { fontSize, color } = baseStyles.buttonContent;
    const { currentResult, answer, current, total } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {current <= total && <QuizStep current={current} total={total} />}
        <View style={styles.container}>
          <AnswerDisplay answer={answer ? answer : ''} />
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
              color={
                currentResult === true ? colors.doveGray : colors.doveGrayShadow
              }
            />
            <AnswerButton
              text="No"
              icon={
                <MaterialIcons name="cancel" size={fontSize} color={color} />
              }
              onPress={() => {
                this.saveResult(false);
              }}
              color={
                currentResult === false
                  ? colors.doveGray
                  : colors.doveGrayShadow
              }
            />
          </View>
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
    backgroundColor: colors.blueWood
  }
});

const mapStateToProps = ({ quizzes, decks, cards }, { navigation }) => {
  const quizId = navigation.getParam('quizId');
  const { cardId, cardIds, quiz } = getActiveCardId(
    quizzes,
    decks,
    cards,
    quizId,
    true
  );

  return {
    cardId,
    quizId,
    deckTitle: navigation.getParam('deckTitle'),
    answer: cardId ? cards[cardId].answer : null,
    currentResult: cardId ? quizzes[quizId].results[cardId] : null,
    current: quiz.step + 1,
    total: cardIds.length
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
