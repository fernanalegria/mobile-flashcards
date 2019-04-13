import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import baseStyles, { colors } from '../../styles';
import { ROUTES } from '../../utils/constants';
import { getNumberOfCards } from '../../utils/helpers';
import { deckShape } from 'state/decks';

const DeckListItem = ({ deck, navigation }) => (
  <View style={styles.item}>
    {deck ? (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ROUTES.DeckDetail, {
            id: deck.id,
            title: deck.title
          });
        }}
      >
        <View style={baseStyles.center}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cards}>{getNumberOfCards(deck.cards)}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <Text style={baseStyles.noDataText}>No data found</Text>
    )}
  </View>
);

DeckListItem.propTypes = {
  deck: deckShape
};

const styles = StyleSheet.create({
  item: {
    ...baseStyles.card,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 9,
    marginBottom: 9
  },
  title: {
    ...baseStyles.textCenter,
    fontSize: 20,
    color: colors.black
  },
  cards: {
    ...baseStyles.textCenter,
    fontSize: 16,
    color: colors.boulder
  },
  button: {
    padding: 20
  }
});

export default DeckListItem;
