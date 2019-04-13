import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Platform, Animated } from 'react-native';
import baseStyles, { colors } from '../../styles';
import { connect } from 'react-redux';
import { Form, Button } from '../../common';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PLATFORM, ROUTES } from '../../utils/constants';
import { deckActions, deckShape } from 'state/decks';
import { quizActions } from 'state/quizzes';
import { getNumberOfCards } from '../../utils/helpers';
import { clearLocalNotifications } from 'server/api';
import { func } from 'prop-types';

const { fontSize, color } = baseStyles.buttonContent;

const icons = {
  StartIcon: (
    <Ionicons
      name={Platform.select({
        [PLATFORM.iOS]: 'ios-play-circle',
        [PLATFORM.Android]: 'md-play-circle'
      })}
      size={fontSize}
      color={color}
    />
  ),
  AddIcon: (
    <Ionicons
      name={Platform.select({
        [PLATFORM.iOS]: 'ios-add-circle',
        [PLATFORM.Android]: 'md-add-circle'
      })}
      size={fontSize}
      color={color}
    />
  ),
  DeleteIcon: <MaterialIcons name="delete" size={fontSize} color={color} />
};

class DeckDetail extends Component {
  static propTypes = {
    deck: deckShape,
    deleteDeck: func.isRequired,
    startQuiz: func.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  });

  state = {
    scale: new Animated.Value(1)
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.deck &&
      this.props.deck.cards.length > prevProps.deck.cards.length
    ) {
      const { scale } = this.state;
      Animated.sequence([
        Animated.timing(scale, { duration: 200, toValue: 1.2 }),
        Animated.spring(scale, { toValue: 1, friction: 4 })
      ]).start();
    }
  }

  /**
   * Calls Redux to delete a deck and navigates back to the list of decks
   */
  deleteDeck = () => {
    const { deck, deleteDeck, navigation } = this.props;
    deleteDeck(deck.id).then(() => {
      navigation.navigate(ROUTES.DeckList);
    });
  };

  /**
   * Navigates to the add card screen
   */
  addCard = () => {
    const { deck, navigation } = this.props;
    navigation.navigate(ROUTES.NewCard, {
      deckId: deck.id,
      deckTitle: deck.title
    });
  };

  /**
   * Calls Redux to start a new quiz and navigates to its first screen
   */
  startQuiz = () => {
    const { navigation, startQuiz, deck } = this.props;
    startQuiz(deck.id).then(quiz => {
      clearLocalNotifications();
      navigation.navigate(ROUTES.QuizQuestion, {
        quizId: quiz.id,
        deckTitle: deck.title
      });
    });
  };

  render() {
    const { deck } = this.props;
    const { scale } = this.state;

    return (
      <Fragment>
        {deck ? (
          <View style={baseStyles.screenContainer}>
            <Animated.View
              style={[baseStyles.center, { transform: [{ scale }] }]}
            >
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.text}>{getNumberOfCards(deck.cards)}</Text>
            </Animated.View>
            <Form>
              <Button
                text="Start Quiz"
                icon={icons.StartIcon}
                style={styles.button}
                onPress={this.startQuiz}
                disabled={deck.cards.length === 0}
              />
              <Button
                text="Add Card"
                icon={icons.AddIcon}
                style={styles.button}
                onPress={this.addCard}
              />
              <Button
                text="Delete Deck"
                icon={icons.DeleteIcon}
                style={styles.button}
                onPress={this.deleteDeck}
              />
            </Form>
          </View>
        ) : (
          <View style={styles.center}>
            <Text style={styles.text}>No data found</Text>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    ...baseStyles.title
  },
  text: {
    ...baseStyles.textCenter,
    color: colors.boulder,
    fontSize: 25
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 25,
    marginLeft: 25
  },
  center: {
    flex: 1,
    ...baseStyles.center
  }
});

const mapStateToProps = ({ decks }, { navigation }) => ({
  deck: decks[navigation.getParam('id')]
});

const mapDispatchToProps = {
  deleteDeck: id => deckActions.handleRemoveDeck(id),
  startQuiz: id => quizActions.handleStartQuiz(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
