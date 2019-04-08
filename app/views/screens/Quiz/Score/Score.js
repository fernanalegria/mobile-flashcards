import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { quizActions } from 'state/quizzes';
import { NavigationEvents } from 'react-navigation';
import baseStyles, { colors } from '../../../styles';
import { setQuizTitle } from 'utils/helpers';

class Score extends Component {
  static navigationOptions = setQuizTitle;

  state = {
    goBack: true
  };

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
    const { correct, total } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents onWillBlur={this.onWillBlur} />
        <View style={baseStyles.card}>
          <Text style={styles.header}>Your score</Text>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...baseStyles.center,
    backgroundColor: colors.athensGray
  },
  header: {
    fontSize: 25,
    padding: 20,
    backgroundColor: colors.blueWood,
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
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

const mapStateToProps = ({ quizzes, decks }, { navigation }) => {
  const quizId = navigation.getParam('quizId');
  const quiz = quizzes[quizId];
  return {
    quizId,
    correct: Object.values(quiz.results).reduce(
      (acc, result) => (result ? acc + 1 : acc),
      0
    ),
    total: decks[quiz.deck].cards.length
  };
};

const mapDispatchToProps = {
  decreaseStep: id => quizActions.returnQuiz(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score);
