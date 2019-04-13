import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { ROUTES, PLATFORM } from '../../../utils/constants';
import { quizActions } from 'state/quizzes';
import { getActiveCardId } from 'utils/helpers';
import { setQuizTitle } from '../../../utils/helpers';
import { NavigationEvents } from 'react-navigation';
import { QuizStep, Form, Button } from '../../../common';
import baseStyles from '../../../styles';
import { Ionicons } from '@expo/vector-icons';
import { func, number, string } from 'prop-types';

class Question extends Component {
  static propTypes = {
    decreaseStep: func.isRequired,
    quizId: number.isRequired,
    question: string,
    current: number.isRequired,
    total: number.isRequired
  };

  static navigationOptions = setQuizTitle;

  state = {
    goBack: true
  };

  /**
   * Flips the card to show the answer
   */
  showAnswer = () => {
    const { navigation, quizId } = this.props;
    this.setState(
      {
        goBack: false
      },
      () => {
        navigation.push(ROUTES.QuizAnswer, {
          quizId,
          deckTitle: navigation.getParam('deckTitle')
        });
      }
    );
  };

  /**
   * Updates the step if the user goes back to the previous card
   */
  onWillBlur = () => {
    const { decreaseStep, quizId } = this.props;

    if (this.state.goBack) {
      setTimeout(() => {
        decreaseStep(quizId);
      }, 50);
    } else {
      this.setState({
        goBack: true
      });
    }
  };

  render() {
    const { question, current, total } = this.props;
    const { fontSize, color } = baseStyles.buttonContent;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillBlur={this.onWillBlur} />
        <QuizStep current={current} total={total} />
        <View style={baseStyles.container}>
          <Text style={styles.title}>{question}</Text>
          <Form>
            <Button
              text="Show Answer"
              icon={
                <Ionicons
                  name={Platform.select({
                    [PLATFORM.iOS]: 'ios-eye',
                    [PLATFORM.Android]: 'md-eye'
                  })}
                  size={fontSize}
                  color={color}
                />
              }
              style={{ margin: 25 }}
              onPress={this.showAnswer}
            />
          </Form>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    ...baseStyles.title,
    padding: 25
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
    quizId,
    question: cardId ? cards[cardId].question : null,
    current: quiz.step + 1,
    total: cardIds.length
  };
};

const mapDispatchToProps = {
  decreaseStep: id => quizActions.returnQuiz(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
