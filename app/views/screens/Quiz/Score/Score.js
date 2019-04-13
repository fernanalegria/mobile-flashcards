import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { quizActions } from 'state/quizzes';
import { deckShape } from 'state/decks';
import { NavigationEvents } from 'react-navigation';
import baseStyles, { colors } from '../../../styles';
import { setQuizTitle } from '../../../utils/helpers';
import { PLATFORM, ROUTES } from '../../../utils/constants';
import { Ionicons, Foundation, MaterialIcons } from '@expo/vector-icons';
import { Form, Button } from '../../../common';
import { func, number } from 'prop-types';

const { fontSize, color } = baseStyles.buttonContent;

const icons = {
  RestartIcon: Platform.select({
    [PLATFORM.iOS]: <MaterialIcons name="loop" size={fontSize} color={color} />,
    [PLATFORM.Android]: <Foundation name="loop" size={fontSize} color={color} />
  }),
  BackIcon: (
    <Ionicons
      name={Platform.select({
        [PLATFORM.iOS]: 'ios-arrow-back',
        [PLATFORM.Android]: 'md-arrow-round-back'
      })}
      size={fontSize}
      color={color}
    />
  )
};

class Score extends Component {
  static propTypes = {
    decreaseStep: func.isRequired,
    startQuiz: func.isRequired,
    quizId: number.isRequired,
    deck: deckShape.isRequired,
    correct: number.isRequired
  };

  static navigationOptions = setQuizTitle;

  state = {
    goBack: true
  };

  componentDidMount() {
    this.props.navigation.setParams({ unsetGoBack: this.unsetGoBack });
  }

  /**
   * Allows navigationOptions to access the state
   * @param  {Function} callback
   */
  unsetGoBack = callback => {
    this.setState({ goBack: false }, callback);
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

  /**
   * Navigates back to the deck detail
   */
  backToDeck = () => {
    const { navigation, deck } = this.props;
    this.setState({ goBack: false }, () => {
      navigation.navigate(ROUTES.DeckDetail, {
        id: deck.id,
        title: deck.title
      });
    });
  };

  /**
   * Calls Redux to start a new quiz and goes back to the first screen
   */
  restartQuiz = () => {
    const { navigation, startQuiz, deck } = this.props;
    this.setState({ goBack: false }, () => {
      startQuiz(deck.id).then(quiz => {
        navigation.navigate(ROUTES.QuizQuestion, {
          quizId: quiz.id,
          deckTitle: deck.title
        });
      });
    });
  };

  render() {
    const { correct, deck } = this.props;
    const total = deck.cards.length;

    return (
      <View style={styles.container}>
        <NavigationEvents onWillBlur={this.onWillBlur} />
        <View style={baseStyles.center}>
          <View style={baseStyles.card}>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Your score</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>
                {Math.round((correct * 100) / total)}%
              </Text>
              <Text
                style={styles.footer}
              >{`${correct} out of ${total} questions`}</Text>
            </View>
          </View>
        </View>
        <Form>
          <Button
            text="Restart Quiz"
            icon={icons.RestartIcon}
            style={styles.button}
            onPress={this.restartQuiz}
          />
          <Button
            text="Back to Deck"
            icon={icons.BackIcon}
            style={styles.button}
            onPress={this.backToDeck}
          />
        </Form>
      </View>
    );
  }
}

const borderRadius = Platform.OS === PLATFORM.iOS ? 16 : 2;

const styles = StyleSheet.create({
  container: {
    ...baseStyles.screenContainer,
    backgroundColor: colors.athensGray
  },
  header: {
    padding: 20,
    backgroundColor: colors.blueWood,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    ...baseStyles.center
  },
  textHeader: {
    fontSize: 25,
    color: colors.white,
    ...baseStyles.textCenter
  },
  score: {
    color: colors.blueWood,
    fontSize: 50,
    ...baseStyles.textCenter
  },
  footer: {
    fontSize: 16,
    color: colors.boulder,
    ...baseStyles.textCenter
  },
  scoreContainer: {
    padding: 20,
    ...baseStyles.stretch
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 25,
    marginLeft: 25
  }
});

const mapStateToProps = ({ quizzes, decks }, { navigation }) => {
  const quizId = navigation.getParam('quizId');
  const quiz = quizzes[quizId];
  const deck = decks[quiz.deck];
  return {
    quizId,
    deck,
    correct: Object.values(quiz.results).reduce(
      (acc, result) => (result ? acc + 1 : acc),
      0
    )
  };
};

const mapDispatchToProps = {
  decreaseStep: id => quizActions.returnQuiz(id),
  startQuiz: id => quizActions.handleStartQuiz(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);
