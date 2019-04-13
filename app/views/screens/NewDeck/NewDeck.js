import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import baseStyles, { colors } from '../../styles';
import { connect } from 'react-redux';
import { deckActions } from 'state/decks';
import InputForm from './InputForm';
import { ROUTES } from '../../utils/constants';
import { func } from 'prop-types';

class NewDeck extends Component {
  static propTypes = {
    createDeck: func.isRequired
  };

  /**
   * Calls Redux to create a new deck and navigates to its detail
   * @param  {string} title
   */
  createNewDeck = title => {
    const { createDeck, navigation } = this.props;
    return createDeck(title).then(deck =>
      navigation.navigate(ROUTES.DeckDetail, {
        id: deck.id,
        title: deck.title
      })
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={baseStyles.container}>
        <Text style={styles.text}>Let's get started!</Text>
        <Text style={styles.title}>What's the title of your new deck?</Text>
        <InputForm writeText={this.createNewDeck} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    ...baseStyles.textCenter,
    color: colors.black,
    fontSize: 25,
    padding: 10
  },
  title: {
    ...baseStyles.title,
    padding: 25
  }
});

const mapDispatchToProps = {
  createDeck: title => deckActions.handleCreateDeck(title)
};

export default connect(
  null,
  mapDispatchToProps
)(NewDeck);
