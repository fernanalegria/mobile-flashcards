import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { deckActions } from 'state/decks';
import baseStyles, { colors } from '../../styles';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.getDecks().then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  renderItem = ({ item }) => <DeckListItem deck={item} />;

  render() {
    const { isLoading } = this.state;
    const { decks } = this.props;

    return (
      <View
        style={styles.container}
      >
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
})

const mapStateToProps = ({ decks }) => ({
  decks: Object.values(decks).sort(
    (deckA, deckB) => deckB.createdDate - deckA.createdDate
  )
});

const mapDispatchToProps = {
  getDecks: () => deckActions.handleReceiveDecks()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
