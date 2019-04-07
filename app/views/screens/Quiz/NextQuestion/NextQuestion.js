import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Score from './Score';
import { ROUTES } from '../../../utils/constants';
import { quizActions } from 'state/quizzes';
import { getActiveCardId } from 'utils/helpers';
import { NavigationEvents } from 'react-navigation';

class NextQuestion extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('deckTitle')} - Quiz`
  });

  state = {
    goBack: true
  };

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

  onWillBlur = () => {
    const { decreaseStep, quizId } = this.props;

    if (this.state.goBack) {
      decreaseStep(quizId);
    } else {
      this.setState({
        goBack: true
      });
    }
  };

  render() {
    const { isQuestion, quizId, question, current, total } = this.props;

    return (
      <Fragment>
        <NavigationEvents onWillBlur={this.onWillBlur} />
        {isQuestion ? (
          <Question
            question={question}
            current={current}
            total={total}
            showAnswer={this.showAnswer}
          />
        ) : (
          <Score quizId={quizId} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ quizzes, decks, cards }, { navigation }) => {
  const quizId = navigation.getParam('quizId');
  const { cardId, cardIds, quiz } = getActiveCardId(
    quizzes,
    decks,
    cards,
    quizId,
    true
  );

  const isQuestion = !!cardId;
  const questionProps = isQuestion
    ? {
        cardId,
        question: cards[cardId].question,
        current: quiz.step + 1,
        total: cardIds.length
      }
    : {};

  return {
    quizId,
    isQuestion,
    ...questionProps
  };
};

const mapDispatchToProps = {
  decreaseStep: id => quizActions.returnQuiz(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextQuestion);
