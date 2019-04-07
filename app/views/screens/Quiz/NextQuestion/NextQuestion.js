import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Score from './Score';
import { ROUTES } from '../../../utils/constants';

class NextQuestion extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('deckTitle')} - Quiz`
  });

  showAnswer = () => {
    const { navigation, quizId, cardId } = this.props;
    navigation.navigate(ROUTES.QuizAnswer, {
      quizId,
      cardId,
      deckTitle: navigation.getParam('deckTitle')
    });
  };

  render() {
    const { isQuestion, quizId } = this.props;

    if (!isQuestion) {
      return <Score quizId={quizId} />;
    }

    const { question, current, total } = this.props;

    return (
      <Question
        question={question}
        current={current}
        total={total}
        showAnswer={this.showAnswer}
      />
    );
  }
}

const mapStateToProps = ({ quizzes, decks, cards }, { navigation }) => {
  const quizId = navigation.getParam('quizId');
  const quiz = quizzes[quizId];
  const cardIds = decks[quiz.deck].cards.sort(
    (a, b) => cards[b].createdDate - cards[a].createdDate
  );

  const getFirstUnansweredCard = id => quiz.results[id] === undefined;
  const cardId = cardIds.find(getFirstUnansweredCard);

  const isQuestion = !!cardId;
  const questionProps = isQuestion
    ? {
        cardId,
        question: cards[cardId].question,
        current: cardIds.findIndex(getFirstUnansweredCard) + 1,
        total: cardIds.length
      }
    : {};

  return {
    quizId,
    isQuestion,
    ...questionProps
  };
};

export default connect(mapStateToProps)(NextQuestion);
