import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { deckActions } from 'state/decks';
import { cardActions } from 'state/cards';
import baseStyles, { colors } from '../../styles';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    const { getDecks, getCards } = this.props;
    Promise.all([getDecks(), getCards()]).then(() => {
      this.setState({
        isLoading: false
      });
    });
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
  getCards: () => cardActions.handleReceiveCards()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
