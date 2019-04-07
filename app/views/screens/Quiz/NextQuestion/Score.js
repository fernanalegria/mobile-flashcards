import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../../styles';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { correct, total } = this.props;
    return (
      <View style={styles.container}>
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

const mapStateToProps = ({ quizzes, decks }, { quizId }) => {
  const quiz = quizzes[quizId];
  return {
    correct: Object.values(quiz.results).reduce(
      (acc, result) => (result ? acc + 1 : acc),
      0
    ),
    total: decks[quiz.deck].cards.length
  };
};

export default connect(mapStateToProps)(Score);
