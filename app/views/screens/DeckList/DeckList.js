import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { deckActions, deckShape } from 'state/decks';
import { cardActions } from 'state/cards';
import { quizActions } from 'state/quizzes';
import baseStyles, { colors } from '../../styles';
import DeckListItem from './DeckListItem';
import { setLocalNotification } from 'server/api';
import { getMidnight } from 'utils/helpers';
import { func, arrayOf } from 'prop-types';

class DeckList extends Component {
  static propTypes = {
    getDecks: func.isRequired,
    getCards: func.isRequired,
    getQuizzes: func.isRequired,
    decks: arrayOf(deckShape).isRequired
  };

  state = {
    isLoading: true
  };

  componentDidMount() {
    const { getDecks, getCards, getQuizzes } = this.props;
    Promise.all([getDecks(), getCards(), getQuizzes()]).then(
      ([, , quizzes]) => {
        const midnight = getMidnight();
        const todayQuizzes = Object.keys(quizzes).filter(
          id => quizzes[id].createdDate > midnight
        );
        if (todayQuizzes.length === 0) {
          setLocalNotification();
        }

        this.setState({
          isLoading: false
        });
      }
    );
  }

  renderItem = ({ item }) => (
    <DeckListItem deck={item} navigation={this.props.navigation} />
  );

  render() {
    const { isLoading } = this.state;
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    paddingTop: 9,
    paddingBottom: 9,
    backgroundColor: colors.athensGray
  }
});

const mapStateToProps = ({ decks }) => ({
  decks: Object.values(decks).sort(
    (deckA, deckB) => deckB.createdDate - deckA.createdDate
  )
});

const mapDispatchToProps = {
  getDecks: () => deckActions.handleReceiveDecks(),
  getCards: () => cardActions.handleReceiveCards(),
  getQuizzes: () => quizActions.handleReceiveQuizzes()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
