import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import baseStyles, { colors } from '../../styles';
import { connect } from 'react-redux';
import { Form, Button } from '../../common';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PLATFORM, ROUTES } from '../../utils/constants';
import { deckActions } from 'state/decks';

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

  deleteDeck = () => {
    const { deck, deleteDeck, navigation } = this.props;
    deleteDeck(deck.id).then(() => {
      navigation.navigate(ROUTES.DeckList);
    });
  };

  render() {
    const { deck, navigation } = this.props;

    return (
      <Fragment>
        {deck ? (
          <View style={styles.container}>
            <View style={styles.detail}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.text}>{deck.cards.length} cards</Text>
            </View>
            <Form>
              <Button
                text="Start Quiz"
                icon={icons.StartIcon}
                style={styles.button}
                onPress={() => {}}
              />
              <Button
                text="Add Card"
                icon={icons.AddIcon}
                style={styles.button}
                onPress={() => { navigation.navigate(ROUTES.NewCard, { deckId: deck.id, deckTitle: deck.title }) }}
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
