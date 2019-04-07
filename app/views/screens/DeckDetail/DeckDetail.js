import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Platform, Animated } from 'react-native';
import baseStyles, { colors } from '../../styles';
import { connect } from 'react-redux';
import { Form, Button } from '../../common';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PLATFORM, ROUTES } from '../../utils/constants';
import { deckActions } from 'state/decks';
import { getNumberOfCards } from 'utils/helpers';

const { fontSize, color } = baseStyles.buttonContent;

const icons = {
  StartIcon: Platform.select({
    [PLATFORM.iOS]: (
      <Ionicons name="ios-play-circle" size={fontSize} color={color} />
    ),
    [PLATFORM.Android]: (
      <Ionicons name="md-play-circle" size={fontSize} color={color} />
    )
  }),
  AddIcon: Platform.select({
    [PLATFORM.iOS]: (
      <Ionicons name="ios-add-circle" size={fontSize} color={color} />
    ),
    [PLATFORM.Android]: (
      <Ionicons name="md-add-circle" size={fontSize} color={color} />
    )
  }),
  DeleteIcon: <MaterialIcons name="delete" size={fontSize} color={color} />
};

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  });

  state = {
    scale: new Animated.Value(1)
  };

  componentDidUpdate() {
    const { scale } = this.state;
    Animated.sequence([
      Animated.timing(scale, { duration: 200, toValue: 1.2 }),
      Animated.spring(scale, { toValue: 1, friction: 4 })
    ]).start();
  }

  deleteDeck = () => {
    const { deck, deleteDeck, navigation } = this.props;
    deleteDeck(deck.id).then(() => {
      navigation.navigate(ROUTES.DeckList);
    });
  };

  render() {
    const { deck, navigation } = this.props;
    const { scale } = this.state;

    return (
      <Fragment>
        {deck ? (
          <View style={styles.container}>
            <Animated.View style={[styles.detail, { transform: [{ scale }] }]}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.text}>{getNumberOfCards(deck.cards)}</Text>
            </Animated.View>
            <Form>
              <Button
                text="Start Quiz"
                icon={icons.StartIcon}
                style={styles.button}
                onPress={() => {
                  navigation.navigate(ROUTES.QuizQuestion, {
                    deckTitle: deck.title
                  });
                }}
              />
              <Button
                text="Add Card"
                icon={icons.AddIcon}
                style={styles.button}
                onPress={() => {
                  navigation.navigate(ROUTES.NewCard, {
                    deckId: deck.id,
                    deckTitle: deck.title
                  });
                }}
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
          <View style={baseStyles.center}>
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
  detail: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  }
});

const mapStateToProps = ({ decks }, { navigation }) => ({
  deck: decks[navigation.getParam('id')]
});

const mapDispatchToProps = {
  deleteDeck: id => deckActions.handleRemoveDeck(id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
